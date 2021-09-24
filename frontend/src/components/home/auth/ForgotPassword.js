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

    useEffect(() => {
        if (error) {
            alert.error(error)
            setEmail('')
            dispatch(clearErrors())
            dispatch({
                type: FORGOT_PASSWORD_RESET
            })
        }

        if (message) {
            alert.success(message)
            history.push('/login')
            dispatch({
                type: FORGOT_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, history, alert, error, message])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email))
    }

    return (
        <>
            <MetaData title={'Forgot your password?'} />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Forgot Password?</Card.Title>
                            <Card.Text style={{ fontSize: '12px' }}>Enter your registered UST G Suite email address. A reset password link will be sent to your inbox.</Card.Text>
                            <Form onSubmit={submitHandler} encType='application/json' method='post'>
                                <FloatingLabel label="Email address" className="mb-3">
                                    <Form.Control
                                        type='email'
                                        placeholder="juan.delacruz.iics@ust.edu.ph"
                                        pattern="[a-z]{1,}\.[a-z]{1,}\.(iics|cics)@ust\.edu\.ph"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                                <Button
                                    type='submit'
                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                    disabled={loading ? true : false}>
                                    {loading ? (
                                        <span>
                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                        </span>
                                    ) : (
                                        <span>Send Email</span>
                                    )}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default ForgotPassword
