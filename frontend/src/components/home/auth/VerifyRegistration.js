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
            <Container fluid style={{ padding: "50px 20px" }}>

                {loading ? <Loader /> : (
                    !verified ? (<Fragment>
                        <center>
                            <h3>Verify registration</h3>
                            <p className="text-muted" style={{ fontSize: '14px', textAlign: 'center', marginBottom: '20px', maxWidth: '30rem' }}>
                                {success ? message : 'Click on the button below to verify your account.'}
                            </p>
                        </center>
                        <Card style={{ maxWidth: '30rem', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body>
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
                                <center>
                                    <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={verifyHandler}>
                                        Verify my account
                                    </Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Fragment>) : (<Fragment>
                        <center>
                            <h3>{success ? 'Registration successful' : 'Registration Error'}</h3>
                            <p className="text-muted" style={{ fontSize: '14px', textAlign: 'center', marginBottom: '20px', maxWidth: '30rem' }}>
                                {success ? message : error}
                            </p>
                        </center>
                        <Card style={{ maxWidth: '30rem', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body>
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
                                <center>
                                    <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={success ? goToLogin : goToHome}>
                                        {success ? 'Log in' : 'Back to Home'}
                                    </Button>
                                </center>
                            </Card.Body>
                        </Card>
                    </Fragment>)
                )}
            </Container>
        </Fragment>
    )
}

export default VerifyRegistration