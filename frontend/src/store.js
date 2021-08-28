import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    authReducer,
    getUsersReducer,
    userDetailsReducer,
    registerReducer,
    forgotPasswordReducer,
    studentInfoReducer,
    userReducer
} from './reducers/userReducers'

import {
    conversationReducer,
    messageReducer,
    sendMessageReducer,
    createConversationReducer
} from './reducers/chatReducers'

import {
    getAnnouncementsReducer,
    getAnnouncementDetailsReducer,
    newAnnouncementReducer,
    announcementReducer
} from './reducers/announcementReducers'

import {
    getRequestDetailsReducer,
    saveFormDetailsReducer
} from './reducers/requestReducer'

import {
    getCoursesReducer
} from './reducers/courseReducers'

const reducer = combineReducers({
    auth: authReducer, //get currently logged in, for login and logout
    users: getUsersReducer, //get all users
    singleUser: userDetailsReducer, //get single user details
    user: userReducer, //update and delete profile
    
    conversations: conversationReducer, //get all conversations of user
    messages: messageReducer, //get all messages in conversation
    sendMessage: sendMessageReducer, //send message in conversation
    createConvo: createConversationReducer, //for creating conversation with a user

    register: registerReducer, //register and verify registration link
    forgotPassword: forgotPasswordReducer, //for forgot password and set new password

    announcements: getAnnouncementsReducer, //get all announcements
    announcementDetails: getAnnouncementDetailsReducer, //get single announcement details
    newAnnouncement: newAnnouncementReducer, //create new announcement
    announcement: announcementReducer, //update or delete announcement
    
    student: studentInfoReducer, //save trackingNumber and surname ? or request details in local storage
    request: getRequestDetailsReducer, //get single request details
    form: saveFormDetailsReducer,
    
    courses: getCoursesReducer //get single request details
})



let initialState = {
    student: {
        studentInfo: localStorage.getItem('studentInfo') ? JSON.parse(localStorage.getItem('studentInfo')) : {}
    },
    request: {
        request: localStorage.getItem('trackData') ? JSON.parse(localStorage.getItem('trackData')) : {}
    }
} //contains all the data we want to put in this state just before loading the application

//clear the store
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
//const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store