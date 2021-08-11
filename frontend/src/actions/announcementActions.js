import axios from 'axios'
import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    GET_SINGLE_ANNOUNCEMENT_REQUEST,
    GET_SINGLE_ANNOUNCEMENT_SUCCESS,
    GET_SINGLE_ANNOUNCEMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/announcementConstants'

//get all announcements
export const getAnnouncements = () => async(dispatch) => {
    try {
        dispatch({
            type: ALL_ANNOUNCEMENTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/announcements`)

        dispatch({
            type: ALL_ANNOUNCEMENTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_ANNOUNCEMENTS_FAIL,
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