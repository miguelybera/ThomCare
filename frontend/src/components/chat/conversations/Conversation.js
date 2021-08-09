import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { getSingleUser } from '../../../actions/userActions'
import './conversation.css'
import axios from 'axios'

//same issue sa Home before
const Conversations = ({conversation, currentUser}) => {
    const dispatch = useDispatch()
    
    const [friend, setFriend] = useState(null) 
    const imglink = 'https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg'

    useEffect(() => {
        const receiver = conversation.members.find(m => m !== currentUser._id)

        const getUser = async () => {
            try {
                const { data } = await axios.get(`/api/v1/admin/user/${receiver}`)
                setFriend(data)
            } catch (err) {
                console.log(err)
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