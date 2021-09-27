import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    ALL_STUDENTS_REQUEST,
    ALL_STUDENTS_SUCCESS,
    ALL_STUDENTS_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PASSWORD_REQUEST,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    SAVE_STUDENT_INFO,
    RESET_STUDENT_INFO,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    NEW_PASSWORD_REQUEST,
    NEW_PASSWORD_SUCCESS,
    NEW_PASSWORD_FAIL,
    CLEAR_ERRORS
} from '../constants/userConstants'

// Login
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/login`, { email, password }, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOGIN_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// export const login = (email, password) => async (dispatch) => {
//     try {
//         dispatch({
//             type: LOGIN_REQUEST
//         })

//         const config = {
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         }

//         const { data } = await axios.post('/api/v1/login', { email, password }, config)

//         dispatch({
//             type: LOGIN_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: LOGIN_FAIL,
//             payload: error.response.data.errMessage
//         })
//     }
// }

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/v1/logout`)

        dispatch({
            type: LOGOUT_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: LOGOUT_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// export const logout = () => async (dispatch) => {
//     try {
//         await axios.get('/api/v1/logout')

//         dispatch({
//             type: LOGOUT_SUCCESS,
//             payload: null
//         })

//     } catch (error) {
//         dispatch({
//             type: LOGOUT_FAIL,
//             payload: error.response.data.errMessage
//         })
//     }
// }

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch({
            type: LOAD_USER_REQUEST
        })

        const { data } = await axios.get('/api/v1/me')

        dispatch({
            type: LOAD_USER_SUCCESS,
            payload: data.user
        })

    } catch (error) {
        dispatch({
            type: LOAD_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}
// export const loadUser = () => async (dispatch) => {
//     try {
//         dispatch({
//             type: LOAD_USER_REQUEST
//         })

//         const { data } = await axios.get('/api/v1/me')

//         dispatch({
//             type: LOAD_USER_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: LOAD_USER_FAIL,
//             payload: error.response.data.errMessage
//         })
//     }
// }

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try {

        dispatch({ type: FORGOT_PASSWORD_REQUEST })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('api/v1/password/forgot', { email }, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    }
    catch (error) {
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//reset password
export const resetPassword = (token, passwords) => async (dispatch) => {
    try {
        dispatch({
            type: NEW_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/password/reset/${token}`, passwords, config)

        dispatch({
            type: NEW_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: NEW_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get all users
export const getUsers = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_USERS_REQUEST
        })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//get all students
export const getStudents = () => async (dispatch) => {
    try {
        dispatch({
            type: ALL_STUDENTS_REQUEST
        })

        const { data } = await axios.get('/api/v1/deptChair/users')

        dispatch({
            type: ALL_STUDENTS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_STUDENTS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Get single user
export const getUserDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

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

// Register
export const register = (admin, user) => async (dispatch) => {
    try {
        dispatch({
            type: REGISTER_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        let link = ''

        if (admin) {
            link = `/api/v1/admin/register`
        } else {
            link = `/api/v1/registerStudent`
        }

        const { data } = await axios.post(link, user, config)

        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.message
        })

        dispatch({
            type: RESET_STUDENT_INFO
        })

        localStorage.setItem('studentInfo', JSON.stringify({}))
    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// save student info to local storage
export const saveStudentInfo = (data) => async (dispatch) => {
    dispatch({
        type: SAVE_STUDENT_INFO,
        payload: data
    })

    localStorage.setItem('studentInfo', JSON.stringify(data))
}

// Update user password
export const updatePassword = (passwords) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PASSWORD_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put('/api/v1/password/update', passwords, config)

        dispatch({
            type: UPDATE_PASSWORD_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: UPDATE_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// update profile
export const updateProfile = (userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_PROFILE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/me/update`, userData, config)

        dispatch({
            type: UPDATE_PROFILE_SUCCESS,
            payload: data.success
        })

        localStorage.setItem('studentInfo', JSON.stringify({}))
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Delete user
export const deleteUser = (id) => async (dispatch) => {
    try {
        dispatch({
            type: DELETE_USER_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    }

    catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

// Update user
export const updateUser = (id, userData) => async (dispatch) => {
    try {
        dispatch({
            type: UPDATE_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.put(`/api/v1/admin/user/${id}`, userData, config)

        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data.success
        })
    }
    catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
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