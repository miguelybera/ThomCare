import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    MY_ANNOUNCEMENTS_REQUEST,
    MY_ANNOUNCEMENTS_SUCCESS,
    MY_ANNOUNCEMENTS_FAIL,
    ANNOUNCEMENT_DETAILS_REQUEST,
    ANNOUNCEMENT_DETAILS_SUCCESS,
    ANNOUNCEMENT_DETAILS_FAIL,
    ANNOUNCEMENT_DETAILS_RESET,
    ANNOUNCEMENT_TYPE_REQUEST,
    ANNOUNCEMENT_TYPE_SUCCESS,
    ANNOUNCEMENT_TYPE_FAIL,
    ALL_ADMIN_ANNOUNCEMENTS_REQUEST,
    ALL_ADMIN_ANNOUNCEMENTS_SUCCESS,
    ALL_ADMIN_ANNOUNCEMENTS_FAIL,
    ALL_ARCHIVED_ANNOUNCEMENTS_REQUEST,
    ALL_ARCHIVED_ANNOUNCEMENTS_SUCCESS,
    ALL_ARCHIVED_ANNOUNCEMENTS_FAIL,
    NEW_ANNOUNCEMENT_REQUEST,
    NEW_ANNOUNCEMENT_SUCCESS,
    NEW_ANNOUNCEMENT_FAIL,
    NEW_ANNOUNCEMENT_RESET,
    UPDATE_ANNOUNCEMENT_REQUEST,
    UPDATE_ANNOUNCEMENT_SUCCESS,
    UPDATE_ANNOUNCEMENT_FAIL,
    UPDATE_ANNOUNCEMENT_RESET,
    ARCHIVE_ANNOUNCEMENT_REQUEST,
    ARCHIVE_ANNOUNCEMENT_SUCCESS,
    ARCHIVE_ANNOUNCEMENT_FAIL,
    ARCHIVE_ANNOUNCEMENT_RESET,
    DELETE_ANNOUNCEMENT_REQUEST,
    DELETE_ANNOUNCEMENT_SUCCESS,
    DELETE_ANNOUNCEMENT_FAIL,
    DELETE_ANNOUNCEMENT_RESET,
    NEW_ANNOUNCEMENT_TYPE_REQUEST,
    NEW_ANNOUNCEMENT_TYPE_SUCCESS,
    NEW_ANNOUNCEMENT_TYPE_FAIL,
    NEW_ANNOUNCEMENT_TYPE_RESET,
    DELETE_ANNOUNCEMENT_TYPE_REQUEST,
    DELETE_ANNOUNCEMENT_TYPE_SUCCESS,
    DELETE_ANNOUNCEMENT_TYPE_FAIL,
    DELETE_ANNOUNCEMENT_TYPE_RESET,
    CLEAR_ERRORS
} from '../constants/announcementConstants'

//get list of announcement type
export const getAnnouncementTypeReducer = (state = { announcementTypes: [] }, action) => {
    switch (action.type) {
        case ANNOUNCEMENT_TYPE_REQUEST:
            return {
                ...state,
                loading: true,
                announcementTypes: []
            }

        case ANNOUNCEMENT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                announcementTypes: action.payload.announcementTypes,
                success: action.payload.success
            }

        case ANNOUNCEMENT_TYPE_FAIL:
            return {
                ...state,
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

//get list of announcements
export const getAnnouncementsReducer = (state = { announcements: [], announcementTypes: [] }, action) => {
    switch (action.type) {
        case ALL_ANNOUNCEMENTS_REQUEST:
        case MY_ANNOUNCEMENTS_REQUEST:
        case ALL_ADMIN_ANNOUNCEMENTS_REQUEST:
        case ALL_ARCHIVED_ANNOUNCEMENTS_REQUEST:
            return {
                loading: true,
                announcements: [],
                announcementTypes: []
            }

        case ALL_ANNOUNCEMENTS_SUCCESS:
        case MY_ANNOUNCEMENTS_SUCCESS:
        case ALL_ADMIN_ANNOUNCEMENTS_SUCCESS:
        case ALL_ARCHIVED_ANNOUNCEMENTS_SUCCESS:
            return {
                loading: false,
                announcements: action.payload.announcements,
                announcementCount: action.payload.announcementCount,
                resPerPage: action.payload.resPerPage,
                filteredAnnouncementsCount: action.payload.filteredAnnouncementsCount
            }

        case ALL_ANNOUNCEMENTS_FAIL:
        case MY_ANNOUNCEMENTS_FAIL:
        case ALL_ADMIN_ANNOUNCEMENTS_FAIL:
        case ALL_ARCHIVED_ANNOUNCEMENTS_FAIL:
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
export const getAnnouncementDetailsReducer = (state = { announcement: {} }, action) => {
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

        case ANNOUNCEMENT_DETAILS_RESET:
            return {
                ...state,
                success: null,
                announcement: {}
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

//create new announcement
export const newAnnouncementReducer = (state = { announcement: {} }, action) => {
    switch (action.type) {
        case NEW_ANNOUNCEMENT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANNOUNCEMENT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                announcement: action.payload.announcement
            }

        case NEW_ANNOUNCEMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_ANNOUNCEMENT_RESET:
            return {
                ...state,
                loading: false,
                success: false
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

//create new announcement
export const newAnnouncementTypeReducer = (state = { announcementType: {} }, action) => {
    switch (action.type) {
        case NEW_ANNOUNCEMENT_TYPE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case NEW_ANNOUNCEMENT_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                announcementType: action.payload.announcementType
            }

        case NEW_ANNOUNCEMENT_TYPE_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case NEW_ANNOUNCEMENT_TYPE_RESET:
            return {
                ...state,
                loading: false,
                success: false
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

//update and delete announcement
export const announcementReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_ANNOUNCEMENT_REQUEST:
        case UPDATE_ANNOUNCEMENT_REQUEST:
        case ARCHIVE_ANNOUNCEMENT_REQUEST:
        case DELETE_ANNOUNCEMENT_TYPE_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_ANNOUNCEMENT_SUCCESS:
        case DELETE_ANNOUNCEMENT_TYPE_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_ANNOUNCEMENT_SUCCESS:
        case ARCHIVE_ANNOUNCEMENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_ANNOUNCEMENT_FAIL:
        case UPDATE_ANNOUNCEMENT_FAIL:
        case ARCHIVE_ANNOUNCEMENT_FAIL:
        case DELETE_ANNOUNCEMENT_TYPE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_ANNOUNCEMENT_RESET:
        case DELETE_ANNOUNCEMENT_TYPE_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_ANNOUNCEMENT_RESET:
        case ARCHIVE_ANNOUNCEMENT_RESET:
            return {
                ...state,
                isUpdated: false,
                loading: false
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