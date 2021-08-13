import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { saveStudentInfo, clearErrors } from '../../actions/userActions'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import MetaData from '../layout/MetaData'

const Register = ({ history }) => {

    const dispatch = useDispatch()

    const { studentInfo } = useSelector(state => state.student)

    const [user, setUser] = useState({
        firstName: studentInfo ? studentInfo.firstName : '',
        lastName: studentInfo ? studentInfo.lastName : '',
        studentNumber: studentInfo ? studentInfo.studentNumber : '',
        email: studentInfo ? studentInfo.email : '',
        course: studentInfo ? studentInfo.course : '',
        password: studentInfo ? studentInfo.password : '',
        confirmPassword: studentInfo ? studentInfo.confirmPassword : ''
    })

    const { firstName, lastName, email, studentNumber, course, password, confirmPassword } = user

    const submitHandler = e => {
        e.preventDefault()

        dispatch(saveStudentInfo({ firstName, lastName, studentNumber, email, course, password, confirmPassword }))
        history.push('/confirmregister')
    }

    const upperCase = (text) => text.toUpperCase()

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.name == 'firstName' || e.target.name == 'lastName' ? upperCase(e.target.value) : e.target.value
        })
    }

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
                                <Form.Group as={Col} controlId="formGridFirstName">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Student first name" name="firstName" value={firstName} onChange={onChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Student last name" name="lastName" value={lastName} onChange={onChange} required />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridStudentNumber">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="20xxxxxxxx" name="studentNumber" pattern="20[0-9]{8}" value={studentNumber} onChange={onChange} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridCourse">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Select aria-label="Default select example" name="course" value={course} onChange={onChange} required>
                                    <option>-</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Information Technology">Information Technology</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' placeholder="juan.delacruz.iics@ust.edu.ph" pattern="[a-z]{1,}\.[a-z]{1,}\.(iics|cics)@ust\.edu\.ph" name="email" value={email} onChange={onChange} required />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} required />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} onChange={onChange} required />
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
