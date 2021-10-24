import axios from 'axios'
import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    DELETE_CONVERSATION_REQUEST,
    DELETE_CONVERSATION_SUCCESS,
    DELETE_CONVERSATION_FAIL,
    ALL_CONVERSATIONS_REQUEST,
    ALL_CONVERSATIONS_SUCCESS,
    ALL_CONVERSATIONS_FAIL,
    CLEAR_ERRORS
} from '../constants/chatConstants'

//get all conversations
export const getConversations = (id, name) => async (dispatch) => {
    try {
        dispatch({
            type: ALL_CONVERSATIONS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/conversations/${id}?${name ? `keyword=${name}` : ``}`)

        dispatch({
            type: ALL_CONVERSATIONS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ALL_CONVERSATIONS_FAIL,
            payload: error.response.data.message
        })
    }
}

//send message
export const sendMessage = (message) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEND_MESSAGE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/create/message', message, config)

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error.response.data.message
        })
    }
}

//create new conversation
export const createConversation = (conversation) => async (dispatch) => {

    try {
        dispatch({
            type: CREATE_CONVERSATION_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/create/conversation`, conversation, config)

        dispatch({
            type: CREATE_CONVERSATION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CREATE_CONVERSATION_FAIL,
            payload: error.response.data.message
        })
    }
}

//create new conversation
export const deleteConversation = (id) => async (dispatch) => {

    try {
        dispatch({
            type: DELETE_CONVERSATION_REQUEST
        })


        const { data } = await axios.delete(`/api/v1/delete/${id}`)

        dispatch({
            type: DELETE_CONVERSATION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_CONVERSATION_FAIL,
            payload: error.response.data.message
        })
    }
}

//clear errors
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}