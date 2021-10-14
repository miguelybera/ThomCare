import React, { Fragment, useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Step2 from './Step2'

const Register = () => {
    const dispatch = useDispatch()

    const [currentStep, setCurrentStep] = useState(1)

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

    const { firstName, middleName, lastName, studentNumber, course } = user

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

    const addStep = () => {
        setCurrentStep(currentStep + 1)
    }

    return (
        <Fragment>
            <MetaData title={'Register'} />
            {currentStep === 1 ? (
                <Fragment>
                    <Container fluid style={{ padding: "50px 20px" }}>
                        <center><h3>Register an account</h3></center>
                        <Card style={{ maxWidth: '600px', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body style={{ margin: '20px' }}>
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style={{ width: '0%' }}
                                        aria-valuenow='0'
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        0%
                                    </div>
                                </div>
                                <Form method="post" onSubmit={addStep}>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} xs={12} lg={5} style={{ marginTop: '5px' }}>
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
                                        <Form.Group as={Col} xs={12} lg={3} style={{ marginTop: '5px' }}>
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
                                        <Form.Group as={Col} xs={12} lg={4} style={{ marginTop: '5px' }}>
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
                                        <Form.Group className="mb-3" as={Col} xs={12} lg={6}>
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
                                        <Form.Group className="mb-3" as={Col} xs={12} lg={6}>
                                            <Form.Label>Course/Program</Form.Label>
                                            <Form.Select
                                                name="course"
                                                value={course}
                                                onChange={onChange}
                                                required
                                            >
                                                <option value=''>-</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Information Systems">Information Systems</option>
                                                <option value="Information Technology">Information Technology</option>
                                            </Form.Select>
                                        </Form.Group>
                                    </Row>
                                    <center>
                                        <Button
                                            variant='danger'
                                            style={{ marginRight: '5px', marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                            disabled={true}
                                        >
                                            Back
                                    </Button>
                                        <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>
                                            Next
                                    </Button>
                                    </center>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            ) : (<Step2 studentInfo={user} currentStep={currentStep} setCurrentStep={setCurrentStep} />)}
        </Fragment>
    )
}

export default Register
