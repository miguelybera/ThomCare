import axios from 'axios'
import {
    GET_COURSES_REQUEST,
    GET_COURSES_SUCCESS,
    GET_COURSES_FAIL,
    CLEAR_ERRORS
} from '../constants/courseConstants'

// Update user
export const getCourses = () => async(dispatch) => {
    try{
        dispatch({
            type: GET_COURSES_REQUEST
        })

        const { data } = await axios.get(`/api/v1/courses`)
        
        dispatch({
            type: GET_COURSES_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: GET_COURSES_FAIL,
            payload: error.response.data.errMessage
            }
        )
    }
}

//clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}