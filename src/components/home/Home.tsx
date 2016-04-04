/**
 * Created by wander on 15/11/16.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './Button';
import {getRepos} from './actions';

import ReactDataGrid = require("react-datagrid");
require('react-datagrid/index.css')

class Home extends React.Component<ReduxProps & RepoProps, {}> {


    componentDidMount() {

        this.props.dispatch(getRepos());
    }

    render() {

        var repoItems = this.props.repos.map((value) => <RepoItem {...value} />);
        var data = this.props.repos.toArray();
        var columns = [
            { name: "id" },
            { name: "name" }
        ]

        return (
            <div>
                <ReactDataGrid idProperty="id" dataSource={data} columns={columns} />
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

    repos: Immutable.Map<string,Repo>;

}

const select = (globalState: GlobalStoreDataType): RepoProps => {
    var git = globalState.git;
    var repos = git.get("repos");
    repos = repos ? repos : Immutable.Map<string,Repo>();
    return { repos };
}


export default connect(select)(Home);

import * as Immutable from "immutable";