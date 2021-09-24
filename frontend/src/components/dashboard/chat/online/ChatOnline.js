import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import './chatonline.css'
import axios from 'axios'
import {
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL
} from '../../../../constants/userConstants'
import {
    clearErrors
} from '../../../../actions/userActions'

const ChatOnline = ({ onlineUsers, currentUser, setCurrentChat }) => {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])
    const [offlineFriends, setOfflineFriends] = useState([])

    const dispatch = useDispatch()

    const imglink = 'https://res.cloudinary.com/dwcxehcui/image/upload/v1632063359/logo/default_w0escb.png'

    useEffect(() => {
        const getFriends = async () => {
            try {
                dispatch({
                    type: ALL_USERS_REQUEST
                })

                const { data } = await axios.get('/api/v1/chat/users')

                setFriends(data.users)

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
                
                alert.error(error)
                dispatch(clearErrors())
            }
        }
        getFriends()
    }, [currentUser])

    const getOnlineUsers = (userId) => {
        return onlineUsers.find((user) => user.userId === userId && user.userId !== currentUser);
    };

    // const getOfflineUsers = (userId) => {
    //     return friends.find((user) => user._id !== userId && user.userId !== currentUser);
    // };

    useEffect(() => {
        setOnlineFriends(
            friends.filter(f =>
                getOnlineUsers(f._id)
            )
        )

        // setOfflineFriends(
        //     friends.filter(f => 
        //         getOfflineUsers(f._id)
        //     )
        // ) //showing all users though

        //f._id is the id per json in friends(users)
    }, [onlineUsers, friends])

    const openConversation = async (user) => {
        const firstUserId = user._id
        try {
            const { data } = await axios.get(`/api/v1/find/${firstUserId}/${currentUser}`)

            setCurrentChat(data.conversation)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className='chatOnline'>
                {onlineFriends.map(o => (
                    <>
                        <div className='chatOnlineFriend' onClick={() => openConversation(o)}>
                            <div className='chatOnlineImgContainer'>
                                <img className='chatOnlineImg' src={imglink} alt='' />
                                <div className='chatOnlineBadge'></div>
                            </div>
                            <span className='chatOnlineName'>{o?.firstName}</span>
                        </div>
                    </>
                ))}

            </div>
        </>
    )
}

export default ChatOnline
