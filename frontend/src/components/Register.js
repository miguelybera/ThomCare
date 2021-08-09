import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { register, clearErrors } from './../actions/userActions'
import { REGISTER_USER_RESET } from './../constants/userConstants'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

const Register = ({history}) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, message } = useSelector(state => state.register)

    const [user, setUser] = useState({
        firstName: '',
        lastName: '',
        email: '',
        studentNumber: '',
        course: '',
        password: '',
        confirmPassword: ''
    })

    const { firstName, lastName, email, studentNumber, course, password, confirmPassword } = user

    const submitHandler = e => {
        e.preventDefault()

        dispatch(register(user))
    }

    const onChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }
    
    useEffect(() => {
        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }
        
        if(message){
            alert.success('Registration link sent')
            history.push('/')

            dispatch({
                type: REGISTER_USER_RESET
            })
        }

    }, [dispatch, alert, error, message, history])

    return (
        <>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>
                        <Form method='post' onSubmit={submitHandler} encType='application/json'>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Student first name" name="firstName" value={firstName} onChange={onChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Student last name" name="lastName" value={lastName} onChange={onChange} />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridStudentNumber">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="20xxxxxxxx" name="studentNumber" value={studentNumber} onChange={onChange} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridCourse">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Select aria-label="Default select example" name="course" value={course} onChange={onChange} >
                                    <option>-</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Information Technology">Information Technology</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' placeholder="juan.delacruz.iics@ust.edu.ph" name="email" value={email} onChange={onChange} />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control type="password" placeholder="Confirm password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
                                </Form.Group>
                            </Row>

                            <Button type='submit' style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}} disabled={loading ? true : false}>Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Register
