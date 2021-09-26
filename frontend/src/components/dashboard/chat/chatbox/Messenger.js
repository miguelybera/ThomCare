import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button } from 'react-bootstrap'
import { sendMessage, createConversation, clearErrors } from './../../../../actions/chatActions'
import { ALL_MESSAGES_REQUEST, ALL_MESSAGES_SUCCESS, ALL_MESSAGES_FAIL, ALL_CONVERSATIONS_REQUEST, ALL_CONVERSATIONS_SUCCESS, ALL_CONVERSATIONS_FAIL } from '../../../../constants/chatConstants'
import { ALL_USERS_REQUEST, ALL_USERS_SUCCESS, ALL_USERS_FAIL } from '../../../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../../constants/dashboardConstants'
import axios from 'axios'
import { io } from 'socket.io-client'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import MetaData from '../../../layout/MetaData'
import Sidebar from '../../../layout/Sidebar'
import Loader from '../../../layout/Loader'
import './messenger.css'
import '../online/chatonline.css'

const Messenger = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()
    const scrollRef = useRef()
    const socket = useRef()

    const { user } = useSelector(state => state.auth)
    const { loading } = useSelector(state => state.conversations)
    const { loading: messagesLoading } = useSelector(state => state.messages)
    const { conversation, message: convMessage, error } = useSelector(state => state.createConvo)

    const [currentChat, setCurrentChat] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [newMessage, setNewMessage] = useState('')
    const [arrivalMessage, setArrivalMessage] = useState('')
    const [conversationList, setConversationList] = useState([])
    const [onlineUsers, setOnlineUsers] = useState([])
    const [userName, setUserName] = useState('')
    const [search, setSearch] = useState('')
    const [users, setUsers] = useState([])
    const [createConvoClicked, setCreateConvoClicked] = useState(0)
    const [clicked, setClicked] = useState(0)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const name = user && user.firstName + ' ' + user.lastName
    const imglink = 'https://res.cloudinary.com/dwcxehcui/image/upload/v1632063359/logo/default_w0escb.png'

    let userId = ''
    let currentChatId = ''

    const searchButton = () => { setClicked(clicked + 1) }

    if (user && user._id) { userId = user._id }

    if (currentChat && currentChat._id) { currentChatId = currentChat._id }

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
                    payload: error.response.data.message
                })
            }
        }
        getUsers()
    }, [user])

    useEffect(() => {
        const getConversations = async (id, name) => {
            try {
                dispatch({
                    type: ALL_CONVERSATIONS_REQUEST
                })

                const { data } = await axios.get(`/api/v1/convo/${id}?${name ? `keyword=${name}` : ``}`)

                dispatch({
                    type: ALL_CONVERSATIONS_SUCCESS,
                    payload: data
                })

                setConversationList(data.conversations)
            }
            catch (error) {
                dispatch({
                    type: ALL_CONVERSATIONS_FAIL,
                    payload: error.response.data.errMessage
                }
                )
            }
        }

        getConversations(userId, search)

    }, [userId, clicked, conversation])

    useEffect(() => {
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
                    payload: error.response.data.message
                })
            }
        }

        getMessages(currentChatId)
    }, [dispatch, user, currentChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messageList])

    useEffect(() => {
        if (conversation) {
            history.push('/messenger')
            setCurrentChat(conversation)

            socket.current.emit('newConversation', conversation)

            setUserName(conversation.names[0] === name ? conversation.names[1] : conversation.names[0])

            if (convMessage) {
                alert.success(convMessage)
            }
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, convMessage, conversation, error])

    const createConvo = (receiverId, firstMember, secondMember) => {
        const conversationDetails = {
            receiverId,
            senderId: userId,
            firstMember,
            secondMember
        }

        dispatch(createConversation(conversationDetails))
        setCreateConvoClicked(createConvoClicked + 1)
        handleClose()
    }

    const displayUsers = o => {
        if (o._id !== userId) {
            return (
                <>
                    <div
                        className='chatOnlineFriend'
                        onClick={
                            () => createConvo(o._id, o.firstName + ' ' + o.lastName, user.firstName + ' ' + user.lastName)
                        }
                    >
                        <div className='chatOnlineImgContainer'>
                            <img className='chatOnlineImg' src={imglink} alt='' />
                        </div>
                        <span className='chatOnlineName'>{o?.firstName} {o?.lastName}</span>
                    </div>
                </>
            )
        }
    }

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
    //sockets start
    useEffect(() => {
        socket.current = io('/')

        //arrival message
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now()
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
                        <input
                            placeholder='Search for friends'
                            className='chatMenuInput'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button onClick={() => searchButton()}>Search</Button>
                        <Button variant="primary" onClick={handleShow}>
                            + New message
                        </Button>
                        {loading ? <Loader /> : (
                            conversationList && conversationList.map((c) => (
                                <Fragment>
                                    <div onClick={() => {
                                        setSearch('')
                                        setCurrentChat(c)
                                        setUserName(c.names[0] === name ? c.names[1] : c.names[0])
                                    }}>
                                        <Conversation receiverName={c.names[0] === name ? c.names[1] : c.names[0]} />
                                    </div>
                                </Fragment>
                            ))
                        )}
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        {
                            currentChat ? (<>
                                <p>{userName && userName}</p>
                                <div className='chatBoxTop'>
                                    {messagesLoading ? <Loader /> : (
                                        messageList && messageList.map(m => (
                                            <>
                                                <div ref={scrollRef}>
                                                    <Message message={m} own={m.sender === userId ? true : false} />
                                                </div>
                                            </>
                                        ))
                                    )}
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
            </div>

        </>
    )
}

export default Messenger
