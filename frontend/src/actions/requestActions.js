import axios from 'axios'
import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    SAVE_FORM_SUCCESS,
    SUBMIT_REQUEST_REQUEST,
    SUBMIT_REQUEST_SUCCESS,
    SUBMIT_REQUEST_FAIL,
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,
    UPDATE_REQUEST_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL,
    DELETE_REQUEST_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAIL,
    CLEAR_ERRORS
} from '../constants/requestConstants'

//Get request (using tracking number)
export const trackRequest = (userInput) => async (dispatch) => {
    try {
        dispatch({
            type: REQUEST_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/requestTracker`, userInput, config)

        localStorage.setItem('trackData', JSON.stringify(data.request))

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: REQUEST_DETAILS_FAIL,
            payload: error.response.data.errMessage
        }
        )
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

        const { data } = await axios.post(`/api/v1/submitRequest`, request, config)


        dispatch({
            type: SUBMIT_REQUEST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SUBMIT_REQUEST_FAIL,
            payload: error.response.data.errMessage
        }
        )
    }
}

//get CICS requests
export const getRequests = (role, office, trash) => async (dispatch) => {
    try {
        dispatch({
            type: GET_REQUESTS_REQUEST
        })

        let link = ``

        if(role === 'Dept Chair' && !office) {
            if(trash) {
                link = `/api/v1/deptChair/trash`  
                console.log('dept chair trash')
            } else {
                link = `/api/v1/deptChair/requests`
                console.log('dept chair requests')
            }
        } else if (role === 'CICS Staff') {
            if(office) {
                link = `/api/v1/cicsAdmin/officeRequests`
                console.log('admin office requests')
            } else {
                if(trash) {
                    link = `/api/v1/cicsAdmin/trash`
                    console.log('admin trash')
                } else {
                    link = `/api/v1/cicsAdmin/requests`
                    console.log('admin all requests')
                }
            }
        } else {
            link = `/api/v1/myRequests`
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
        }
        )
    }
}

//Get single request (dashboard)
export const getRequestDetails = (requestId) => async (dispatch) => {
    try {
        console.log('here')
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
        }
        )
    }
}

//update request
export const updateRequest = (requestId, request, isTrash) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_REQUEST_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        let link = ``

        if(isTrash) {
            link = `/api/v1/admin/trashRequest/${requestId}`
        } else {
            link = `/api/v1/admin/updateRequest/${requestId}`
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
        }
        )
    }
}

//delete request
export const deleteRequest = (requestId) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_REQUEST_REQUEST
        })

        const { data } = await axios.put(`/api/v1/admin/trashRequest/${requestId}`)

        dispatch({
            type: DELETE_REQUEST_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_REQUEST_FAIL,
            payload: error.response.data.errMessage
        }
        )
    }
}

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}