import axios from 'axios'
import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../constants/chatConstants'

export const getConversations = (id) => async(dispatch) => {

    try {
        dispatch({
            type: GET_CONVERSATIONS_REQUEST
        })

        const { data } = await axios.get(`/api/v1/convo/${id}`)

        dispatch({
            type: GET_CONVERSATIONS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: GET_CONVERSATIONS_FAIL,
            payload: error.response.data.errMessage
            }
        )
    }
}

//send message
export const sendMessage = ( message ) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SEND_MESSAGE_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/v1/createMsg', message, config)

        dispatch({
            type: SEND_MESSAGE_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: SEND_MESSAGE_FAIL,
            payload: error.response.data.errMessage
        })
    }
}

export const createConversation = (convo) => async(dispatch) => {

    try {
        dispatch({
            type: CREATE_CONVERSATION_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post(`/api/v1/createConvo`, convo, config)

        dispatch({
            type: CREATE_CONVERSATION_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CREATE_CONVERSATION_FAIL,
            payload: error.response.data.errMessage
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