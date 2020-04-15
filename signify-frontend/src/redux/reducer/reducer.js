import { combineReducers } from 'redux'
import addJobReducer from './addJobReducer'
import jobsReducer from './jobsReducer'

const reducer = combineReducers({
    addJob: addJobReducer,
    jobs: jobsReducer
});

export default reducer

