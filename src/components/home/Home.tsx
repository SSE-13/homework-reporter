/**
 * Created by wander on 15/11/16.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './Button';
import {getRepos} from './actions';

class Home extends React.Component<ReduxProps & RepoProps, {}> {


    componentDidMount() {

        this.props.dispatch(getRepos());
    }

    render() {

        var repoItems = this.props.repos.map((value) => <RepoItem {...value} />);

        return (
            <div>
                {repoItems}
            </div>
        )

    }

}


class RepoItem extends React.Component<Repo, any>{

    render() {
        return <div>{this.props.name}</div>
    }
}


import {connect} from 'react-redux';

type RepoProps = {
    
    repos: Immutable.List<Repo>;
    
}

const select = (globalState:GlobalStoreDataType):RepoProps => {
    var git = globalState.git;
    var repos = git.get("repos");
    repos =  repos ? repos : Immutable.List<Repo>();
    return {repos};
}


export default connect(select)(Home);

import * as Immutable from "immutable";