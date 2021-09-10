import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { trackRequest, clearErrors } from './../../actions/requestActions'
import { REQUEST_DETAILS_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import { Card, Container, Row, FloatingLabel, Form, Button } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

const TrackingPage = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const [userInfo, setUserInfo] = useState({
        trackingNumber: '',
        lastName: ''
    })

    const { trackingNumber, lastName } = userInfo

    const submitHandler = e => {
        history.push(`/track/${userInfo.trackingNumber}/${userInfo.lastName}`)
    }

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])


    const onChange = e => {
        e.preventDefault()

        setUserInfo({
            ...userInfo,
            [e.target.name]: upperCase(e.target.value)
        })
    }

    const upperCase = (text) => text.toUpperCase()

    return (
        <Fragment>
            <MetaData title={'Track my request'} />
            
            <Container fluid >
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5",width: '30rem', align: 'center',borderTop: '7px solid #9c0b0b', marginBottom: '50px'}}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight:"bold" }}>Track my Request</Card.Title>
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Tracking ID"
                                className="mb-3"
                            >
                                <Form.Control type="text" placeholder="ABC123" name="trackingNumber" value={trackingNumber} onChange={onChange} />
                            </FloatingLabel>

                            <FloatingLabel controlId="floatingInput" label="Surname">
                                <Form.Control type="text" placeholder="Surname" name="lastName" value={lastName} onChange={onChange} />
                            </FloatingLabel>
                            <center>
                                <Button
                                    onClick={submitHandler}
                                    type='submit'
                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                >
                                    Track
                                </Button>
                            </center>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default TrackingPage