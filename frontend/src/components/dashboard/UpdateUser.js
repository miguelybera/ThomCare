import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { UPDATE_USER_RESET } from '../../constants/userConstants'
import { getUserDetails, updateUser, clearErrors } from '../../actions/userActions'

// <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>

var dateFormat = require('dateformat')

const UpdateUser = ({ history, match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: userLoading, error, success, singleUser } = useSelector(state => state.singleUser)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        // const formData = new FormData()

        // formData.set('firstName', firstName)
        // formData.set('lastName', lastName)
        // formData.set('role', role)
        // formData.set('email', email)
        // formData.set('course', course)
        // formData.set('track', track)
        // formData.set('announcementType', announcementType)
        // formData.set('archiveDate', archiveDate)
        // formData.set('setExpiry', setExpiry)

        let formData = ''
        if (role === 'Student') {
            formData = {
                firstName,
                lastName,
                studentNumber,
                course,
                role
            }
        } else {
            formData = {
                firstName,
                lastName,
                role,
                course: 'N/A',
                studentNumber: '0000000000'
            }
        }

        dispatch(updateUser(singleUser._id, formData))
    }

    const userId = match.params.id

    let userFirstName = ''
    let userLastName = ''
    let userEmail = ''
    let userRole = ''
    let userStudentNumber = ''
    let userCourse = ''
    let userTrack = ''

    if (singleUser && singleUser.firstName) { userFirstName = singleUser.firstName }
    if (singleUser && singleUser.lastName) { userLastName = singleUser.lastName }
    if (singleUser && singleUser.email) { userEmail = singleUser.email }
    if (singleUser && singleUser.role) { userRole = singleUser.role }
    if (singleUser && singleUser.studentNumber) { userStudentNumber = singleUser.studentNumber }
    if (singleUser && singleUser.course) { userCourse = singleUser.course }
    if (singleUser && singleUser.track) { userTrack = singleUser.track }
    // if (announcement && announcement.announcementType) { announcementAnnouncementType = announcement.announcementType }
    // if (announcement && announcement.archiveDate) { announcementArchiveDate = announcement.archiveDate }

    useEffect(() => {
        if (singleUser && singleUser._id !== userId) {
            dispatch(getUserDetails(userId))
        }
        else {
            setFirstName(userFirstName)
            setLastName(userLastName)
            setEmail(userEmail)
            setRole(userRole)
            setStudentNumber(userStudentNumber)
            setCourse(userCourse)
            setTrack(userTrack)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_USER_RESET
            })
        }

        if (isUpdated) {
            history.push('/admin/users')
            dispatch(getUserDetails(userId))
            alert.success('User updated successfully.')

            dispatch({
                type: UPDATE_USER_RESET
            })
        }

    }, [dispatch, error, alert, isUpdated, updateError, singleUser, userId, history])


    return (
        <Fragment>
            <MetaData title={'Update User'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Control Panel</h1>

                    <Container className="space_inside"></Container>

                    <Container fluid>
                        <h3>Update User</h3>
                        {userLoading ? (
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
                                                        <Form.Control type="text" placeholder="First Name" value={firstName} name="firstName" onChange={e => setFirstName(e.target.value)} />
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Form.Control type="text" placeholder="Last Name" value={lastName} name="lastName" onChange={e => setLastName(e.target.value)} />
                                                    </Col>
                                                </Form.Group>

                                                {role === 'Student' ? (
                                                    <>
                                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalStudentNumber">
                                                            <Form.Label column sm={3}>
                                                                Student number
                                                            </Form.Label>
                                                            <Col sm={9}>
                                                                <Form.Control type="text" placeholder="Student number" value={studentNumber} name="studentNumber" onChange={e => setStudentNumber(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCourse">
                                                            <Form.Label column sm={2}>
                                                                Course
                                                        </Form.Label>
                                                            <Col sm={10}>
                                                                <Form.Control type="text" placeholder="Course" value={course} name="course" onChange={e => setCourse(e.target.value)} />
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
                                                            <Form.Label column sm={3}>
                                                                Role
                                                            </Form.Label>
                                                            <Col sm={9}>
                                                                <Form.Control type="text" placeholder="Role" value={role} disabled />
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
                                                                <Form.Select aria-label="Default select example" value={role} name="role" onChange={e => setRole(e.target.value)} required>
                                                                    <option value=''>-</option>
                                                                    <option value="CICS Staff">CICS Staff</option>
                                                                    <option value="IT Dept Chair">IT Dept Chair</option>
                                                                    <option value="IS Dept Chair">IS Dept Chair</option>
                                                                    <option value="CS Dept Chair">CS Dept Chair</option>
                                                                </Form.Select>
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
                                                <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} disabled={loading ? true : false}>Update</Button>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                </Row>
                            </Container>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>

    )
}

export default UpdateUser
