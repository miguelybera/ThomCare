import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import { forgotPassword, clearErrors } from '../../../actions/userActions'
import { FORGOT_PASSWORD_RESET } from '../../../constants/userConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'

const ForgotPassword = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    const [email, setEmail] = useState('')

    const goBack = () => {
        history.push('/login')
    }

    const goToLogin = () => {
        dispatch({
            type: FORGOT_PASSWORD_RESET
        })

        history.push('/login')
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            setEmail('')
            dispatch(clearErrors())
            dispatch({
                type: FORGOT_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, history, alert, error])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    return (
        <Fragment>
            <MetaData title={'Forgot your password?'} />
            <Container fluid style={{ paddingTop: '50px 20px', margin: '40px 0px' }}>
                {message ? (
                    <Fragment>
                        <Container fluid>
                            <Row className='justify-content-md-center'>
                                <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                                    <Card.Body>
                                        <center>
                                            <h3>
                                                <span style={{ color: 'green' }}>
                                                    <i class="fa fa-check" style={{ textAlign: 'center' }}></i>
                                                </span> Email sent</h3>
                                        </center>
                                        <Card.Text style={{ textAlign: 'center', paddingBottom: '50px' }}>A reset password link has been sent to your email. Kindly check your inbox to proceed.</Card.Text>
                                        <center>
                                            <Button variant="outline-primary" onClick={goToLogin}>
                                                <span>
                                                    <i class="fa fa-home" style={{ textAlign: 'center' }}></i>
                                                </span> Go back home
                                        </Button>
                                        </center>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </Fragment>
                ) : (
                    <Fragment>
                        <Row className='justify-content-md-center'>
                            <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                                <Card.Body>
                                    <Card.Title style={{ margin: '50px 0 20px 0' }}>Forgot Password?</Card.Title>
                                    <Card.Text style={{ fontSize: '12px' }}>Enter your registered UST GSuite email address. A reset password link will be sent to your inbox.</Card.Text>
                                    <Form onSubmit={submitHandler} encType='application/json' method='post'>
                                        <FloatingLabel label="Email address" className="mb-3">
                                            <Form.Control
                                                type='email'
                                                placeholder="juan.delacruz.iics@ust.edu.ph"
                                                pattern="[a-z.]{1,}@ust\.edu\.ph"
                                                name="email"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}
                                                required
                                            />
                                        </FloatingLabel>
                                        <center>
                                            <Button
                                                type='button'
                                                style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                disabled={loading ? true : false}
                                                variant='outline-secondary'
                                                onClick={goBack}>
                                                Back
                                            </Button>
                                            <Button
                                                type='submit'
                                                style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                disabled={loading ? true : false}>
                                                {loading ? (
                                                    <span>
                                                        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                    </span>
                                                ) : (
                                                    <span>Send Email</span>
                                                )}
                                            </Button>
                                        </center>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Fragment>
                )}
            </Container>
        </Fragment>
    )
}

export default ForgotPassword
