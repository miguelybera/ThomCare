import React from 'react'
import './conversation.css'

const Conversations = ({ receiverName }) => {
    const imglink = 'https://res.cloudinary.com/dwcxehcui/image/upload/v1632063359/logo/default_w0escb.png'

    return (
        <>
            <div className='conversation'>
                <img className='conversationImg' src={imglink} alt='' />
                <span className='conversationName'>{receiverName}</span>
            </div>
        </>
    )
}

export default Conversations