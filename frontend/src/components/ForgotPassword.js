import React from 'react'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'

const ForgotPassword = () => {
    return (
        <>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Forgot Password?</Card.Title>
                            <Card.Text style={{ fontSize: '12px' }}>Enter your registered UST G Suite email address. A reset password link will be sent to your inbox.</Card.Text>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control type="email" placeholder="name@example.com" />
                            </FloatingLabel>
                            <Button type='submit' style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}>Submit</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default ForgotPassword
