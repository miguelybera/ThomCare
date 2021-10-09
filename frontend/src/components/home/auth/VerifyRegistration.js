import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Row } from 'react-bootstrap'
import { verify } from './../../../actions/userActions'
import { VERIFY_STUDENT_RESET } from './../../../constants/userConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'

const VerifyRegistration = ({ history, match }) => {
    const dispatch = useDispatch()

    const { error, loading, message, success } = useSelector(state => state.register)
    const [verified, setVerified] = useState(false)

    const goToLogin = () => history.push('/login')
    const goToHome = () => history.push('/')

    const token = match.params.token

    const verifyHandler = () => {
        dispatch(verify(token))
        setVerified(!verified)
    }
    useEffect(() => {
        if (success) {
            dispatch({
                type: VERIFY_STUDENT_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, success])

    return (
        <Fragment>
            <MetaData title={success ? 'Registration successful' : 'Verify Student Registration'} />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        {loading ? ((<Loader />)) : (
                            !verified ? (
                                <Fragment>
                                    <div class="progress">
                                        <div
                                            class="progress-bar"
                                            role="progressbar"
                                            style={{ width: '90%' }}
                                            aria-valuenow='90'
                                            aria-valuemin="0"
                                            aria-valuemax='100'
                                        >
                                            90%
                                        </div>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{ margin: '50px 0 20px 0' }}>Verify your account</Card.Title>
                                        <Card.Text>{success ? message : 'Click on the button below to verify your account.'}</Card.Text>
                                        <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={verifyHandler}>
                                            Verify my account
                                        </Button>
                                    </Card.Body>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <div class="progress">
                                        <div
                                            class="progress-bar"
                                            role="progressbar"
                                            style={success ? { width: '100%' } : { width: '90%' }}
                                            aria-valuenow={success ? '100' : '90'}
                                            aria-valuemin="0"
                                            aria-valuemax='100'
                                        >
                                            {success ? '100%' : '90%'}
                                        </div>
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{ margin: '50px 0 20px 0' }}>{success ? 'Registration successful' : 'Registration Error'}</Card.Title>
                                        <Card.Text>{success ? message : error}</Card.Text>
                                        <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={success ? goToLogin : goToHome}>
                                            {success ? 'Log in' : 'Back to Home'}
                                        </Button>
                                    </Card.Body>
                                </Fragment>
                            )
                        )}
                    </Card>
                </Row>
            </Container>
        </Fragment>
    )
}

export default VerifyRegistration