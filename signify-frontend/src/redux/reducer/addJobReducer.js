import {ADD_JOB, ADD_JOB_FAILED} from '../actionTypes/addJobsTypes';
const initState = {
    addJobs: '',
    addJobError: '',
    job: []
}

const addJobReducer = (state = initState, action) => {
    const { response } = action
    switch(action.type) {
        case ADD_JOB:
            return {
                ...state,
                addJobs: 'job added successfully',
                addJobError: '',
                job: response
            }
        case ADD_JOB_FAILED:
            return {
                ...state,
                addJobs: '',
                addJobError: response.data
            }
        default:
            return state;
    }
}

export default addJobReducer