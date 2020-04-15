import http from '../../services/httpServices';
import {ADD_JOB, ADD_JOB_FAILED} from '../actionTypes/addJobsTypes';
import { base_url, postJob, store } from '../../config/config';

const { post } = http;

export const addJobs = job => {
    return (dispatch, getState) => {
        post(base_url + store + postJob, job)
        .then((response) => {
            dispatch({
                type: ADD_JOB,
                response: response.data
            })
        })
        .catch((err) => {
            dispatch({
                type: ADD_JOB_FAILED,
                response: err.response
            })
        });
    }
}