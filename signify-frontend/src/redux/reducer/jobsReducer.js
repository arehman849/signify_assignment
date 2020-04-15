import {GET_ALL_JOBS, GET_ALL_JOBS_FAILED, POST_JOB_TO_TIMELINE, POST_JOB_TO_TIMELINE_FAILED, GET_TIMELINE_JOBS, GET_TIMELINE_JOBS_FAILED} from '../actionTypes/jobsTypes';

const initState = {
    allJobs: [],
    timeline: []
}

const jobsReducer = (state = initState, action) => {
    const { response } = action
    switch (action.type) {
        case GET_ALL_JOBS:
            return {
                ...state,
                allJobs: [...response]
            }
        case GET_ALL_JOBS_FAILED:
            /**
             * failed cases to be implemented
             */
            console.log(response);
            return state;
        case POST_JOB_TO_TIMELINE:
            return {
                ...state,
                timeline: [...response]
            }
        case POST_JOB_TO_TIMELINE_FAILED:
            /**
             * failed cases to be implemented
             */
            console.log(response);
            return state;
        case GET_TIMELINE_JOBS:
            return {
                ...state,
                timeline: [...response]
            }
        case GET_TIMELINE_JOBS_FAILED:
            return state;
        default:
            return state;
    }
}

export default jobsReducer