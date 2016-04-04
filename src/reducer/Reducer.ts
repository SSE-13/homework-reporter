/**
 * Created by wander on 15/11/16.
 */



import { combineReducers } from 'redux';
import gitReducer from '../components/home/reducers';
var viewInitState = {}




function viewReducer(state: any = viewInitState, action: any) {
    return state;
}




const reducer = combineReducers({
    view: viewReducer,
    git: gitReducer
});

export default reducer;
