import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button, Row, Col, Form } from 'react-bootstrap'
import { deleteConversation, clearErrors } from '../../../../actions/chatActions'
import { DELETE_CONVERSATION_RESET } from '../../../../constants/chatConstants'
import axios from 'axios'
import './conversation.css'

const Conversations = ({ history, conversation, currentUser }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { isDeleted, error } = useSelector(state => state.conversation)

    const [user, setUser] = useState(null)
    const [userId, setUserId] = useState(null)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const currentUserId = currentUser._id
    const imglink = 'https://res.cloudinary.com/dwcxehcui/image/upload/v1632063359/logo/default_w0escb.png'

    useEffect(() => {
        const id = conversation.members.find((m) => m !== currentUserId);

        const getUser = async () => {
            try {
                const { data } = await axios(`/api/v1/chat/user/${id}`);
                setUser(data.singleUser)
            } catch (err) {
                console.log(err)
            }
        }

        getUser();
    }, [currentUser, conversation, alert])

    const name = user ? user.firstName + ' ' + user.lastName : 'Deleted Account'

    useEffect(() => {
        if (isDeleted) {
            window.location.reload()

            dispatch({
                type: DELETE_CONVERSATION_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, isDeleted, error])

    const deleteHandler = (id) => {
        dispatch(deleteConversation(id))
        handleClose()
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this conversation?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteHandler(conversation._id)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>

            <div className='conversation'>
                <img className='conversationImg' src={imglink} alt='' />
                <span className='conversationName'>{name}</span>
                {currentUser.role !== 'Student' ?
                    <Button variant="outline-danger" className="mr-5" style={{ marginLeft: 'auto' }} onClick={() => {
                        handleShow()
                    }}>
                        <span className='fa-xs'>
                            <i class="fa fa-trash" aria-hidden="true" />
                        </span>
                    </Button> :
                    <Fragment></Fragment>
                }
            </div>
        </>
    )
}

export default Conversations