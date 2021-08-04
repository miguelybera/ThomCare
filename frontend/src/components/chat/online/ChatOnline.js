import React from 'react'
import './chatonline.css'

const ChatOnline = () => {
    return (
        <>
            <div className='chatOnline'>
                <div className='chatOnlineFriend'>
                    <div className='chatOnlineImgContainer'>
                        <img className='chatOnlineImg' src='https://res.cloudinary.com/exstrial/image/upload/v1627805763/ShopIT/sanake_ibs7sb.jpg' alt=''/>
                        <div className='chatOnlineBadge'>

                        </div>
                    </div>
                    <span className='chatOnlineName'>Minatozaki Sana</span>
                </div>
            </div>   
        </>
    )
}

export default ChatOnline
