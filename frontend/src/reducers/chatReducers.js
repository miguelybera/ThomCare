import {
    SEND_MESSAGE_REQUEST,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_FAIL,
    SEND_MESSAGE_RESET,
    CREATE_CONVERSATION_REQUEST,
    CREATE_CONVERSATION_SUCCESS,
    CREATE_CONVERSATION_FAIL,
    CREATE_CONVERSATION_RESET,
    GET_CONVERSATIONS_REQUEST,
    GET_CONVERSATIONS_SUCCESS,
    GET_CONVERSATIONS_FAIL,
    GET_BOTH_CONVERSATIONS_REQUEST,
    GET_BOTH_CONVERSATIONS_SUCCESS,
    GET_BOTH_CONVERSATIONS_FAIL,
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../constants/chatConstants'

//create conversation
export const createConversationReducer = (state = {}, action) => {
    switch(action.type){
        
        case CREATE_CONVERSATION_REQUEST:
            return {
                loading: true
            }

        case CREATE_CONVERSATION_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case CREATE_CONVERSATION_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                success: false
            }

        case CREATE_CONVERSATION_RESET:
            return {
                ...state,
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

//get conversations
export const conversationReducer = (state = { conversations: [] }, action ) => {
    switch(action.type) {
        case GET_CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_CONVERSATIONS_SUCCESS:
            return {
                loading: false,
                conversations: action.payload.conversations
            }

        case GET_CONVERSATIONS_FAIL:
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

//get conversations
export const bothConversationReducer = (state = { conversation: {} }, action ) => {
    switch(action.type) {
        case GET_BOTH_CONVERSATIONS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case GET_BOTH_CONVERSATIONS_SUCCESS:
            return {
                loading: false,
                conversation: action.payload
            }

        case GET_BOTH_CONVERSATIONS_FAIL:
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

//send message
export const sendMessageReducer = (state = {}, action) => {
    switch(action.type){
        
        case SEND_MESSAGE_REQUEST:
            return {
                loading: true
            }

        case SEND_MESSAGE_SUCCESS:
            return {
                ...state,
                loading: false,
                success: action.payload
            }

        case SEND_MESSAGE_FAIL:
            return {
                ...state,
                loading: false,
                error: true,
                success: false
            }

        case SEND_MESSAGE_RESET:
            return {
                ...state,
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

//get all messages
export const messageReducer = ( state = { messages: [] }, action) => {
    switch(action.type){
        case GET_MESSAGES_REQUEST:
            return {
                loading: true,
                messages: []
            }
        
        case GET_MESSAGES_SUCCESS:
            return {
                loading: false,
                messages: action.payload.messages
            }
        
        case GET_MESSAGES_FAIL:
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