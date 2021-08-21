import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_SUCCESS,
    FORGOT_PASSWORD_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
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
export const login = ( email, password ) => async (dispatch) => {
    try {
        dispatch ({
            type: LOGIN_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/login', { email, password }, config)

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

// Load user
export const loadUser = () => async (dispatch) => {
    try {
        dispatch ({
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

//get all users
export const getUsers = () => async (dispatch) => {
    try{
        dispatch({
            type: ALL_USERS_REQUEST
        })

        const { data } = await axios.get('/api/v1/admin/users')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//Get single user
export const getSingleUser = (id) => async(dispatch) => {
    try{
        dispatch({
            type: GET_USER_REQUEST
        })

        const { data } = await axios.get(`/api/v1/admin/user/${id}`)

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

// Logout user
export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/v1/logout')

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

// Register STUDENT
export const register = ( user ) => async (dispatch) => {
    try {
        dispatch ({
            type: REGISTER_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/registerStudent`, user, config)
        
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

// save STUDENT info
export const saveStudentInfo = (data) => async (dispatch) => {
    dispatch ({
        type: SAVE_STUDENT_INFO,
        payload: data
    })

    localStorage.setItem('studentInfo', JSON.stringify(data))
}

//forgot password
export const forgotPassword = (email) => async (dispatch) => {
    try{

        dispatch({ type: FORGOT_PASSWORD_REQUEST})

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('api/v1/password/forgot', {email}, config)

        dispatch({
            type: FORGOT_PASSWORD_SUCCESS,
            payload: data.message
        })

    }
    catch(error){
        dispatch({
            type: FORGOT_PASSWORD_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

//reset password
export const resetPassword = ( token, passwords ) => async (dispatch) => {
    try {
        dispatch ({
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


// Delete USER (ADMIN)
export const deleteUser = (id) => async(dispatch) => {
    try{
        dispatch({
            type: DELETE_USER_REQUEST
        })

        const { data } = await axios.delete(`/api/v1/admin/user/${id}`)

        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data.success
        })
    }
    
    catch(error){
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data.message
            }
        )
    }
}

// Update USER (ADMIN)
export const updateUser = (id, userData) => async(dispatch) => {
    try{
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
    catch(error){
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data.message
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