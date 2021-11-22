import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, InputGroup, FormControl } from 'react-bootstrap'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import ConfirmRegister from './ConfirmRegister'

const Step2 = ({ studentInfo, currentStep, setCurrentStep }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')
    const [emailDomain, setEmailDomain] = useState('@ust.edu.ph')
    const [emailUserName, setEmailUsername] = useState()

    const [user, setUser] = useState({
        firstName: studentInfo.firstName,
        middleName: studentInfo.middleName,
        lastName: studentInfo.lastName,
        studentNumber: studentInfo.studentNumber,
        email: '',
        course: studentInfo.course,
        password: '',
        confirmPassword: ''
    })

    const { email, password, confirmPassword } = user

    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const onChange = e => {
        e.preventDefault()

        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    const addStep = e => {
        e.preventDefault()

        if (password !== confirmPassword) {
            alert.error('Passwords do not match')
        } else {
            setCurrentStep(currentStep + 1)
        }

        setUser({
            ...user,
            email: emailUserName + emailDomain
        })
    }

    const reduceStep = () => {
        setCurrentStep(currentStep - 1)
    }

    return (
        <Fragment>
            <MetaData title={'Register'} />
            {currentStep === 2 ? (
                <Fragment>
                    <Container fluid style={{ padding: "50px 20px" }}>
                        <center><h3>Register an account</h3></center>
                        <Card style={{ maxWidth: '600px', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body style={{ margin: '20px' }}>
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style={{ width: '25%' }}
                                        aria-valuenow='25'
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        25%
                                    </div>
                                </div>
                                <Form method="post" onSubmit={addStep}>
                                    <Row>
                                        <Form.Group className="mb-3" as={Col}>
                                            <Form.Label>What is your email address?</Form.Label>
                                            <div key={`inline-radio`} className="mb-3">
                                                <Form.Check
                                                    inline
                                                    label="ust.edu.ph"
                                                    defaultChecked={emailDomain === '@ust.edu.ph' ? true : false}
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-1`}
                                                    onChange={e => {
                                                        setEmailDomain('@ust.edu.ph')
                                                        setEmailUsername('')
                                                    }}
                                                />
                                                <Form.Check
                                                    inline
                                                    label="ust-ics.mygbiz.com"
                                                    defaultChecked={emailDomain === '@ust-ics.mygbiz.com' ? true : false}
                                                    name="group1"
                                                    type="radio"
                                                    id={`inline-radio-2`}
                                                    onChange={e => {
                                                        setEmailDomain('@ust-ics.mygbiz.com')
                                                        setEmailUsername('')
                                                    }}
                                                />
                                            </div>
                                        </Form.Group>
                                    </Row>
                                    <Row>
                                        <Form.Label>Email address</Form.Label>
                                        <InputGroup className="mb-3">
                                            <FormControl
                                                placeholder="juan.delacruz.iics"
                                                pattern={emailDomain === '@ust.edu.ph' ? '[0-9]{10}|[a-z]{1,}\.[a-z]{1,}\.(iics|cics)' : '[0-9]{10}'}
                                                name="emailUserName"
                                                value={emailUserName}
                                                onChange={e => setEmailUsername(e.target.value)}
                                                required
                                            />
                                            <InputGroup.Text id="basic-addon2">{emailDomain}</InputGroup.Text>
                                        </InputGroup>
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
                                            variant='outline-danger'
                                            onClick={reduceStep}
                                            style={{ marginRight: '5px', marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        >
                                            Back
                                    </Button>
                                        <Button type='submit' style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}>
                                            Next
                                    </Button>
                                    </center>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            ) : (<ConfirmRegister studentInfo={user} currentStep={currentStep} setCurrentStep={setCurrentStep} />)}
        </Fragment>
    )
}

export default Step2