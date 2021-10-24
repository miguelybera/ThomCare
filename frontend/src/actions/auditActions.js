import {
    GET_AUDIT_REQUEST,
    GET_AUDIT_SUCCESS,
    GET_AUDIT_FAIL,
    NEW_AUDIT_REQUEST,
    NEW_AUDIT_SUCCESS,
    NEW_AUDIT_FAIL,
    CLEAR_ERRORS
} from '../constants/auditConstants'
import axios from 'axios'

//Get audit log
export const getAuditLog = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_AUDIT_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/auditlogs`)

        dispatch({
            type: GET_AUDIT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_AUDIT_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get audit log
export const createAudit = (msg) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_AUDIT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/new/audit`, msg, config)

        dispatch({
            type: NEW_AUDIT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_AUDIT_FAIL,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}