import React, { Fragment, useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

const StudentProfile = () => {

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')


    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setStudentNumber(user.studentNumber)
        setEmail(user.email)
        setCourse(user.course)

    }, [user])

    const [edit, setEdit] = useState(false)

    const editProfile = () => {
        setEdit(!edit)
    }

    return (
        <>
            <Container fluid>
                {/** add here if user.role = 'something' display , else display student profile*/}
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '40rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>My Profile</Card.Title>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                    <Form.Label column sm={2}>
                                        Name
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="First Name" value={firstName + ' ' + lastName} disabled/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Student number
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="text" placeholder="Student number" value={studentNumber} disabled/>
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={2}>
                                        Course
                                    </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" placeholder="Course" value={course} disabled/>
                                    </Col>
                                </Form.Group>
                                
                                <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                                    <Form.Label column sm={3}>
                                        Email address
                                    </Form.Label>
                                    <Col sm={9}>
                                        <Form.Control type="email" placeholder="Email address" value={email} disabled/>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            
        </>
    )
}

export default StudentProfile
