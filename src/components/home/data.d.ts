interface Repo {

    id: string;

    name: string;
    
    commits_url:string;

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

interface GitType extends Immutable.Map<string, any> {

    get(key:string):Immutable.Map<string,any>

    get(key:"repos"):Immutable.Map<string,Repo>
    
    get(key:"commits"):Immutable.Map<string,Array<Commit>>

}