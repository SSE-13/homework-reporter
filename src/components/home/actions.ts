export const GET_REPOS: string = "getRepos";
export const GET_COMMITS: string = "getCommits";
export const GET_STUDENTS:string = "getStudents";
import * as Immutable from 'immutable';
import xlsx = require('xlsx');
import * as async from 'async';

var org = 'SSE-13';

export function getStudents() {


    return (dispatch) => {
        /* set up XMLHttpRequest */
        var url = "students.xlsx";
        var oReq = new XMLHttpRequest();
        oReq.open("GET", url, true);
        oReq.responseType = "arraybuffer";

        oReq.onload = function (e) {
            var arraybuffer = oReq.response;

            /* convert data to binary string */
            var data = new Uint8Array(arraybuffer);
            var arr = new Array();
            for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");

            /* Call XLSX */


            // var XLSX:xlsx. = require("xlsx");
            var workbook: xlsx.IWorkBook = xlsx.read(bstr, { type: "binary" });
            var firstSheet: xlsx.IWorkSheet = workbook.Sheets[workbook.SheetNames[0]];
            console.log(firstSheet)

            const FIRST_ROW = 6;
            const LAST_ROW = 47;
            var students = Immutable.OrderedMap<string,Student>();
            for (var i = FIRST_ROW; i <= LAST_ROW; i++) {
                var student:Student = {
                    id: firstSheet[`A${i}`].h,
                    name: firstSheet[`B${i}`].h
                };
                
                students = students.set(student.id,student);
            }          
            dispatch({type:GET_STUDENTS,data:students});
        }

        oReq.send();
    }
}


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
                // callback();
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
                    repoId: repo.id
                }
                let result = value.map((item) => item.commit.message);
                console.log(result);
                dispatch(obj);
                callback();
            })
    }
}