import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import MetaData from '../layout/MetaData'

const Login = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    return (
        <>
            <MetaData title={'Announcements'}/>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Announcements</Card.Title>
                            <h1>here</h1>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default Login
