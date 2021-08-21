import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { getUserDetails } from '../../../actions/userActions'
import './conversation.css'
import axios from 'axios'
import {
    GET_USER_DETAILS_REQUEST,
    GET_USER_DETAILS_SUCCESS,
    GET_USER_DETAILS_FAIL
} from './../../../constants/userConstants'

const Conversations = ({conversation, currentUser}) => {
    const dispatch = useDispatch()
    
    const [friend, setFriend] = useState(null) 
    const imglink = 'https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg'

    useEffect(() => {
        const receiver = conversation.members.find(m => m !== currentUser._id)

        const getUser = async () => {
            try {
                dispatch({
                    type: GET_USER_DETAILS_REQUEST
                })

                const { data } = await axios.get(`/api/v1/chat/user/${receiver}`)
                
                dispatch({
                    type: GET_USER_DETAILS_SUCCESS,
                    payload: data.singleUser
                })

                setFriend(data)
            } catch (error) {
                dispatch({
                    type: GET_USER_DETAILS_FAIL,
                    payload: error.response.data.errMessage
                })
            }
        }
        getUser()
    }, [dispatch, currentUser, conversation])

    return (
        <>
            <div className='conversation'>
                <img className='conversationImg' src={imglink} alt=''/>
                <span className='conversationName'>{friend ? friend.singleUser.firstName + ' ' + friend.singleUser.lastName : 'No name'}</span>
            </div>   
        </>
    )
}

export default Conversations