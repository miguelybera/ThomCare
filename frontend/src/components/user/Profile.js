import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile, clearErrors } from '../../actions/userActions'
import { UPDATE_PROFILE_RESET } from '../../constants/userConstants'
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import Sidebar from '../layout/Sidebar'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

const Profile = () => {

    const dispatch = useDispatch()

    const { user, error, loading } = useSelector(state => state.auth)
    const { loading: editLoading, isUpdated, error: editError } = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')
    const [role, setRole] = useState('')

    const [editProfile, setEditProfile] = useState(false)

    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        setFirstName(upperCase(user.firstName))
        setLastName(upperCase(user.lastName))
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

        dispatch(updateProfile({ firstName, lastName }))
    }

    return (
        <>
            <MetaData title={'My Profile'} />
            {/** add here if user.role = 'something' display , else display student profile*/}
            <Sidebar />
            {loading ? (
                <Loader />
            ) : (
                <Container fluid>
                    <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                        <Card style={{ width: '40rem', align: 'center' }}>
                            <Card.Body>
                                <Card.Title style={{ margin: '50px 0 20px 0' }}>My Profile</Card.Title>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                        <Form.Label column sm={2}>
                                            Name
                                    </Form.Label>
                                        <Col sm={6}>
                                            <Form.Control type="text" placeholder="First Name" value={firstName} disabled={editProfile ? false : true} onChange={e => setFirstName(upperCase(e.target.value))} />
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Control type="text" placeholder="Last Name" value={lastName} disabled={editProfile ? false : true} onChange={e => setLastName(upperCase(e.target.value))} />
                                        </Col>
                                    </Form.Group>

                                    {role === 'Student' ? (
                                        <>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalStudentNumber">
                                                <Form.Label column sm={3}>
                                                    Student number
                                            </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Student number" value={studentNumber} disabled />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCourse">
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
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
                                                <Form.Label column sm={3}>
                                                    Role
                                            </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Role" value={role} disabled />
                                                </Col>
                                            </Form.Group>
                                        </>)}
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                        <Form.Label column sm={3}>
                                            Email address
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="email" placeholder="Email address" value={email} disabled />
                                        </Col>
                                    </Form.Group>
                                    {
                                        editProfile ? (
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
                                        ) : (
                                            <Fragment>
                                                <Button style={{ marginRight: '5px' }} onClick={() => setEditProfile(!editProfile)}>Edit Profile</Button>
                                                <Link to='/password/update' style={{ textDecoration: 'none', color: 'white' }}><Button>Change Password</Button></Link>
                                            </Fragment>
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
