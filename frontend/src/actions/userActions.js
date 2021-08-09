import axios from 'axios'
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_SUCCESS,
    LOGOUT_FAIL,
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    GET_USER_REQUEST,
    GET_USER_SUCCESS,
    GET_USER_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
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
            payload: error.response.data.message
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
            payload: error.response.data.message
        })
    }
}

//get all users
export const getUsers = () => async (dispatch) => {
    try{
        dispatch({
            type: ALL_USERS_REQUEST
        })

        const { data } = await axios.get('/api/v1/admin/allUsers')

        dispatch({
            type: ALL_USERS_SUCCESS,
            payload: data
        })
    }
    catch(error){
        dispatch({
            type: ALL_USERS_FAIL,
            payload: error.response.data.message
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
            payload: error.response.data.message
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
            payload: error.response.data.message
        })
    }
}

// Register STUDENT
export const register = ( userData ) => async (dispatch) => {
    try {
        dispatch ({
            type: REGISTER_USER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/registerStudent`, userData, config)
        
        dispatch({
            type: REGISTER_USER_SUCCESS,
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: REGISTER_USER_FAIL,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}