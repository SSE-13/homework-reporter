export const GET_REPOS: string = "getRepos";
export const GET_COMMITS: string = "getCommits";


import * as async from 'async';

var org = 'SSE-13';

export function getRepos() {
    return (dispatch: any) => {

        let url = `https://api.github.com/orgs/${org}/repos?per_page=60`;

        fetch(url, {})
            .then((response: Response) => response.json())
            .then(value => {
                let obj = {
                    type: GET_REPOS,
                    data: value
                }
                dispatch(obj);
                return value;
            })
            .then((repos) => {

                dispatch(getAllCommits())


            })
    }
}

export function getAllCommits() {

    return (dispatch, getState) => {

        var globalState: GlobalStoreDataType = getState();
        var repos = globalState.git.get("repos").toArray();

        const fetchCommits = (item: Repo, callback: Function) => {



            const onSuccess = () => {

            }

            dispatch(getCommits(item, onSuccess))

        }

        const onFinish = (errorCode: Error) => {

            alert("success");
        }

        async.eachSeries(repos, fetchCommits, onFinish)


    }

}

/**
 * todo:remove callback
 */
export function getCommits(repo: Repo, callback) {
    let url = repo.commits_url.replace("{/sha}", "?path=README.md");
    return (dispatch) => {

        fetch(url)
            .then((response) => response.json())
            .then((value) => {
                var obj = {
                    type: GET_COMMITS,
                    data: value,
                    repoId:repo.id
                }
                let result = value.map((item) => item.commit.message);
                console.log(result);
                dispatch(obj);
                callback();
            })
    }
}