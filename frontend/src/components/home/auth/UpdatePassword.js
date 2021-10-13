import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, InputGroup } from 'react-bootstrap'
import { updatePassword, clearErrors } from './../../../actions/userActions'
import { UPDATE_PASSWORD_RESET } from './../../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Sidebar from './../../layout/Sidebar'

const UpdatePassword = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, isUpdated, loading } = useSelector(state => state.user)

    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [showOld, setShowOld] = useState('false')
    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const showOldToggle = () => setShowOld(!showOld)
    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)

    useEffect(() => {
        if (isUpdated) {
            history.push('/profile')
            alert.success('Password updated successfully')
            dispatch({
                type: UPDATE_PASSWORD_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isUpdated])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(updatePassword({ oldPassword, password, confirmPassword }))
    }

    return (
        <>
            <MetaData title={'Update Password'} />
            <Sidebar />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '10px solid #9c0b0b', marginBottom: '50px' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Update Password</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <InputGroup className="mb-3">
                                    <FloatingLabel label="Old Password" style={{ width: '89%' }}>
                                        <Form.Control
                                            type={showOld ? "password" : "text"}
                                            placeholder="mypassword"
                                            name="oldPassword"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                    <Button variant="secondary" onClick={showOldToggle}>
                                        <span className="fa-sm">
                                            <i className={showOld ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                        </span>
                                    </Button>
                                </InputGroup>
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
                                            <span>Update Password</span>
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

export default UpdatePassword
