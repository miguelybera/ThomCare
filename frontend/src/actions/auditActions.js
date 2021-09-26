import {
    GET_AUDIT_REQUEST,
    GET_AUDIT_SUCCESS,
    GET_AUDIT_FAIL,
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
            payload: error.response.data.errMessage
        })
    }
}

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}