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
export const getAnnouncements = (currentPage, course, yearLevel, track) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_ANNOUNCEMENTS_REQUEST
        })

        
        let link = `/api/v1/announcements?page=${currentPage}`

        if(course && yearLevel && track) {
            link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}&track=${track}`
        } else if (course && yearLevel) {
            link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}`
        } else if (yearLevel && track) {
            link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}&track=${track}`
        } else if (course && track) {
            link = `/api/v1/announcements?page=${currentPage}&course=${course}&track=${track}`
        } else if (course) {
            link = `/api/v1/announcements?page=${currentPage}&course=${course}`
        } else if (yearLevel) {
            link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}`
        } else if (track) {
            link = `/api/v1/announcements?page=${currentPage}&track=${track}`
        } else {
            link = `/api/v1/announcements?page=${currentPage}`
        }
        
        const { data } = await axios.get(link)

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