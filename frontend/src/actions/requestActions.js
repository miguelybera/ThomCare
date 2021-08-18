import axios from 'axios'
import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/requestConstants'

//Get single user
export const trackRequest = ( userInput ) => async(dispatch) => {
    try{
        dispatch({
            type: REQUEST_DETAILS_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/requestTracker`, userInput, config )

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data.request
        })
    }
    catch(error){
        dispatch({
            type: REQUEST_DETAILS_FAIL,
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