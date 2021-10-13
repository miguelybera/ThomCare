import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, InputGroup } from 'react-bootstrap'
import { resetPassword, clearErrors } from './../../../actions/userActions'
import { NEW_PASSWORD_RESET } from './../../../constants/userConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'

const NewPassword = ({ history, match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)

    useEffect(() => {
        if (success) {
            history.push('/login')
            alert.success('Password updated successfully')
            dispatch({
                type: NEW_PASSWORD_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: NEW_PASSWORD_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, success, history])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(resetPassword(match.params.token, { password, confirmPassword }))
    }

    return (
        <>
            <MetaData title={'New Password'} />
            <Container fluid>
                <Row className='justify-content-md-center'>
                    <Card style={{ maxWidth: '30rem', margin: '50px auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Update Password</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <InputGroup className="mb-3">
                                    <FloatingLabel label="New Password" style={{ width: '89%' }}>
                                        <Form.Control
                                            type={showPassword ? "password" : "text"}
                                            placeholder="mypassword"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                    </FloatingLabel>
                                    <Button variant="secondary" onClick={showPasswordToggle}>
                                        <span className="fa-sm">
                                            <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </Button>
                                </InputGroup>
                                <InputGroup className="mb-3">
                                    <FloatingLabel label="Confirm new password" style={{ width: '89%' }}>
                                        <Form.Control
                                            type={showConfirm ? "password" : "text"}
                                            placeholder="mypassword"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                    </FloatingLabel>
                                    <Button variant="secondary" onClick={showConfirmToggle}>
                                        <span className="fa-sm">
                                            <i className={showConfirm ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </Button>
                                </InputGroup>
                                <center>
                                    <Button
                                        type='submit'
                                        style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}>
                                        {loading ? (
                                            <span>
                                                <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                            </span>
                                        ) : (
                                            <span>Change Password</span>
                                        )}
                                    </Button>
                                </center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default NewPassword
