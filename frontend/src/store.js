import { createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {
    authReducer,
    getUsersReducer,
    userDetailsReducer
} from './reducers/userReducers'

import {
    conversationReducer,
    messageReducer
} from './reducers/chatReducers'


const reducer = combineReducers({
    auth: authReducer,
    users: getUsersReducer,
    singleUser: userDetailsReducer,
    conversations: conversationReducer,
    messages: messageReducer
})

let initialState = {} //contains all the data we want to put in this state just before loading the application

//clear the store
const middleware = [thunk]
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))
//const store = createStore(reducer, initialState, applyMiddleware(...middleware))

export default store