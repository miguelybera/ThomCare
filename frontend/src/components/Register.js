import React from 'react'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

const Register = () => {
    return (
        <>
            <Container fluid>
                <Card>
                    <Card.Body>
                        <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>
                        <Form>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" placeholder="Student first name" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" placeholder="Student last name" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="20xxxxxxxx" />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Select aria-label="Default select example">
                                    <option>-</option>
                                    <option value="CS">Computer Science</option>
                                    <option value="IS">Information Systems</option>
                                    <option value="IT">Information Technology</option>
                                </Form.Select>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type='email' placeholder="juan.delacruz.iics@ust.edu.ph" />
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" placeholder="Confirm password" />
                                </Form.Group>
                            </Row>

                            <Button type='submit' style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}>Register</Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </>
    )
}

export default Register
