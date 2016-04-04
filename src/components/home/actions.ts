export const GET_REPOS: string = "getRepos";
export const GET_COMMITS: string = "getCommits";

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
                console.log (value)
                console.log(value)
                let result = value.map((item: any) => item.full_name).sort((a, b) => a - b);
                dispatch(obj);
                return value;
            })
            .then(()=>{
                let obj = getCommits();
                dispatch(obj);
            })
    }
}


export function getCommits(repoName = "SSE_13110107") {

    return (dispatch) => {
        
        var url = `https://api.github.com/repos/${org}/${repoName}/commits?path=README.md`;
        fetch(url)
            .then((response) => response.json())
            .then((value) => {
                var obj = {
                    type: GET_COMMITS,
                    data: value
                }
                let result = value.map((item) => item.commit.message);
                console.log (result);
                dispatch(obj);
            })
    }
}