interface Repo {

    id: string;

    name: string;
    
    commits_url:string;

}

interface StudentHomework {
    
    studentId:string;
    
    studentName:string;
    
    repo:Repo;
    
    homeworkState:Array<Homework>;
    
}


interface Homework {
    
    state:HomeworkState;
    
    
}


declare const enum HomeworkState {
    
    FINISH = 0,
    DELAY =1,
    UN_FINISH  = 2
    
    
}

interface Commit {
    sha: string;
    commit: {
        author: {
            name: string,
            email: string,
            date: string
        },

        message: string,
        url: string
    }
}

interface ReduxProps {


    dispatch: (actionCreator: Function) => void;

}

interface GlobalStoreDataType {
    
    git:GitType;
    
    
}


interface Student {
    
    
    id:string;
    
    name:string;
    
}

interface GitType extends Immutable.Map<string,any>{

    // get(key:string):Immutable.Map<string,any>
    
    get(key:"repos"|"commits"|"students"):Immutable.Map<string,any>

    get(key:"repos"):Immutable.Map<string,Repo>
    
    get(key:"commits"):Immutable.Map<string,Array<Commit>>
    
    get(key:"students"):Immutable.Map<string,Student>
    
    
   

}



//  


