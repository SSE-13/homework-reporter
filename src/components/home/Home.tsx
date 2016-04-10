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
        // this.props.dispatch(getRepos());
    }

    render() {

        var i18n = {};
        i18n[HomeworkState.FINISH] = "完成";
        i18n[HomeworkState.DELAY] = "延期";
        i18n[HomeworkState.UN_FINISH] = "未完成";

        const homeworkStateRender = (value: Array<Homework>) => {
            let contents = value.map((homework) => <span>{i18n[homework.state]}  </span>)
            let result = <div>{contents}</div>
            return result;

        };

        var data = this.props.homeworks.toArray();
        var columns = [
            { name: "studentId", title:"学号",width: 100 },
            { name: "studentName", title:"姓名",width: 150 },

            { name: "homeworkState", title:"作业完成情况",render: homeworkStateRender }
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
        var homeworkState = { state: HomeworkState.FINISH };
        return { studentId: student.id, studentName: student.name, repo, homeworkState: [homeworkState, homeworkState, homeworkState, homeworkState, homeworkState, homeworkState] };
    }

    var homeworks: Immutable.Iterable<string, StudentHomework> = students.map(mapper);
    // repos = repos.map((repo) => )
    return { homeworks };
}


export default connect(select)(Home);

import * as Immutable from "immutable";