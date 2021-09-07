import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import './messenger.css'
import '../online/chatonline.css'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../online/ChatOnline'
import { sendMessage, getConversations, createConversation } from '../../../actions/chatActions'
import axios from 'axios'
import { io } from 'socket.io-client'
import {
    ALL_MESSAGES_REQUEST,
    ALL_MESSAGES_SUCCESS,
    ALL_MESSAGES_FAIL,
    CLEAR_ERRORS
} from '../../../constants/chatConstants'
import {
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL
} from '../../../constants/userConstants'
import { Modal, Button } from 'react-bootstrap'
import MetaData from '../../layout/MetaData'
import Sidebar from '../../layout/Sidebar'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../../constants/dashboardConstants'

const Messenger = () => {
    const dispatch = useDispatch()
    const alert = useAlert();

    const { user } = useSelector(state => state.auth)
    const { conversations } = useSelector(state => state.conversations)
    const { messages } = useSelector(state => state.messages)
    const { success, error } = useSelector(state => state.createConvo)

    const [currentChat, setCurrentChat] = useState(null)
    const [convo, setConvo] = useState(null)
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

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            try {
                dispatch({
                    type: ALL_USERS_REQUEST
                })

                const { data } = await axios.get('/api/v1/chat/users')

                setUsers(data.users)

                dispatch({
                    type: ALL_USERS_SUCCESS,
                    payload: data
                })
            }
            catch (error) {
                dispatch({
                    type: ALL_USERS_FAIL,
                    payload: error.response.data.errMessage
                })
            }
        }
        getUsers()
    }, [user])

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
    }, [])
    //sockets end

    useEffect(() => {
        dispatch(getConversations(userId))

        const getMessages = async (id) => {
            try {
                dispatch({
                    type: ALL_MESSAGES_REQUEST
                })
                const { data } = await axios.get(`/api/v1/getMsg/${id}`)

                setMessageList(data.messages)
                dispatch({
                    type: ALL_MESSAGES_SUCCESS,
                    payload: data
                }
                )
            }
            catch (error) {
                dispatch({
                    type: ALL_MESSAGES_FAIL,
                    payload: error.response.data.errMessage
                }
                )
            }
        }
        getMessages(currentChatId)
    }, [dispatch, user, currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
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

    //modal
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const createConvo = (receiverId) => {
        const conversationDetails = {
            receiverId,
            senderId: userId
        }

        setConvo(conversationDetails)
        dispatch(createConversation(convo))
        handleClose()
    }

    useEffect(() => {
        if (success) {
            setCurrentChat(convo)
            alert.success(success)
        }
        if (error) {
            alert.error(error)
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, success, convo, error])

    const displayUsers = o => {
        if (o._id == userId) {

        } else {
            return (
                <>
                    <div className='chatOnlineFriend' onClick={() => createConvo(o._id)}>
                        <div className='chatOnlineImgContainer'>
                            <img className='chatOnlineImg' src='https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg' alt='' />
                        </div>
                        <span className='chatOnlineName'>{o?.firstName}</span>
                    </div>
                </>
            )
        }
    }
    console.log(currentChat)

    return (
        <>
            <MetaData title={'Messages'} />
            <Sidebar />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>New message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <>
                        <div className='chatOnline'>
                            {users && users.map(o => (
                                displayUsers(o)
                            ))}

                        </div>
                    </>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                </Button>
                </Modal.Footer>
            </Modal>

            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput' />
                        <Button variant="primary" onClick={handleShow}>
                            + New message
                        </Button>
                        {conversations.map((c) => (
                            <Fragment>
                                <div onClick={() => {
                                    setCurrentChat(c)
                                }}>
                                    <Conversation conversation={c} currentUser={user} />
                                </div>
                            </Fragment>
                        ))}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {
                            currentChat ? (<>
                                <p>{currentChat.members[1]}</p>
                                <div className='chatBoxTop'>
                                    {messageList && messageList.map(m => (
                                        <>
                                            <div ref={scrollRef}>
                                                <Message message={m} own={m.sender === userId ? true : false} />
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
                        <ChatOnline onlineUsers={onlineUsers} currentUser={userId} setCurrentChat={setCurrentChat} />
                    </div>
                </div>
            </div>

        </>
    )
}

export default Messenger
