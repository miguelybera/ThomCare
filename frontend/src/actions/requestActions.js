import axios from 'axios'
import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    CLEAR_ERRORS
} from '../constants/requestConstants'

//Get request (using tracking number)
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

        
        localStorage.setItem('trackData', JSON.stringify(data.request))

        dispatch({
            type: REQUEST_DETAILS_SUCCESS,
            payload: data
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