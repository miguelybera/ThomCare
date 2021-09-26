import axios from 'axios'
import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    MY_ANNOUNCEMENTS_REQUEST,
    MY_ANNOUNCEMENTS_SUCCESS,
    MY_ANNOUNCEMENTS_FAIL,
    ANNOUNCEMENT_TYPE_REQUEST,
    ANNOUNCEMENT_TYPE_SUCCESS,
    ANNOUNCEMENT_TYPE_FAIL,
    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,
    ALL_ADMIN_ANNOUNCEMENTS_REQUEST,
    ALL_ADMIN_ANNOUNCEMENTS_SUCCESS,
    ALL_ADMIN_ANNOUNCEMENTS_FAIL,
    ALL_ARCHIVED_ANNOUNCEMENTS_REQUEST,
    ALL_ARCHIVED_ANNOUNCEMENTS_SUCCESS,
    ALL_ARCHIVED_ANNOUNCEMENTS_FAIL,
    NEW_ANNOUNCEMENT_REQUEST,
    NEW_ANNOUNCEMENT_SUCCESS,
    NEW_ANNOUNCEMENT_FAIL,
    UPDATE_ANNOUNCEMENT_REQUEST,
    UPDATE_ANNOUNCEMENT_SUCCESS,
    UPDATE_ANNOUNCEMENT_FAIL,
    ARCHIVE_ANNOUNCEMENT_REQUEST,
    ARCHIVE_ANNOUNCEMENT_SUCCESS,
    ARCHIVE_ANNOUNCEMENT_FAIL,
    DELETE_ANNOUNCEMENT_REQUEST,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAIL,
    NEW_ANNOUNCEMENT_TYPE_REQUEST,
    NEW_ANNOUNCEMENT_TYPE_SUCCESS,
    NEW_ANNOUNCEMENT_TYPE_FAIL,
    DELETE_ANNOUNCEMENT_TYPE_REQUEST,
    DELETE_ANNOUNCEMENT_TYPE_SUCCESS,
    DELETE_ANNOUNCEMENT_TYPE_FAIL,
    CLEAR_ERRORS
} from '../constants/announcementConstants'

import {
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL
} from '../constants/userConstants'

//get all announcements
export const getAnnouncements = (currentPage, course, yearLevel, track, title, announcementType) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ANNOUNCEMENTS_REQUEST
        })

        let link = `/api/v1/announcements?page=${currentPage}${course ? `&course=${course}` : ``}${yearLevel ? `&yearLevel=${yearLevel}` : ``}${track ? `&track=${track}` : ``}${title ? `&keyword=${title}` : ``}${announcementType ? `&announcementType=${announcementType}` : ``}`

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
        })
    }
}

//get announcement type list
export const getAnnouncementType = () => async (dispatch) => {
    try {
        dispatch({
            type: ANNOUNCEMENT_TYPE_REQUEST
        })

        const { data } = await axios.get(`/api/v1/announcementTypes`)

        dispatch({
            type: ANNOUNCEMENT_TYPE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ANNOUNCEMENT_TYPE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get all announcements
export const getAnnouncementDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ANNOUNCEMENT_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/announcement/${id}`)

        dispatch({
            type: ANNOUNCEMENT_DETAILS_SUCCESS,
            payload: data.announcement
        })
    }
    catch (error) {
        dispatch({
            type: ANNOUNCEMENT_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Get admin name
export const getUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/announcement/user/${id}`)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data.singleUser
        })
    }
    catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get all announcements
export const getAdminAnnouncements = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ADMIN_ANNOUNCEMENTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/unarchivedAnnouncements`)

        dispatch({
            type: ALL_ADMIN_ANNOUNCEMENTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_ADMIN_ANNOUNCEMENTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get my announcements
export const getMyAnnouncements = () => async (dispatch) => {
    try {
        dispatch({
            type: MY_ANNOUNCEMENTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/me/announcements`)

        dispatch({
            type: MY_ANNOUNCEMENTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: MY_ANNOUNCEMENTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get all ARCHIVED announcements
export const getArchivedAnnouncements = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_ARCHIVED_ANNOUNCEMENTS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/archivedAnnouncements`)

        dispatch({
            type: ALL_ARCHIVED_ANNOUNCEMENTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_ARCHIVED_ANNOUNCEMENTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//create new announcement
export const createAnnouncement = (announcementData) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_ANNOUNCEMENT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/new/announcement`, announcementData, config)

        dispatch({
            type: NEW_ANNOUNCEMENT_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_ANNOUNCEMENT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//create new announcement
export const createAnnouncementType = (announcementCategory) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_ANNOUNCEMENT_TYPE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/admin/createAnnouncementType`, { announcementCategory }, config)

        dispatch({
            type: NEW_ANNOUNCEMENT_TYPE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: NEW_ANNOUNCEMENT_TYPE_FAIL,
            payload: error.response.data.message
        })
    }
}

// Delete announcement (ADMIN)
export const deleteAnnouncement = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ANNOUNCEMENT_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/announcement/${id}`)

        dispatch({
            type: DELETE_ANNOUNCEMENT_SUCCESS,
            payload: data.success
        })
    }

    catch (error) {
        dispatch({
            type: DELETE_ANNOUNCEMENT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Delete announcement (ADMIN)
export const deleteAnnouncementType = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_ANNOUNCEMENT_TYPE_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/announcementType/${id}`)

        dispatch({
            type: DELETE_ANNOUNCEMENT_TYPE_SUCCESS,
            payload: data.success
        })
    }

    catch (error) {
        dispatch({
            type: DELETE_ANNOUNCEMENT_TYPE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update announcement (ADMIN)
export const updateAnnouncement = (id, announcementData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_ANNOUNCEMENT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/announcement/${id}`, announcementData, config)

        dispatch({
            type: UPDATE_ANNOUNCEMENT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_ANNOUNCEMENT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update announcement (ADMIN)
export const archiveAnnouncement = (id) => async (dispatch) => {
    try {
        dispatch({
            type: ARCHIVE_ANNOUNCEMENT_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/archiveAnnouncement/${id}`, {}, config)


        dispatch({
            type: ARCHIVE_ANNOUNCEMENT_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: ARCHIVE_ANNOUNCEMENT_FAIL,
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