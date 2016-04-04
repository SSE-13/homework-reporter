import * as actions from './actions';
import * as Immutable from "immutable";

var gitInitState: Immutable.Map<string, any> = Immutable.fromJS({});

const filterAllStudents = (item: Repo) => {
    var repoName = item.name;
    let studentId = repoName.split("_")[1];
    if (!studentId) {
        studentId = repoName.split("-")[1];
    }
    if (!studentId) {
        studentId = repoName;
    }
    return (studentId.substr(0, 2) == "13" || studentId.substr(0, 2) == "12");
}

export default function gitReducer(state: any = gitInitState, action: any) {
    switch (action.type) {
        case actions.GET_REPOS:
         var data = action.data.filter(filterAllStudents)
            var repos = Immutable.List(data);
            return gitInitState.set("repos", repos);
        // case 
    }
    return state;
}



