import axios from 'axios'
import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,
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

//get all announcements
export const getAnnouncementDetails = (id) => async(dispatch) => {
    try {
        dispatch({
            type: ANNOUNCEMENT_DETAILS_REQUEST
        })

        const { data }= await axios.get(`/api/v1/announcement/${id}`)

        dispatch({
            type: ANNOUNCEMENT_DETAILS_SUCCESS,
            payload: data.announcement
        })
    }
    catch (error) {
        dispatch({
            type: ANNOUNCEMENT_DETAILS_FAIL,
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