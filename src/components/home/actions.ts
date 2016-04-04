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

            var commitUrl = item.commits_url.replace("{/sha}", "?path=README.md");
            dispatch(getCommits(commitUrl,callback))

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
export function getCommits(url,callback) {

    return (dispatch) => {

        fetch(url)
            .then((response) => response.json())
            .then((value) => {
                var obj = {
                    type: GET_COMMITS,
                    data: value
                }
                let result = value.map((item) => item.commit.message);
                console.log(result);
                dispatch(obj);
            callback();
            })
    }
}