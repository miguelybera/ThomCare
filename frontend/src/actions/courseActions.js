import axios from 'axios'
import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'

// get all courses
export const getCourses = () => async (dispatch) => {
    try {
        dispatch({
            type: GET_COURSES_REQUEST
        })

        const { data } = await axios.get(`/api/v1/courses`)

        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_COURSES_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// get single course details
export const getCourseDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: COURSE_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/course/${id}`)

        dispatch({
            type: COURSE_DETAILS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: COURSE_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update course
export const createCourse = (courseData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_COURSE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        console.log(courseData)
        const { data } = await axios.post(`/api/v1/admin/new/course`, courseData, config)

        dispatch({
            type: NEW_COURSE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_COURSE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update course
export const updateCourse = (id, courseData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_COURSE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/course/${id}`, courseData, config)

        dispatch({
            type: UPDATE_COURSE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_COURSE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// delete course
export const deleteCourse = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_COURSE_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/course/${id}`)

        dispatch({
            type: DELETE_COURSE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_COURSE_FAIL,
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