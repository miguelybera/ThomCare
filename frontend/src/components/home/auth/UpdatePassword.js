import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, InputGroup, Modal } from 'react-bootstrap'
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
    const [show, setShow] = useState(false)

    const showOldToggle = () => setShowOld(!showOld)
    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

        const goBack = () => {
        window.history.back()
        handleClose()
    }

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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to discard any changes?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Any changes done will be gone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={goBack}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Container fluid style={{ marginTop: '50px' }}>
                <Row className='justify-content-md-center'>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '10px solid #9c0b0b', margin: '50px 0' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Update Password</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Old Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showOld ? "password" : "text"}
                                            placeholder="••••••"
                                            name="oldPassword"
                                            value={oldPassword}
                                            onChange={e => setOldPassword(e.target.value)}
                                            required
                                        />
                                        <Button variant="secondary" onClick={showOldToggle}>
                                            <span className="fa-sm">
                                                <i className={showOld ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>New Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showPassword ? "password" : "text"}
                                            placeholder="••••••"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                        <Button variant="secondary" onClick={showPasswordToggle}>
                                            <span className="fa-sm">
                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Confirm New Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showConfirm ? "password" : "text"}
                                            placeholder="••••••"
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={e => setConfirmPassword(e.target.value)}
                                            minlength="6"
                                            required
                                        />
                                        <Button variant="secondary" onClick={showConfirmToggle}>
                                            <span className="fa-sm">
                                                <i className={showConfirm ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <center>
                                    <Button
                                        type='button'
                                        style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                        variant='outline-danger'
                                        onClick={handleShow}>
                                        Discard
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
                                            <span>Update</span>
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
