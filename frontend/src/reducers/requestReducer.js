import {
    REQUEST_DETAILS_REQUEST,
    REQUEST_DETAILS_SUCCESS,
    REQUEST_DETAILS_FAIL,
    REQUEST_DETAILS_RESET,
    TRACK_REQUEST_REQUEST,
    TRACK_REQUEST_SUCCESS,
    TRACK_REQUEST_FAIL,
    TRACK_REQUEST_RESET,
    SUBMIT_REQUEST_REQUEST,
    SUBMIT_REQUEST_SUCCESS,
    SUBMIT_REQUEST_FAIL,
    SUBMIT_REQUEST_RESET,
    GET_REQUESTS_REQUEST,
    GET_REQUESTS_SUCCESS,
    GET_REQUESTS_FAIL,
    GET_CROSSENROL_REQUEST,
    GET_CROSSENROL_SUCCESS,
    GET_CROSSENROL_FAIL,
    REQUEST_STATS_REQUEST,
    REQUEST_STATS_SUCCESS,
    REQUEST_STATS_FAIL,
    UPDATE_REQUEST_REQUEST,
    UPDATE_REQUEST_SUCCESS,
    UPDATE_REQUEST_FAIL,
    UPDATE_REQUEST_RESET,
    DELETE_REQUEST_REQUEST,
    DELETE_REQUEST_SUCCESS,
    DELETE_REQUEST_FAIL,
    DELETE_REQUEST_RESET,
    ASSIGN_REQUEST_REQUEST,
    ASSIGN_REQUEST_SUCCESS,
    ASSIGN_REQUEST_FAIL,
    ASSIGN_REQUEST_RESET,
    UNASSIGN_REQUEST_REQUEST,
    UNASSIGN_REQUEST_SUCCESS,
    UNASSIGN_REQUEST_FAIL,
    UNASSIGN_REQUEST_RESET,
    CLEAR_ERRORS
} from '../constants/requestConstants'

//track request reducer
export const trackRequestReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case TRACK_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case TRACK_REQUEST_SUCCESS:
            return {
                loading: false,
                request: action.payload.request,
                success: action.payload.success
            }

        case TRACK_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case TRACK_REQUEST_RESET:
            return {
                ...state,
                success: null,
                error: null,
                request: {}
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }
}

//get single request details
export const getRequestDetailsReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case REQUEST_DETAILS_REQUEST:
            return {
                loading: true
            }


        case REQUEST_DETAILS_SUCCESS:
            return {
                loading: false,
                request: action.payload.request,
                success: action.payload.success
            }

        case REQUEST_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case REQUEST_DETAILS_RESET:
            return {
                ...state,
                success: null,
                request: {}
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

//save form details
export const submitRequestReducer = (state = { request: {} }, action) => {
    switch (action.type) {
        case SUBMIT_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SUBMIT_REQUEST_SUCCESS:
            return {
                loading: false,
                request: action.payload.request,
                success: action.payload.success
            }

        case SUBMIT_REQUEST_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case SUBMIT_REQUEST_RESET:
            return {
                ...state,
                success: null,
                request: {}
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                loading: false,
                error: null
            }

        default:
            return state
    }
}

//get ALL requests
export const getRequestsReducer = (state = { requests: [], pending: [], processing: [], approved: [], denied: [], dailyStats: [], weeklyStats: [], overViewStats: [] }, action) => {
    switch (action.type) {
        case GET_REQUESTS_REQUEST:
            return {
                ...state,
                loading: true,
                requests: [],
                pending: [],
                processing: [],
                approved: [],
                denied: []
            }

        case GET_REQUESTS_SUCCESS:
            return {
                loading: false,
                requests: action.payload.requests,
                pending: action.payload.pending,
                processing: action.payload.processing,
                approved: action.payload.approved,
                denied: action.payload.denied,
                success: action.payload.success
            }

        case GET_REQUESTS_FAIL:
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

export const getStatsReducer = (state = { dailyStats: [], weeklyStats: [] }, action) => {
    switch (action.type) {
        case REQUEST_STATS_REQUEST:
            return {
                ...state,
                loading: true,
                dailyStats: [],
                weeklyStats: [],
                // overViewStats: []
            }

        case REQUEST_STATS_SUCCESS:
            return {
                loading: false,
                dailyStats: action.payload.dailyStats,
                weeklyStats: action.payload.weeklyStats,
                // overViewStats: action.payload.overViewStats,
                success: action.payload.success
            }

        case REQUEST_STATS_FAIL:
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

//get ALL requests
export const getCrossEnrollReducer = (state = { crossEnrollmentIncoming: [], crossEnrollmentOutgoing: [] }, action) => {
    switch (action.type) {
        case GET_CROSSENROL_REQUEST:
            return {
                ...state,
                loading: true,
                crossEnrollmentIncoming: [],
                crossEnrollmentOutgoing: []
            }

        case GET_CROSSENROL_SUCCESS:
            return {
                loading: false,
                crossEnrollmentIncoming: action.payload.crossEnrollmentIncoming,
                crossEnrollmentOutgoing: action.payload.crossEnrollmentOutgoing,
                success: action.payload.success
            }

        case GET_CROSSENROL_FAIL:
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

//update and delete announcement
export const requestReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_REQUEST_REQUEST:
        case UPDATE_REQUEST_REQUEST:
        case ASSIGN_REQUEST_REQUEST:
        case UNASSIGN_REQUEST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_REQUEST_SUCCESS:
        case ASSIGN_REQUEST_SUCCESS:
        case UNASSIGN_REQUEST_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_REQUEST_FAIL:
        case UPDATE_REQUEST_FAIL:
        case ASSIGN_REQUEST_FAIL:
        case UNASSIGN_REQUEST_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_REQUEST_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_REQUEST_RESET:
        case ASSIGN_REQUEST_RESET:
        case UNASSIGN_REQUEST_RESET:
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