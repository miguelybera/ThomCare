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
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

// <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>

var dateFormat = require('dateformat')

const UpdateUser = ({ history, match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: userLoading, error, singleUser } = useSelector(state => state.singleUser)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.user)

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRole] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [course, setCourse] = useState('')

    const programs = ['Computer Science', 'Information Systems', 'Information Technology']
    const roles = ['CICS Staff', 'IT Dept Chair', 'IS Dept Chair', 'CS Dept Chair']

    const upperCase = (text) => text.toUpperCase()

    const submitHandler = e => {
        e.preventDefault()

        let formData = ''
        if (role === 'Student') {
            formData = {
                firstName: upperCase(firstName),
                middleName: upperCase(middleName),
                lastName: upperCase(lastName),
                studentNumber,
                course,
                role
            }
        } else {
            formData = {
                firstName,
                middleName: upperCase(middleName),
                lastName,
                role
            }
        }

        dispatch(updateUser(singleUser._id, formData))
    }

    const userId = match.params.id


    useEffect(() => {
        if (singleUser && singleUser._id !== userId) {
            dispatch(getUserDetails(userId))
        }
        else if (singleUser) {
            setFirstName(singleUser.firstName)
            setMiddleName(singleUser.middleName)
            setLastName(singleUser.lastName)
            setEmail(singleUser.email)
            setRole(singleUser.role)
            setStudentNumber(singleUser.studentNumber)
            setCourse(singleUser.course)
        } else {
            dispatch(getUserDetails(userId))
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

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, singleUser, userId, history])


    return (
        <Fragment>
            <MetaData title={'Update User'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container fluid>
                        {userLoading ? (
                            <Loader />
                        ) : (
                            <Container fluid>
                                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                                    <Card style={{ width: '40rem', align: 'center' }}>
                                        <Card.Body>
                                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Update User</Card.Title>
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={2}>
                                                        Name
                                                    </Form.Label>
                                                    <Col sm={4}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="First Name"
                                                            value={firstName}
                                                            onChange={e => setFirstName(upperCase(e.target.value))}
                                                            pattern="([A-zÀ-ž\s]){2,}"
                                                            required
                                                        />
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Middle Name"
                                                            value={middleName}
                                                            onChange={e => setMiddleName(upperCase(e.target.value))}
                                                            pattern="([A-zÀ-ž\s]){2,}"
                                                        />
                                                    </Col>
                                                    <Col sm={3}>
                                                        <Form.Control
                                                            type="text"
                                                            placeholder="Last Name"
                                                            value={lastName}
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
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Student number"
                                                                    value={studentNumber}
                                                                    name="studentNumber"
                                                                    onChange={e => setStudentNumber(e.target.value)}
                                                                />
                                                            </Col>
                                                        </Form.Group>

                                                        <Form.Group as={Row} className="mb-3">
                                                            <Form.Label column sm={2}>
                                                                Course
                                                            </Form.Label>
                                                            <Col sm={10}>
                                                                <Form.Select
                                                                    aria-label="Default select example"
                                                                    value={course}
                                                                    name="course"
                                                                    onChange={e => setCourse(e.target.value)}
                                                                    required
                                                                >
                                                                    {programs.map(program => (
                                                                        <option value={program}>{program}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>
                                                        <Form.Group as={Row} className="mb-3">
                                                            <Form.Label column sm={3}>
                                                                Role
                                                            </Form.Label>
                                                            <Col sm={9}>
                                                                <Form.Control
                                                                    type="text"
                                                                    placeholder="Role"
                                                                    value={role}
                                                                    disabled
                                                                />
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
                                                                <Form.Select
                                                                    aria-label="Default select example"
                                                                    value={role}
                                                                    name="role"
                                                                    onChange={e => setRole(e.target.value)}
                                                                    required
                                                                >
                                                                    {roles.map(role => (
                                                                        <option value={role}>{role}</option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                        </Form.Group>
                                                    </>)}
                                                <Form.Group as={Row} className="mb-3">
                                                    <Form.Label column sm={3}>
                                                        Email address
                                                    </Form.Label>
                                                    <Col sm={9}>
                                                        <Form.Control
                                                            type="email"
                                                            placeholder="Email address"
                                                            value={email}
                                                            disabled
                                                        />
                                                    </Col>
                                                </Form.Group>
                                                <Button
                                                    type='submit'
                                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={loading ? true : false}>
                                                    {loading ? (
                                                        <span>
                                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                        </span>
                                                    ) : (
                                                        <span>Update</span>
                                                    )}
                                                </Button>
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
