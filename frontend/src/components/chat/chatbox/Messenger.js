import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import './messenger.css'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../online/ChatOnline'
import { sendMessage, getConversations, getMessages } from '../../../actions/chatActions'
import axios from 'axios'
import {io} from 'socket.io-client'
import {
    GET_MESSAGES_REQUEST,
    GET_MESSAGES_SUCCESS,
    GET_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../../../constants/chatConstants'

const Messenger = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { conversations } = useSelector(state => state.conversations)
    const { messages } = useSelector(state => state.messages)
    
    const [currentChat, setCurrentChat] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
 
    const scrollRef = useRef()

    let userId = ''
    let currentChatId = ''

    if (user && user._id) {
        userId = user._id
    }

    if (currentChat && currentChat._id) {
        currentChatId = currentChat._id
    }

    //sockets start
    const socket = useRef()

    useEffect(() => {
        socket.current = io('ws://localhost:8900')

        //arrival message
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            })
        })
    }, [])

    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessageList((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

    useEffect(() => {
        //send something to socket server
        socket.current.emit('addUser', userId)
        socket.current.on('getUsers', users => {
            setOnlineUsers(users)
        })
    }, [user])
    //sockets end
    useEffect(() => {
        dispatch(getConversations(userId))
        
        const getMessages = async (id) => {
            try {        
                dispatch({
                    type: GET_MESSAGES_REQUEST
                })
                const { data } = await axios.get(`/api/v1/getMsg/${id}`)
                
                setMessageList(data.messages)
                dispatch({
                    type: GET_MESSAGES_SUCCESS,
                    payload: data
                    }
                )
            }
            catch (error) {
                dispatch({
                    type: GET_MESSAGES_FAIL,
                    payload: error.response.data.message
                    }
                )
            }
        }
        getMessages(currentChatId)
    }, [dispatch, user, currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({behavior: 'smooth'})
    }, [messageList])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const message = {
            sender: userId,
            text: newMessage,
            conversationId: currentChatId
        }

        const receiverId = currentChat.members.find(m => m !== userId)

        socket.current.emit('sendMessage', {
            senderId: userId, 
            receiverId, 
            text: newMessage
        })

        dispatch(sendMessage(message))
        setMessageList([...messageList, message])
        setNewMessage('')
    }

    return (
        <>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput'/>
                        {conversations.map((c) => (
                            <Fragment>
                                <div onClick={() => {
                                    setCurrentChat(c)   
                                }}>
                                    <Conversation conversation={c} currentUser={user}/>
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {
                            currentChat ? (<>
                            <div className='chatBoxTop'>
                                {messageList && messageList.map(m => (
                                    <>
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === userId ? true : false}/>
                                        </div>
                                    </> 
                                ))}
                            </div>
                            <div className='chatBoxBottom'>
                                <textarea
                                    placeholder='Write something . . .' 
                                    className='chatBoxInput'
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                ></textarea>
                                <button className='chatBoxSubmitButton' onClick={handleSubmit}>Send</button>
                            </div>
                        </>) : (
                            <span className='noConversationText'>
                                Open a conversation to start a chat.
                            </span>
                        )
                        }
                    </div>
                </div>
                <div className='chatOnline'>
                    <div className='chatOnlineWrapper'>
                        <ChatOnline onlineUsers={onlineUsers} currentUser={userId} setCurrentChat={setCurrentChat}/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Messenger