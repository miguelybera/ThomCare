import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { saveStudentInfo } from '../../actions/userActions'
import MetaData from '../layout/MetaData'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

const Register = ({ history }) => {
    const dispatch = useDispatch()

    const { studentInfo } = useSelector(state => state.student)

    const [user, setUser] = useState({
        firstName: studentInfo ? studentInfo.firstName : '',
        middleName: studentInfo ? studentInfo.middleName : '',
        lastName: studentInfo ? studentInfo.lastName : '',
        studentNumber: studentInfo ? studentInfo.studentNumber : '',
        email: studentInfo ? studentInfo.email : '',
        course: studentInfo ? studentInfo.course : '',
        password: studentInfo ? studentInfo.password : '',
        confirmPassword: studentInfo ? studentInfo.confirmPassword : ''
    })

    const { firstName, middleName, lastName, email, studentNumber, course, password, confirmPassword } = user

    const submitHandler = e => {
        dispatch(saveStudentInfo({ firstName, middleName, lastName, studentNumber, email, course, password, confirmPassword }))
        history.push('/confirm/register')
    }

    const upperCase = (text) => text.toUpperCase()

    const onChange = e => {
        e.preventDefault()

        setUser({
            ...user,
            [e.target.name]: e.target.name === 'firstName' || e.target.name === 'lastName' ? upperCase(e.target.value) : e.target.value
        })
    }

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])
    return (
        <>
            <MetaData title={'Register'} />
            <Container fluid>
                <div class="progress">
                    <div
                        class="progress-bar"
                        role="progressbar"
                        style={{ width: '50%' }}
                        aria-valuenow='50'
                        aria-valuemin="0"
                        aria-valuemax="100"
                    >
                        50%
                    </div>
                </div>
                <Card>
                    <Card.Body>
                        <Card.Title style={{ margin: '50px 0 20px 0' }}>Register an account</Card.Title>
                        <Form method='post' onSubmit={submitHandler} encType='application/json'>
                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="First Name"
                                        value={firstName}
                                        onChange={onChange}
                                        pattern="([A-zÀ-ž\s]){2,}"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Middle Name"
                                        value={middleName}
                                        onChange={onChange}
                                        pattern="([A-zÀ-ž\s]){2,}"
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Last Name"
                                        value={lastName}
                                        onChange={onChange}
                                        pattern="([A-zÀ-ž\s]){2,}"
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="20xxxxxxxx" name="studentNumber" pattern="20[0-9]{8}" value={studentNumber} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Select aria-label="Default select example" name="course" value={course} onChange={onChange} required>
                                    <option>-</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Information Technology">Information Technology</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type='email'
                                    placeholder="juan.delacruz.iics@ust.edu.ph"
                                    pattern="[a-z]{1,}\.[a-z]{1,}\.(iics|cics)@ust\.edu\.ph"
                                    name="email"
                                    value={email}
                                    onChange={onChange}
                                    required
                                />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={onChange}
                                        minlength='6'
                                        required
                                    />
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Confirm Password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={onChange}
                                        minlength='6'
                                        required
                                    />
                                </Form.Group>
                            </Row>

                            <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Next</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Register
