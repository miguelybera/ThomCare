import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import './messenger.css'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../online/ChatOnline'
import { sendMessage, getConversations, getMessages } from '../../../actions/chatActions'
import axios from 'axios'

const Messenger = () => {
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { conversations } = useSelector(state => state.conversations)
    const { messages } = useSelector(state => state.messages)
    
    const [currentChat, setCurrentChat] = useState(null)
    const [messageList, setMessageList] = useState([])
    const [newMessage, setNewMessage] = useState('')

    let userId = ''
    let currentChatId = ''

    if (user && user._id) {
        userId = user._id
    }

    if (currentChat && currentChat._id) {
        currentChatId = currentChat._id
    }
 
    useEffect(() => {
        dispatch(getConversations(userId))
        
        const getMessages = async (id) => {
            try {        
                const { data } = await axios.get(`/api/v1/getMsg/${id}`)
                
                setMessageList(data.messages)
            }
            catch (error) {
                console.log(error)
            }
        }
        getMessages(currentChatId)
    }, [dispatch, user, currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault()

        const message = {
            sender: userId,
            text: newMessage,
            conversationId: currentChatId
        }

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
                                    <Message message={m} own={m.sender === userId ? true : false}/>
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
                        <ChatOnline/>
                        <ChatOnline/>
                        <ChatOnline/>
                    </div>
                </div>
            </div>
            
        </>
    )
}

export default Messenger
