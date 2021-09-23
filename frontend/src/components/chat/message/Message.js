import React from 'react'
import './message.css'
import { format } from 'timeago.js'


const Message = ({ message, own }) => {

    const imglink = 'https://res.cloudinary.com/dwcxehcui/image/upload/v1632063359/logo/default_w0escb.png'

    return (
        <>
            <div className={own ? 'message own' : 'message'}>
                <div className='messageTop'>
                    <img className='messageImg' src={imglink} alt='' />
                    <p className='messageText'>{message.text}</p>
                </div>
                <div className='messageBottom'>{format(message.createdAt)}</div>
            </div>
        </>
    )
}

export default Message