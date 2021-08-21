import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,
    ALL_ADMIN_ANNOUNCEMENTS_REQUEST,
    ALL_ADMIN_ANNOUNCEMENTS_SUCCESS,
    ALL_ADMIN_ANNOUNCEMENTS_FAIL,
    CLEAR_ERRORS
} from '../constants/announcementConstants'

//get list of announcements
export const getAnnouncementsReducer = (state = { announcements: [] }, action) => {
    switch (action.type) {
        case ALL_ANNOUNCEMENTS_REQUEST:
        case ALL_ADMIN_ANNOUNCEMENTS_REQUEST:
            return {
                loading: true,
                announcements: []
            }

        case ALL_ANNOUNCEMENTS_SUCCESS:
        case ALL_ADMIN_ANNOUNCEMENTS_SUCCESS:
            return {
                loading: false,
                announcements: action.payload.announcements,
                announcementCount: action.payload.announcementCount,
                resPerPage: action.payload.resPerPage,
                filteredAnnouncementsCount: action.payload.filteredAnnouncementsCount
            }

        case ALL_ANNOUNCEMENTS_FAIL:
        case ALL_ADMIN_ANNOUNCEMENTS_FAIL:
            return {
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

//get single of announcement
export const getSingleAnnouncementReducer = (state = { announcement: {} }, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_DETAILS_REQUEST:
            return {
                loading: true
            }

        case ANNOUNCEMENT_DETAILS_SUCCESS:
            return {
                loading: false,
                announcement: action.payload
            }

        case ANNOUNCEMENT_DETAILS_FAIL:
            return {
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