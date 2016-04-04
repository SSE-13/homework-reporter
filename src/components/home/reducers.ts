import * as actions from './actions';
import * as Immutable from "immutable";

var gitInitState:GitType = Immutable.fromJS({});

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

export default function gitReducer(state: GitType = gitInitState, action: any) {
    switch (action.type) {
        case actions.GET_REPOS:
            var data = action.data.filter(filterAllStudents)
            var repos:Immutable.Map<string,Repo> = Immutable.Map<string,Repo>();  
            for (var i = 0 ; i < data.length ; i++){
                var item:Repo = data[i];
                repos = repos.set(item.id,item)
            }  
            return state.set("repos", repos);
        case actions.GET_COMMITS:
            var data = action.data;
            var commits = gitInitState.get("commits");
            if (!commits){
                commits = Immutable.Map<any>({});
            }
            return state.set("commits", commits.set(action.repoId,data));
    }
    return state;
}



