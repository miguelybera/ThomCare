import { createStore, combineReducers, applyMiddleware } from 'redux'
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
    getAnnouncementTypeReducer,
    getAnnouncementDetailsReducer,
    newAnnouncementReducer,
    newAnnouncementTypeReducer,
    announcementReducer
} from './reducers/announcementReducers'

import {
    trackRequestReducer,
    getRequestDetailsReducer,
    getRequestsReducer,
    getRecentReducer,
    saveFormDetailsReducer,
    requestReducer
} from './reducers/requestReducer'

import {
    newCourseReducer,
    getCoursesReducer,
    getCourseDetailsReducer,
    courseReducer
} from './reducers/courseReducers'

import {
    dashboardReducer
} from './reducers/dashboardReducers'

import {
    auditLogsReducer
} from './reducers/auditReducers'

import {
    createFormReducer,
    formsReducer,
    formDetailsReducer,
    formReducer
} from './reducers/formReducers'


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
    announcementType: getAnnouncementTypeReducer, //get announcement type list
    announcementDetails: getAnnouncementDetailsReducer, //get single announcement details
    newAnnouncement: newAnnouncementReducer, //create new announcement
    newAnnouncementType: newAnnouncementTypeReducer, //create new announcement type
    announcement: announcementReducer, //update or delete announcement

    student: studentInfoReducer, //save trackingNumber and surname ? or request details in local storage
    track: trackRequestReducer,
    requestDetails: getRequestDetailsReducer, //get single request details
    requests: getRequestsReducer, //get all requests
    recents: getRecentReducer,
    saveForm: saveFormDetailsReducer,
    request: requestReducer,

    courses: getCoursesReducer, //get all courses details
    course: courseReducer, // update delete course
    courseDetails: getCourseDetailsReducer, // get course details
    newCourse: newCourseReducer, // update delete course
    audits: auditLogsReducer, //get all audits

    form: formReducer, // update delete form
    forms: formsReducer, // get all forms
    formDetails: formDetailsReducer, // get single form
    newForm: createFormReducer, // create new form

    dashboard: dashboardReducer //check if inside dashboard,
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