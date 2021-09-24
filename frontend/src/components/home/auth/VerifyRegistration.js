import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { VERIFY_STUDENT_REQUEST, VERIFY_STUDENT_SUCCESS, VERIFY_STUDENT_FAIL, VERIFY_STUDENT_RESET } from './../../../constants/userConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import axios from 'axios'

const VerifyRegistration = ({ history, match }) => {
    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.register)
    const [messageText, setMessageText] = useState('')

    const token = match.params.token

    const goToLogin = () => history.push('/login')

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
                    payload: error.response.data.message
                })
            }
        }

        verify()

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, token])

    useEffect(() => {
        if (message) {
            setMessageText(message)
            dispatch({
                type: VERIFY_STUDENT_RESET
            })
        }

        if (error) {
            setMessageText(error)
        }
    }, [dispatch, message, error])

    return (
        <>
            <MetaData title={message ? 'Registration successful' : 'Registration error'} />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        {loading ? ((<Loader />)) : (
                            <>
                                {message ? (
                                    <>
                                        <div class="progress">
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{ width: '100%' }}
                                                aria-valuenow='100'
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                100%
                                            </div>
                                        </div>
                                        <Card.Body>
                                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Registration successful</Card.Title>
                                            <Card.Text>{messageText}</Card.Text>
                                            <Button
                                                type='submit'
                                                style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                                onClick={goToLogin}
                                            >
                                                Log in
                                            </Button>
                                        </Card.Body>
                                    </>
                                ) : (
                                    <>
                                        <div class="progress">
                                            <div
                                                class="progress-bar"
                                                role="progressbar"
                                                style={{ width: '90%' }}
                                                aria-valuenow='90'
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                            >
                                                90%
                                            </div>
                                        </div>
                                        <Card.Body>
                                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Registration error</Card.Title>
                                            <Card.Text>{messageText}</Card.Text>
                                            <Button
                                                type='submit'
                                                style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
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
