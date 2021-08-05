import React, { Fragment, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from  'react-redux'
import './chatonline.css'
import axios from 'axios'
import {
    ALL_USERS_REQUEST,
    ALL_USERS_SUCCESS,
    ALL_USERS_FAIL,
    CLEAR_ERRORS
} from '../../../constants/userConstants'

const ChatOnline = ({onlineUsers, currentUser, setCurrentChat}) => {

    const [friends, setFriends] = useState([])
    const [onlineFriends, setOnlineFriends] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        const getFriends = async() => {
            try{
                dispatch({
                    type: ALL_USERS_REQUEST
                })
        
                const { data } = await axios.get('/api/v1/admin/allUsers')
                
                setFriends(data.users)
                console.log(friends)
                dispatch({
                    type: ALL_USERS_SUCCESS,
                    payload: data
                })
            }
            catch(error){
                dispatch({
                    type: ALL_USERS_FAIL,
                    payload: error.response.data.message
                })
            }
        }
        getFriends()
    }, [currentUser])

    const getUser = (userId) => {
        return onlineUsers.find((user) => user.userId === userId && user.userId !== currentUser);
    };

    useEffect(() => {
        setOnlineFriends(
            friends.filter(f => 
                getUser(f._id)
            )
        )
        //f._id is the id per json in friends(users)

        console.log(onlineFriends)
    },[onlineUsers, friends])

    return (
        <>
            <div className='chatOnline'>
                {onlineFriends.map(o => (
                    <>
                        <div className='chatOnlineFriend'>
                            <div className='chatOnlineImgContainer'>
                                <img className='chatOnlineImg' src='https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg' alt=''/>
                                <div className='chatOnlineBadge'>

                                </div>
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
