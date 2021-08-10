import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import MetaData from './layout/MetaData'
import { VERIFY_STUDENT_REQUEST, VERIFY_STUDENT_SUCCESS, VERIFY_STUDENT_FAIL } from './../constants/userConstants'


const VerifyRegistration = ({history, match}) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    
    const token = match.params.token
    
    const { error, loading, message } = useSelector(state => state.register)

    const [messageText, setMessageText] = useState('')
    useEffect(() => {
        const verify = async () => {
            try {
                dispatch({
                    type: VERIFY_STUDENT_REQUEST
                })

                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
    
                const { data } = await axios.post(`/api/v1/verify/account/${token}`, {}, config)
    
                dispatch({
                    type: VERIFY_STUDENT_SUCCESS,
                    payload: data.message
                })

            } catch (error) {
                dispatch({
                    type: VERIFY_STUDENT_FAIL,
                    payload: error.response.data.errMessage
                })
            }
        }

        verify()

    }, [dispatch])

    useEffect(() => {
        if(message) {
            setMessageText(message)
        }

        if(error) {
            setMessageText(error)
        }
    }, [message, error])

    const goToLogin = () => {
        history.push('/login')
    }

    return (
        <>
            <MetaData title={'Registration successful'}/>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        {loading ? (<>
                            <h1>loading</h1>
                        </>) : (
                            <>
                                {message ? (
                                    <>
                                        <Card.Body>
                                            <Card.Title style={{margin: '50px 0 20px 0'}}>Registration successful</Card.Title>
                                            <Card.Text>{messageText}</Card.Text>
                                            <Button
                                                type='submit' 
                                                style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}
                                                onClick={goToLogin}
                                            >Log in</Button>
                                        </Card.Body>
                                    </>
                                ) : (
                                    <>
                                        <Card.Body>
                                            <Card.Title style={{margin: '50px 0 20px 0'}}>Registration error</Card.Title>
                                            <Card.Text>{messageText}</Card.Text>
                                            <Button
                                                type='submit' 
                                                style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}
                                                onClick={goToLogin}
                                            >Log in</Button>
                                        </Card.Body>
                                    </>
                                )}
                            </>
                        )}
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default VerifyRegistration
