import React from 'react'
import './messenger.css'
import Conversation from '../conversations/Conversation'
import Message from '../message/Message'
import ChatOnline from '../online/ChatOnline'

const Messenger = () => {

    return (
        <>
            <div className='messenger'>
                <div className='chatMenu'>
                    <div className='chatMenuWrapper'>
                        <input placeholder='Search for friends' className='chatMenuInput'/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                        <Conversation/>
                    </div>
                </div>
                <div className='chatBox'>
                    <div className='chatBoxWrapper'>
                        <div className='chatBoxTop'>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message own={true}/>
                            <Message/>
                            <Message/>
                            <Message/>
                        </div>
                        <div className='chatBoxBottom'>
                            <textarea placeholder='Write something . . .' className='chatBoxInput'></textarea>
                            <button className='chatBoxSubmitButton'>Send</button>
                        </div>
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
