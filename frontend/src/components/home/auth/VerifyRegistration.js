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
                            <h3>Welcome to ThomCare</h3>
                            <p className="text-muted" style={{ fontSize: '14px', textAlign: 'center', marginBottom: '20px', maxWidth: '30rem' }}>
                                {success ? message : 'Click on the button below to verify your account.'}
                            </p>
                            <Button type='submit' variant="outline-danger" style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={verifyHandler}>
                                Verify
                            </Button>
                        </center>
                    </Fragment>) : (<Fragment>
                        <center>
                            {success ? <Fragment>
                                <h3>
                                    <span style={{ color: 'green' }}>
                                        <i class="fa fa-check" style={{ textAlign: 'center' }}></i>
                                    </span> Registration successful</h3>
                            </Fragment>
                                : <Fragment>
                                    <h3>
                                        <span style={{ color: 'red' }}>
                                            <i class="fa fa-exclamation-circle" style={{ textAlign: 'center' }}></i>
                                        </span> Registration Error</h3>
                                </Fragment>}
                            <h3>{success ? '' : ''}</h3>
                            <p className="text-muted" style={{ fontSize: '14px', textAlign: 'center', marginBottom: '20px', maxWidth: '30rem' }}>
                                {success ? message : error}
                            </p>
                            <Button type='submit' variant='outline-primary' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={success ? goToLogin : goToHome}>
                                {success ? 'Log in' : 'Back to Home'}
                            </Button>
                        </center>
                    </Fragment>)
                )}
            </Container>
        </Fragment>
    )
}

export default VerifyRegistration