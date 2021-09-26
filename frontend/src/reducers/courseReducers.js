import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    COURSE_DETAILS_REQUEST,
    COURSE_DETAILS_SUCCESS,
    COURSE_DETAILS_FAIL,
    COURSE_DETAILS_RESET,
    NEW_COURSE_REQUEST,
    NEW_COURSE_SUCCESS,
    NEW_COURSE_FAIL,
    NEW_COURSE_RESET,
    UPDATE_COURSE_REQUEST,
    UPDATE_COURSE_SUCCESS,
    UPDATE_COURSE_FAIL,
    UPDATE_COURSE_RESET,
    DELETE_COURSE_REQUEST,
    DELETE_COURSE_SUCCESS,
    DELETE_COURSE_FAIL,
    DELETE_COURSE_RESET,
    CLEAR_ERRORS
} from '../constants/courseConstants'

//get all courses details
export const getCoursesReducer = (state = { courses: [] }, action) => {
    switch (action.type) {
        case GET_COURSES_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_COURSES_SUCCESS:
            return {
                loading: false,
                courses: action.payload.courses,
                success: action.payload.success
            }

        case GET_COURSES_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//get all courses details
export const getCourseDetailsReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case COURSE_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case COURSE_DETAILS_SUCCESS:
            return {
                loading: false,
                course: action.payload.course,
                success: action.payload.success
            }

        case COURSE_DETAILS_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case COURSE_DETAILS_RESET:
            return {
                ...state,
                loading: false,
                course: {}
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//create new course
export const newCourseReducer = (state = { course: {} }, action) => {
    switch (action.type) {
        case NEW_COURSE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_COURSE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                course: action.payload.course
            }

        case NEW_COURSE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_COURSE_RESET:
            return {
                ...state,
                loading: false,
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

//update and delete course
export const courseReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_COURSE_REQUEST:
        case UPDATE_COURSE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_COURSE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_COURSE_FAIL:
        case UPDATE_COURSE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_COURSE_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_COURSE_RESET:
            return {
                ...state,
                isUpdated: false,
                loading: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}