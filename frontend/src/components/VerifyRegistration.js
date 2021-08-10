import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import axios from 'axios'
import MetaData from './layout/MetaData'

const VerifyRegistration = ({history, match}) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    
    const token = match.params.token
    console.log(token)

    useEffect(() => {
        const verify = async () => {
            try {
                const config = {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
    
                const { data } = await axios.post(`/api/v1/verify/account/${token}`, {}, config)
    
            } catch (error) {
                console.log(error)
            }
        }

        verify()

    }, [dispatch])


    const goToLogin = () => {
        history.push('/login')
    }

    return (
        <>
            <MetaData title={'Registration successful'}/>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Registration successful</Card.Title>
                            
                            <Button
                                type='submit' 
                                style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}
                                onClick={goToLogin}
                            >Log in</Button>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default VerifyRegistration
