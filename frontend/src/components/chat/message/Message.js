import React from 'react'
import './message.css'
import {format} from 'timeago.js'


const Message = ({message, own}) => {

    return (
        <>
            <div className={own ? 'message own' : 'message'}>
                <div className='messageTop'>
                    <img className='messageImg' src='https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg' alt=''/>
                    <p className='messageText'>{message.text}</p>
                </div>
                <div className='messageBottom'>{format(message.createdAt)}</div>
            </div>
        </>
    )
}

export default Message