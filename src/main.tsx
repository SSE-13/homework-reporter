/**
 * Created by wander on 15/11/9.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import Redux from './core/Redux'
import AppRouter from './core/Router'


class Main extends React.Component<any,any> {

    render(){
        return ( <Redux />)
    }
}

ReactDOM.render(<Main/>, document.getElementById('app'));
