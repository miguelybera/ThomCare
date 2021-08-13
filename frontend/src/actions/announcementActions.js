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

import {
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL
} from '../constants/userConstants'

//get all announcements
export const getAnnouncements = (currentPage, course, yearLevel, track, title) => async(dispatch) => {
    try {
        dispatch({
            type: ALL_ANNOUNCEMENTS_REQUEST
        })

        let link = ``
        
        if (course == '' && yearLevel == '' && track  == '' && title == '')  {
            link = `/api/v1/announcements?page=${currentPage}`
        }
        else {
            if(course && yearLevel && track && title) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}&track=${track}&keyword=${title}`
            } else if (course && yearLevel && track) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}&track=${track}`
            } else if (course && track && title) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&track=${track}&keyword=${title}`
            } else if (yearLevel && course && title) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}&keyword=${title}`
            } else if (yearLevel && title && track) {
                link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}&track=${track}&keyword=${title}`
            } else if (course && yearLevel) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&yearLevel=${yearLevel}`
            } else if (course && title) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&keyword=${title}`
            } else if (course && track) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&track=${track}`
            } else if (yearLevel && title) {
                link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}&keyword=${title}`
            } else if (track && course) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}&track=${track}`
            } else if (track && title) {
                link = `/api/v1/announcements?page=${currentPage}&track=${track}&keyword=${title}`
            } else if (yearLevel && track) {
                link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}&track=${track}`
            } else if (course) {
                link = `/api/v1/announcements?page=${currentPage}&course=${course}`
            } else if (title) {
                link = `/api/v1/announcements?page=${currentPage}&keyword=${title}`
            } else if (track) {
                link = `/api/v1/announcements?page=${currentPage}&track=${track}`
            } else {
                link = `/api/v1/announcements?page=${currentPage}&yearLevel=${yearLevel}`
            }
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

//Get admin name
export const getUser = (id) => async(dispatch) => {
    try{
        dispatch({
            type: GET_USER_REQUEST
        })
        
        const { data } = await axios.get(`/api/v1/announcement/user/${id}`)

        dispatch({
            type: GET_USER_SUCCESS,
            payload: data.singleUser
        })
    }
    catch(error){
        dispatch({
            type: GET_USER_FAIL,
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