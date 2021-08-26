import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'


//get single request details
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