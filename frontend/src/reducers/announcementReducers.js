import {
    ALL_ANNOUNCEMENTS_REQUEST,
    ALL_ANNOUNCEMENTS_SUCCESS,
    ALL_ANNOUNCEMENTS_FAIL,
    GET_SINGLE_ANNOUNCEMENT_REQUEST,
    GET_SINGLE_ANNOUNCEMENT_SUCCESS,
    GET_SINGLE_ANNOUNCEMENT_FAIL,
    CLEAR_ERRORS
} from '../constants/announcementConstants'

//get list of announcements
export const getAnnouncementsReducer = (state = { announcements: [] }, action) => {
    switch(action.type){
        case ALL_ANNOUNCEMENTS_REQUEST:
            return {
                loading: true,
                announcements: []
            }

        case ALL_ANNOUNCEMENTS_SUCCESS:
            return {
                loading: false,
                announcements: action.payload.announcements
            }

        case ALL_ANNOUNCEMENTS_FAIL:
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