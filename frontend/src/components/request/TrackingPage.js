import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { trackRequest, clearErrors } from './../../actions/requestActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Container, Row, FloatingLabel, Form, Button } from 'react-bootstrap'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const TrackingPage = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const [userInput, setUserInput] = useState(false)

    const { loading, success, error, request } = useSelector(state => state.request)

    const [userInfo, setUserInfo] = useState({
        lastName: '',
        lastName: ''
    })

    const { trackingNumber, lastName } = userInfo

    const submitHandler = e => {
        setUserInput(!userInput)
        dispatch(trackRequest(userInfo))
    }

    const onChange = e => {
        e.preventDefault()

        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (success) {
            alert.success('Found request.')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [loading, alert, success, error])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm dS, yyyy h:mm tt")
    }

    const setHistory = () => {
        const remarks = request.remarks
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateOfRemark',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Status',
                    field: 'updatedStatus',
                    sort: 'asc',
                    width: 300
                },
                {
                    label: 'Updated by',
                    field: 'userUpdated',
                    sort: 'asc',
                    width: 175
                },
                {
                    label: 'Remarks',
                    field: 'remarksMessage',
                    sort: 'asc',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150,
                    sort: 'disabled'
                }
            ],
            rows: []
        }
        remarks.forEach(remark => {
            data.rows.push({
                dateOfRemark: changeDateFormat(remark.dateOfRemark),
                updatedStatus: <Fragment>
                    <p style={{
                        color: remark.updatedStatus == 'Pending' ? 'blue' : (
                                remark.updatedStatus == 'Processing' ? '#ffcc00' : (
                                    remark.updatedStatus == 'Denied' ? 'red' : 'green'
                                )
                            )
                    }}>
                        {remark.updatedStatus}
                    </p>
                </Fragment>,
                userUpdated: remark.userUpdated,
                remarksMessage: remark.remarksMessage,
                actions:
                    <Fragment>
                        <div style={{ display: 'flex' }}>
                            <button className="btn btn-primary py-1 px-1 ml-2">
                                <p className='fa fa-trash'>Download</p>
                            </button>
                        </div>
                    </Fragment>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={request ? 'Track my request' : `Tracking ID: ${request.trackingNumber}`} />
            {
                !userInput ? (
                    <Fragment>
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
                    </Fragment >
                ) : (!loading ? (
                    <Fragment style={{ marginTop: '30px' }}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Tracking ID # {trackingNumber}</Card.Title>
                                <Card.Text><b>Name:</b> {request && request.requestorLastName}, {request && request.requestorFirstName}</Card.Text>
                                <Card.Text><b>Current status:</b> <font color={
                                    !request ? '' : (
                                        (request.requestStatus == 'Pending' ? 'blue' : (
                                            request.requestStatus == 'Processing' ? '#ffcc00' : (
                                                request.requestStatus == 'Denied' ? 'red' : 'green'
                                            )
                                        ))
                                    )
                                }>{request && request.requestStatus}</font></Card.Text>
                                <Card.Text><b>Student number:</b> {request && request.requestorStudentNumber}</Card.Text>
                                <Card.Text><b>Email:</b> {request && request.requestorEmail}</Card.Text>
                                <Card.Text><b>Course:</b> {request && request.requestorCourse}</Card.Text>
                            </Card.Body>
                        </Card>

                        <Card style={cardStyle}>
                            <Card.Title>Request Progress</Card.Title>
                        </Card>

                        <MDBDataTableV5
                            data={setHistory()}
                            entries={5}
                            entriesOptions={[5, 10, 15, 20]}
                            scrollX
                            sortable={true}
                            hover
                        />
                    </Fragment>
                ) : (
                    <Fragment>
                        <Loader/>
                    </Fragment>
                ))}
        </Fragment>
    )
}

export default TrackingPage