/**
 * Created by wander on 15/11/16.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Router, Route, Link } from 'react-router';
//import { createHistory, useBasename } from 'history'
//import createHashHistory from 'history/lib/createMemoryHistory';
import Home from '../components/home/Home';

//import { createHashHistory } from 'history';
//let history = new createHashHistory();
//console.l


interface AppRouterProps {


}

export default class AppRouter extends React.Component<AppRouterProps, {}> {


    render() {

        return (

            <div>

                <Router>

                    <Route path="/" component={App}>

                        <Route path="home" component={Home}/>
                        <Route path="about" component={About}/>
                        </Route>
                    </Router>
                </div>
        )
    }


}

class App extends React.Component<any, any> {


    render() {
        return (
            <div>
                <div>
                <Link to="/home">Home</Link>
                <span>         </span>
                <Link to="/about">About</Link></div>
                {this.props.children}
                </div>


        )
    }

}
class About extends React.Component<any, any> {


    render() {
        return (<div>About</div>)
    }

}