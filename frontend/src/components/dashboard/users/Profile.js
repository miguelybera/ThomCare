import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Card, Button, Container, Row, Col, Modal } from 'react-bootstrap'
import { loadUser, updateProfile, clearErrors } from '../../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../../layout/Sidebar'

const Profile = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user, error, loading } = useSelector(state => state.auth)
    const { loading: editLoading, isUpdated, error: editError } = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')
    const [role, setRole] = useState('')

    const [editProfile, setEditProfile] = useState(false)
    const [show, setShow] = useState(false)

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const upperCase = (text) => text.toUpperCase()
    const goBack = () => {
        setEditProfile(!editProfile)
    }

    useEffect(() => {
        setFirstName(user.firstName)
        setMiddleName(user.middleName)
        setLastName(user.lastName)
        setStudentNumber(user.studentNumber)
        setEmail(user.email)
        setCourse(user.course)
        setRole(user.role)

    }, [user])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (editError) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            setEditProfile(!editProfile)
            dispatch(loadUser())

            dispatch({
                type: UPDATE_PROFILE_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error, user, isUpdated, editError])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(updateProfile({ firstName, middleName, lastName }))
    }

    return (
        <>
            <MetaData title={'My Profile'} />
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
            {loading ? <Loader /> : (
                <Container fluid style={{ padding: "50px 20px", marginTop: '50px' }}>
                    <Container fluid>
                        <center>
                            <h3>{editProfile ? 'Edit My Profile' : 'My Profile'}</h3>
                        </center>
                        <Row className='justify-content-md-center'>
                            <Card style={{ width: '40rem', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                                <Card.Body>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={2}>
                                                Name
                                        </Form.Label>
                                            <Col md={4} style={{ marginTop: '5px' }}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="First Name"
                                                    value={firstName}
                                                    disabled={editProfile ? false : true}
                                                    onChange={e => setFirstName(upperCase(e.target.value))}
                                                    pattern="([A-zÀ-ž\s]){2,}"
                                                    required
                                                />
                                            </Col>
                                            <Col md={3} style={{ marginTop: '5px' }}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="(Optional) Middle Name"
                                                    value={middleName}
                                                    disabled={editProfile ? false : true}
                                                    onChange={e => setMiddleName(upperCase(e.target.value))}
                                                    pattern="([A-zÀ-ž\s]){2,}"
                                                />
                                            </Col>
                                            <Col md={3} style={{ marginTop: '5px' }}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Last Name"
                                                    value={lastName}
                                                    disabled={editProfile ? false : true}
                                                    onChange={e => setLastName(upperCase(e.target.value))}
                                                    pattern="([A-zÀ-ž\s]){2,}"
                                                    required
                                                />
                                            </Col>
                                        </Form.Group>

                                        {role === 'Student' ? (
                                            <>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={3}>
                                                        Student number
                                                </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text" placeholder="Student number" value={studentNumber} disabled />
                                                    </Col>
                                                </Form.Group>

                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={2}>
                                                        Course
                                                </Form.Label>
                                                    <Col sm={10}>
                                                        <Form.Control type="text" placeholder="Course" value={course} disabled />
                                                    </Col>
                                                </Form.Group>
                                            </>
                                        ) : (
                                            <>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={3}>
                                                        Role
                                                </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control type="text" placeholder="Role" value={role} disabled />
                                                    </Col>
                                                </Form.Group>
                                            </>)}
                                        <Form.Group as={Row} className="mb-3">
                                            <Form.Label column sm={3}>
                                                Email address
                                        </Form.Label>
                                            <Col sm={9}>
                                                <Form.Control type="email" placeholder="Email address" value={email} disabled />
                                            </Col>
                                        </Form.Group>
                                        {editProfile ? (
                                            <center>
                                                <Button
                                                    type='button'
                                                    style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={loading ? true : false}
                                                    variant='outline-secondary'
                                                    onClick={handleShow}>
                                                    Discard
                                                </Button>
                                                <Button
                                                    type='submit'
                                                    style={{ marginTop: '10px', marginRight: '5px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={editLoading ? true : false}>
                                                    {editLoading ? (
                                                        <span>
                                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                        </span>
                                                    ) : (
                                                        <span>Save</span>
                                                    )}
                                                </Button>
                                            </center>
                                        ) : (
                                            role === 'Student' ? (
                                                <Fragment>
                                                    <center>
                                                        <Link to='/password/update' style={{ textDecoration: 'none', color: 'white' }}><Button>Change Password</Button></Link>
                                                    </center>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <center>
                                                        <Button style={{ marginRight: '20px' }} onClick={() => setEditProfile(!editProfile)}>Edit Profile</Button>
                                                        <Link to='/password/update' style={{ textDecoration: 'none', color: 'white' }}><Button>Change Password</Button></Link>
                                                    </center>
                                                </Fragment>
                                            )
                                        )}
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </Container>
            )}

        </>

    )
}

export default Profile
