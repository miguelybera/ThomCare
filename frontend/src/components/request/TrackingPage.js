import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { trackRequest, clearErrors } from './../../actions/requestActions'
import { REQUEST_DETAILS_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import { Card, Container, Row, FloatingLabel, Form, Button } from 'react-bootstrap'


const TrackingPage = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.request)

    const [userInfo, setUserInfo] = useState({
        trackingNumber: '',
        lastName: ''
    })

    const { trackingNumber, lastName } = userInfo

    const submitHandler = e => {
        dispatch(trackRequest(userInfo))
    }

    useEffect(() => {
        if (success) {
            history.push('/track/request')
            dispatch({
                type: REQUEST_DETAILS_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [loading, dispatch, alert, success, error, history])


    const onChange = e => {
        e.preventDefault()

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Fragment>
            <MetaData title={'Track my request'} />
            <Container fluid>
                    <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                        <Card style={{ width: '30rem', align: 'center' }}>
                            <Card.Body>
                                <Card.Title style={{ margin: '50px 0 20px 0' }}>Track my Request</Card.Title>

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

                                <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={submitHandler}>Track</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
        </Fragment>
    )
}

export default TrackingPage