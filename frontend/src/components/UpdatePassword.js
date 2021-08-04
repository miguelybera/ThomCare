import React, { useState } from 'react'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'

const UpdatePassword = () => {
    const [viewNew, setViewNew] = useState('false')
    const [viewConfirm, setViewConfirm] = useState('false')

    const viewNewToggle = () => {
        setViewNew(!viewNew)
    }

    const viewConfirmToggle = () => {
        setViewConfirm(!viewConfirm)
    }

    return (
        <>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Update Password</Card.Title>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="New Password"
                                className="mb-3"
                            >
                                <Form.Control type={viewNew ?  "password" : "text"} placeholder="mypassword" />
                            </FloatingLabel>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Confirm Password"
                                className="mb-3"
                            >
                                <Form.Control type={viewConfirm ? "password" : "text"} placeholder="mypassword" />
                            </FloatingLabel>
                            <Button type='submit' style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}>Submit</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default UpdatePassword
