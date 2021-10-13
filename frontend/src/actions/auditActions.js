import {
    GET_AUDIT_REQUEST,
    GET_AUDIT_SUCCESS,
    GET_AUDIT_FAIL,
    CLEAR_ERRORS
} from '../constants/auditConstants'
import axios from 'axios'

//Get audit log
export const getAuditLog = (filter) => async (dispatch) => {
    try {
        dispatch({
            type: GET_AUDIT_REQUEST
        })

        const { searchType, searchItem } = filter

        console.log(searchType, searchItem)

        const { data } = await axios.get(`/api/v1/admin/auditlogs${searchType ? `?${searchType}=${searchItem}` : ``}`)

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

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}