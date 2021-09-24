import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap'
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

    const upperCase = (text) => text.toUpperCase()

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
            {loading ? (
                <Loader />
            ) : (

                <Container fluid>
                    <Container className="space_inside"></Container>
                    <Row className='justify-content-md-center' style={{ marginTop: '30px' }}>
                        <Card style={{ backgroundColor: "#F5F5F5", width: '40rem', align: 'center' }}>
                            <Card.Body >
                                <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>
                                    {editProfile ? 'Edit My Profile' : 'My Profile'}
                                </Card.Title>
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
                                                placeholder="Middle Name (Optional)"
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
                                    {
                                        editProfile ? (
                                            <center>
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
                                        )
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            )}

        </>

    )
}

export default Profile
