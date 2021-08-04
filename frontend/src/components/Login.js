import React from 'react'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'

const Login = () => {
    return (
        <>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Login</Card.Title>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingPassword" label="Password">
                                <Form.Control type="password" placeholder="Password" />
                            </FloatingLabel>
                            <Button type='submit' style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}>Submit</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default Login
