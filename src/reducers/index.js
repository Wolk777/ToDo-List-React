import { combineReducers } from 'redux';
import tasks from './tasks';
import sorting from './sorting';

const rootReducer = combineReducers({ tasks, sorting });

export default rootReducer;
