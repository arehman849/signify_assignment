import http from '../../services/httpServices';
import {GET_ALL_JOBS, GET_ALL_JOBS_FAILED, POST_JOB_TO_TIMELINE, POST_JOB_TO_TIMELINE_FAILED, GET_TIMELINE_JOBS_FAILED, GET_TIMELINE_JOBS} from '../actionTypes/jobsTypes';
import { base_url, getJobs, store, postToTimeline, getAllTimeLineJobs } from '../../config/config';

const { get, post } = http;

export const getAllJobs = () => {
    return (dispatch, getState) => {
        get(base_url + store + getJobs)
        .then((response) => {
            dispatch({
                type: GET_ALL_JOBS,
                response: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_ALL_JOBS_FAILED,
                response: err.response
            })
        })
    }
}

export const postJobToTimeline = (job) => {
    console.log(job)
    return dispatch => {
        post(base_url + store + postToTimeline, job)
        .then((response) => {
            dispatch({
                type: POST_JOB_TO_TIMELINE,
                response: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: POST_JOB_TO_TIMELINE_FAILED,
                response: err.response
            })
        })
    }
}

export const getTimelineJobs = () => {
    return (dispatch, getState) => {
        get(base_url + store + getAllTimeLineJobs)
        .then((response) => {
            dispatch({
                type: GET_TIMELINE_JOBS,
                response: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: GET_TIMELINE_JOBS_FAILED,
                response: err.response
            })
        })
    }
}