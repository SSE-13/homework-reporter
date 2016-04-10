/**
 * Created by wander on 15/11/16.
 */


import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Button from './Button';
import {getStudents, getRepos} from './actions';

import ReactDataGrid = require("react-datagrid");
require('react-datagrid/index.css')

class Home extends React.Component<ReduxProps & RepoProps, {}> {


    componentDidMount() {

        this.props.dispatch(getStudents());
        this.props.dispatch(getRepos());
    }

    render() {
        var data = this.props.homeworks.toArray();
        var columns = [
            { name: "studentId" },
            { name: "studentName" }
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

    homeworks: Immutable.Iterable<string, StudentHomework>

}



const select = (globalState: GlobalStoreDataType): RepoProps => {
    var git = globalState.git;
    var students = git.get("students");


    const mapper = (student: Student): StudentHomework => {
        var repo = git.get("repos").get("1");
        return { studentId:student.id,studentName:student.name, repo };
    }

    var homeworks: Immutable.Iterable<string, StudentHomework> = students.map(mapper);
    // repos = repos.map((repo) => )
    return { homeworks };
}


export default connect(select)(Home);

import * as Immutable from "immutable";