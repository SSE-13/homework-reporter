/**
 * Created by wander on 15/11/16.
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reducer from '../reducer/Reducer';
import AppRouter from './Router';
import DevTools from './DevTools';

import configureStore from './configureStore';


const store = configureStore({});


export default class Redux extends React.Component<any, any> {

    constructor() {
        super();
    }


    render() {
        return (
            <div>
                <Provider store={store}>
                    <div>
                        <AppRouter />
                        <DevTools />
                    </div>
                </Provider>

            </div>
        )
    }
}