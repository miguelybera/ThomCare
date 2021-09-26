import {
    NEW_FORM_REQUEST,
    NEW_FORM_SUCCESS,
    NEW_FORM_FAIL,
    UPDATE_FORM_REQUEST,
    UPDATE_FORM_SUCCESS,
    UPDATE_FORM_FAIL,
    DELETE_FORM_REQUEST,
    DELETE_FORM_SUCCESS,
    DELETE_FORM_FAIL,
    ALL_FORMS_REQUEST,
    ALL_FORMS_SUCCESS,
    ALL_FORMS_FAIL,
    FORM_DETAILS_REQUEST,
    FORM_DETAILS_SUCCESS,
    FORM_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/formConstants'
import axios from 'axios'

//Get forms
export const getForms = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_FORMS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/forms`)

        dispatch({
            type: ALL_FORMS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_FORMS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Get single form
export const getFormDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: FORM_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/form/${id}`)

        dispatch({
            type: FORM_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: FORM_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Create new form
export const createForm = (formData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_FORM_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/new/form`, formData, config)

        dispatch({
            type: NEW_FORM_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_FORM_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Update form
export const updateForm = (id, formData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_FORM_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/form/${id}`, formData, config)

        dispatch({
            type: UPDATE_FORM_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_FORM_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Delete form
export const deleteForm = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_FORM_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/form/${id}`)

        dispatch({
            type: DELETE_FORM_SUCCESS,
            payload: data.success
        })
    }

    catch (error) {
        dispatch({
            type: DELETE_FORM_FAIL,
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