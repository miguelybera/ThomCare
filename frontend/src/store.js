import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    authReducer,
    getUsersReducer,
    userDetailsReducer,
    registerReducer,
    forgotPasswordReducer
} from './reducers/userReducers'

import {
    conversationReducer,
    messageReducer,
    sendMessageReducer,
    createConversationReducer
} from './reducers/chatReducers'

import {
    getAnnouncementsReducer
} from './reducers/announcementReducers'

const reducer = combineReducers({
    auth: authReducer,
    users: getUsersReducer,
    singleUser: userDetailsReducer,
    conversations: conversationReducer,
    messages: messageReducer,
    register: registerReducer,
    forgotPassword: forgotPasswordReducer,
    sendMessage: sendMessageReducer,
    createConvo: createConversationReducer,
    announcements: getAnnouncementsReducer
})

let initialState = {} //contains all the data we want to put in this state just before loading the application

//clear the store
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
//const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store