import {
    GET_AUDIT_REQUEST,
    GET_AUDIT_SUCCESS,
    GET_AUDIT_FAIL,
    CLEAR_ERRORS
} from '../constants/auditConstants'

//get audit logs
export const auditLogsReducer = (state = { audits: [] }, action) => {
    switch (action.type) {

        case GET_AUDIT_REQUEST:
            return {
                ...state,
                loading: true,
                audits: []
            }

        case GET_AUDIT_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                audits: action.payload.audits
            }

        case GET_AUDIT_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
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
