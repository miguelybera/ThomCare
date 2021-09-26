import axios from 'axios'
import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    TRACK_REQUEST_REQUEST,
    TRACK_REQUEST_SUCCESS,
    TRACK_REQUEST_FAIL,
    SAVE_FORM_SUCCESS,
    SUBMIT_REQUEST_REQUEST,
    SUBMIT_REQUEST_SUCCESS,
    SUBMIT_REQUEST_FAIL,
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,
    GET_RECENT_REQUEST,
    GET_RECENT_SUCCESS,
    GET_RECENT_FAIL,
    UPDATE_REQUEST_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL,
    DELETE_REQUEST_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAIL,
    ASSIGN_REQUEST_REQUEST,
    ASSIGN_REQUEST_SUCCESS,
    ASSIGN_REQUEST_FAIL,
    CLEAR_ERRORS
} from '../constants/requestConstants'

//Get request (using tracking number)
export const trackRequest = (userInput) => async (dispatch) => {
    try {
        dispatch({
            type: TRACK_REQUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/tracker`, userInput, config)

        dispatch({
            type: TRACK_REQUEST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: TRACK_REQUEST_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//save form details
export const saveForm = (formData) => async (dispatch) => {
    localStorage.setItem('formData', JSON.stringify(formData))

    dispatch({
        type: SAVE_FORM_SUCCESS,
        payload: formData
    })
}

//Submit request
export const submitRequest = (request) => async (dispatch) => {
    try {
        dispatch({
            type: SUBMIT_REQUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/submit`, request, config)

        dispatch({
            type: SUBMIT_REQUEST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SUBMIT_REQUEST_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get requests
export const getRequests = (role, route) => async (dispatch) => {
    try {
        dispatch({
            type: GET_REQUESTS_REQUEST
        })

        let link = ``

        if (role === 'CICS Staff') {
            switch (route) {
                case 'Office':
                    link = `/api/v1/admin/cics/office/requests`
                    break
                case 'Trash':
                    link = `/api/v1/admin/requests/trash`
                    break
                case 'Available':
                    link = `/api/v1/admin/cics/available/requests`
                    break
                case 'All':
                    link = `/api/v1/admin/cics/all/requests`
                    break
                case 'Me':
                    link = `/api/v1/admin/cics/me/requests`
                    break
                default:
                    link = ``
            }
        } else if (role === 'Student') { //student
            link = `/api/v1/me/requests`
        } else {
            switch (route) {
                case 'Trash':
                    link = `/api/v1/admin/requests/trash`
                    break
                case 'Requests':
                    link = `/api/v1/admin/deptChair/requests`
                    break
                default:
                    link = ``
            }
        }

        const { data } = await axios.get(link)

        dispatch({
            type: GET_REQUESTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_REQUESTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Get single request (dashboard)
export const getRequestDetails = (requestId) => async (dispatch) => {
    try {
        dispatch({
            type: REQUEST_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/request/${requestId}`)

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REQUEST_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get recent requests
export const getRecent = (role) => async (dispatch) => {
    try {
        dispatch({
            type: GET_RECENT_REQUEST
        })

        let link = ``

        if (role === 'CICS Staff') {
            link = `/api/v1/admin/cics/all/requests`
        } else if (role === 'Student') { //student
            link = `/api/v1/me/requests`
        } else {
            link = `/api/v1/admin/deptChair/requests`
        }

        const { data } = await axios.get(link)

        dispatch({
            type: GET_RECENT_SUCCESS,
            payload: data.recents
        })
    }
    catch (error) {
        dispatch({
            type: GET_RECENT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//update request
export const updateRequest = (requestId, request, isTrash) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_REQUEST_REQUEST
        })

        let config = { headers: {} }

        let link = ``

        if (isTrash) {
            link = `/api/v1/admin/trash/${requestId}`
            config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

        } else {
            link = `/api/v1/admin/update/${requestId}`
            config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
        }

        const { data } = await axios.put(link, request, config)

        dispatch({
            type: UPDATE_REQUEST_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_REQUEST_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//assign request to self
export const assignRequest = (requestId, request) => async (dispatch) => {
    try {
        dispatch({
            type: ASSIGN_REQUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/cics/assign/${requestId}`, request, config)

        dispatch({
            type: ASSIGN_REQUEST_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: ASSIGN_REQUEST_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//delete request
export const deleteRequest = (requestId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REQUEST_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/delete/${requestId}`)

        dispatch({
            type: DELETE_REQUEST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_REQUEST_FAIL,
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