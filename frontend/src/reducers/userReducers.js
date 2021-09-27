import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_RESET,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_RESET,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_STUDENTS_REQUEST,
    ALL_STUDENTS_SUCCESS,
    ALL_STUDENTS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_RESET,
    SAVE_STUDENT_INFO,
    RESET_STUDENT_INFO,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    REGISTER_USER_RESET,
    VERIFY_STUDENT_REQUEST,
    VERIFY_STUDENT_SUCCESS,
    VERIFY_STUDENT_FAIL,
    VERIFY_STUDENT_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_RESET,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    NEW_PASSWORD_RESET,
    CLEAR_ERRORS
} from '../constants/userConstants'

/**
 * 1. open localhost from new browser
 * 2. log in to an account (gran)
 * 3. check redux store: auth.user = gran
 * 4. log out
 * 5. check redux store: auth.user = null
 * 5. log in to another account (miguel)
 * 6. check redux store: auth.user = miguel
 * 7. go to generate form page
 * 8. click View
 * 9. click Back to return to thomcare site (refreshes page, load_user is fired again)
 * 10. check redux store: auth.user = miguel
 * 11. log out
 * 12. check redux store: auth.user = null
 * 13. log in to another account (abby)
 * 14. check redux store: auth.user = abby
 * 15. go to generate form page
 * 16. click View
 * 17. click Back to return to thomcare site (refreshes page, load_user is fired again)
 * 18. check redux store: auth.user = miguel
 * 19. log out
 * 20. check redux store: auth.user = null
 * 21. log in to another account (abby CICS staff)
 * 22. check redux store: auth.user = abby cics 
 * 23. go to generate form page
 * 24. click View
 * 25. click Back to return to thomcare site (refreshes page, load_user is fired again)
 * 26. check redux store: auth.user = miguel
 * 27. refresh page
 * 28. check redux store: auth.user = abby cics
 * 29. log out
 * 30. check redux store: auth.user = null
 * 31. log in to another account (gran)
 * 32. go to generate form page
 * 33. click View
 * 34. click Back to return to thomcare site (refreshes page, load_user is fired again)
 * 35. check redux store: auth.user = abby cics
 * 
 * hypothesis:
 * - the latest user account before refreshing the page is 
 * - retained even if user logs out and logs in to another user account.
 * - scenario: A logs in, refreshes page, logs out. B logs in (without refreshing page)
 * - and clicks a link that refreshes the page (same tab), the current user will be A, not B.
 * - scenario 2: A logs in, refreshes page, logs out. B logs in (without refreshing page)
 * - and opens a link in the new tab. B refreshes current tab and A is logged in. However,
 * - in that new tab a new page opens and B enters the website link to go back to the website.
 * - B is the current user in Tab2. In Tab1 (original tab), A is logged in but if it is refreshed,
 * - current user will now be B. 
 */
//login, logout, and get currently logged in
export const authReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case LOGIN_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case LOGIN_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                user: action.payload
            }

        case LOGOUT_SUCCESS:
            return {
                loading: false,
                isAuthenticated: false,
                user: null
            }

        case LOAD_USER_FAIL:
            return {
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                user: null,
                error: action.payload
            }

        case LOGOUT_FAIL:
            return {
                ...state,
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


// export const authReducer = (state = { user: {} }, action) => {
//     switch (action.type) {
//         case LOGIN_REQUEST:
//         case LOAD_USER_REQUEST:
//             return {
//                 loading: true,
//                 isAuthenticated: false
//             }

//         case LOGIN_SUCCESS:
//         case LOAD_USER_SUCCESS:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: true,
//                 user: action.payload.user,
//                 success: action.payload.success
//             }

//         case LOGOUT_SUCCESS:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: action.payload //null
//             }

//         case LOAD_USER_FAIL:
//             return {
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 loadError: action.payload //changed 
//             }

//         case LOGOUT_FAIL:
//             return {
//                 ...state,
//                 error: action.payload
//             }

//         case LOGIN_FAIL:
//             return {
//                 ...state,
//                 loading: false,
//                 isAuthenticated: false,
//                 user: null,
//                 error: action.payload
//             }

//         case CLEAR_ERRORS:
//             return {
//                 ...state,
//                 error: null
//             }

//         default:
//             return state
//     }
// }

//get all users
export const getUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USERS_REQUEST:
        case ALL_STUDENTS_REQUEST:
            return {
                loading: true,
                users: []
            }

        case ALL_USERS_SUCCESS:
        case ALL_STUDENTS_SUCCESS:
            return {
                loading: false,
                users: action.payload.users
            }

        case ALL_USERS_FAIL:
        case ALL_STUDENTS_FAIL:
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

//get single user details
export const userDetailsReducer = (state = { singleUser: {} }, action) => {
    switch (action.type) {

        case USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case USER_DETAILS_SUCCESS:
            return {
                loading: false,
                singleUser: action.payload
            }

        case USER_DETAILS_FAIL:
            return {
                ...state,
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

//register user and verify registration link
export const registerReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER_USER_REQUEST:
        case VERIFY_STUDENT_REQUEST:
            return {
                ...state,
                error: null,
                loading: true,
                isCreated: false
            }

        case REGISTER_USER_SUCCESS:
        case VERIFY_STUDENT_SUCCESS:
            return {
                ...state,
                loading: false,
                isCreated: true,
                message: action.payload
            }

        case REGISTER_USER_FAIL:
        case VERIFY_STUDENT_FAIL:
            return {
                ...state,
                loading: false,
                isCreated: false,
                error: action.payload
            }

        case REGISTER_USER_RESET:
        case VERIFY_STUDENT_RESET:
            return {
                ...state,
                isCreated: false,
                studentInfo: {}
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


//update and delete user profile
export const userReducer = (state = {}, action) => {
    switch (action.type) {

        case DELETE_USER_REQUEST:
        case UPDATE_USER_REQUEST:
        case UPDATE_PROFILE_REQUEST:
        case UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DELETE_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isDeleted: action.payload
            }

        case UPDATE_USER_SUCCESS:
        case UPDATE_PASSWORD_SUCCESS:
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                isUpdated: action.payload
            }

        case DELETE_USER_FAIL:
        case UPDATE_USER_FAIL:
        case UPDATE_PASSWORD_FAIL:
        case UPDATE_PROFILE_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }

        case DELETE_USER_RESET:
            return {
                ...state,
                isDeleted: false,
                loading: false
            }

        case UPDATE_USER_RESET:
        case UPDATE_PASSWORD_RESET:
        case UPDATE_PROFILE_RESET:
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

//save student info to local storage
export const studentInfoReducer = (state = { studentInfo: {} }, action) => {
    switch (action.type) {
        case SAVE_STUDENT_INFO: {
            return {
                ...state,
                studentInfo: action.payload
            }
        }

        case RESET_STUDENT_INFO: {
            return {
                ...state,
                studentInfo: null
            }
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

//forgot password and set new password
export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {

        case FORGOT_PASSWORD_REQUEST:
        case NEW_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true,
                error: null
            }

        case FORGOT_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false,
                message: action.payload
            }

        case NEW_PASSWORD_SUCCESS:
            return {
                ...state,
                success: action.payload
            }

        case FORGOT_PASSWORD_FAIL:
        case NEW_PASSWORD_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        case FORGOT_PASSWORD_RESET:
            return {
                loading: false
            }

        case NEW_PASSWORD_RESET:
            return {
                ...state,
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