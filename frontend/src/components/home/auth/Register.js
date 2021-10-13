import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import ConfirmRegister from './ConfirmRegister'

const Register = () => {
    const dispatch = useDispatch()

    const [submitted, setSubmitted] = useState(false)
    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const [user, setUser] = useState({
        firstName: '',
        middleName: '',
        lastName: '',
        studentNumber: '',
        email: '',
        course: '',
        password: '',
        confirmPassword: ''
    })

    const { firstName, middleName, lastName, email, studentNumber, course, password, confirmPassword } = user

    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const onChange = e => {
        e.preventDefault()

        setUser({
            ...user,
            [e.target.name]: e.target.name === 'firstName' || e.target.name === 'middleName' || e.target.name === 'lastName' ? upperCase(e.target.value) : e.target.value
        })
    }

    const submitHandler = e => {
        setSubmitted(!submitted)
    }

    return (
        <>
            <MetaData title={'Register'} />
            {!submitted ? (
                <Fragment>
                    <Container fluid style={{ padding: "50px 20px" }}>
                        <center><h3>Register an account</h3></center>
                        <Card style={{ maxWidth: '850px', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body style={{ margin: '20px' }}>
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
                                <Form method='post' onSubmit={submitHandler} encType='application/json'>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md={5} style={{ marginTop: '5px' }}>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="First Name"
                                                name="firstName"
                                                value={firstName}
                                                onChange={onChange}
                                                pattern="([A-zÀ-ž\s]){2,}"
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md={3} style={{ marginTop: '5px' }}>
                                            <Form.Label>Middle Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="(Optional)"
                                                name="middleName"
                                                value={middleName}
                                                onChange={onChange}
                                                pattern="([A-zÀ-ž\s]){2,}"
                                            />
                                        </Form.Group>
                                        <Form.Group as={Col} md={4} style={{ marginTop: '5px' }}>
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                placeholder="Last Name"
                                                name="lastName"
                                                value={lastName}
                                                onChange={onChange}
                                                pattern="([A-zÀ-ž\s]){2,}"
                                                required
                                            />
                                        </Form.Group>
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group className="mb-3" as={Col} md={6}>
                                            <Form.Label>Student Number</Form.Label>
                                            <Form.Control
                                                placeholder="20xxxxxxxx"
                                                name="studentNumber"
                                                pattern="20[0-9]{8}"
                                                value={studentNumber}
                                                onChange={onChange}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3" as={Col} md={6}>
                                            <Form.Label>Course/Program</Form.Label>
                                            <Form.Select
                                                aria-label="Default select example"
                                                name="course"
                                                value={course}
                                                onChange={onChange}
                                                required
                                            >
                                                <option>-</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Information Systems">Information Systems</option>
                                                <option value="Information Technology">Information Technology</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Group className="mb-3" as={Col}>
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
                                    </Row>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} md={6} style={{ marginTop: '5px' }}>
                                            <Form.Label>Password</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type={showPassword ? "password" : "text"}
                                                    placeholder="Password"
                                                    name="password"
                                                    value={password}
                                                    onChange={onChange}
                                                    minlength='6'
                                                    required
                                                />
                                                <Button variant="secondary" onClick={showPasswordToggle}>
                                                    <span className="fa-sm">
                                                        <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                    </span>
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                        <Form.Group as={Col} md={6} style={{ marginTop: '5px' }}>
                                            <Form.Label>Confirm Password</Form.Label>
                                            <InputGroup className="mb-3">
                                                <Form.Control
                                                    type={showConfirm ? "password" : "text"}
                                                    placeholder="Confirm Password"
                                                    name="confirmPassword"
                                                    value={confirmPassword}
                                                    onChange={onChange}
                                                    minlength='6'
                                                    required
                                                />
                                                <Button variant="secondary" onClick={showConfirmToggle}>
                                                    <span className="fa-sm">
                                                        <i className={showConfirm ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                    </span>
                                                </Button>
                                            </InputGroup>
                                        </Form.Group>
                                    </Row>
                                    <center>
                                        <Button
                                            type='submit'
                                            style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        >
                                            Next
                                        </Button>
                                    </center>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            ) : (
                <ConfirmRegister studentInfo={user} submitted={submitted} setSubmitted={setSubmitted} />
            )}
        </>
    )
}

export default Register
