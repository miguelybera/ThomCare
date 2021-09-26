import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Row, Form, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { trackRequest, clearErrors } from './../../../actions/requestActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import { TRACK_REQUEST_RESET } from '../../../constants/requestConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const TrackingPageProgress = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, request } = useSelector(state => state.track)

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [remarks, setRemarks] = useState([])

    const tracker = match.params.trackingNumber
    const surname = match.params.lastName

    const changeDateFormat = date => dateFormat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/track')
            dispatch({
                type: TRACK_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, history, alert, error, request])

    useEffect(() => {
        if (request && request.trackingNumber !== tracker && request.lastName !== surname) {
            dispatch(trackRequest({ trackingNumber: tracker, lastName: surname }))
        } else if (request) {
            setRequestorInfo(request.requestorInfo)
            setRequestStatus(request.requestStatus)
            setRequestType(request.requestType)
            setNotes(request.notes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
            setRemarks(request.remarks)
        } else {
            dispatch(trackRequest({ trackingNumber: tracker, lastName: surname }))
        }

    }, [dispatch, request, tracker, surname])

    const setHistory = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateOfRemark',
                    width: 100
                },
                {
                    label: 'Status',
                    field: 'updatedStatus',
                    width: 70
                },
                {
                    label: 'Remarks',
                    field: 'remarksMessage',
                    width: 300
                },
                {
                    label: 'Files',
                    field: 'returningFiles',
                    width: 300
                }
            ],
            rows: []
        }
        remarks && remarks.forEach(remark => {
            data.rows.push({
                dateOfRemark: changeDateFormat(remark.dateOfRemark),
                updatedStatus: <Fragment>
                    <p style={{
                        color: remark.updatedStatus === 'Pending' ? 'blue' : (
                            remark.updatedStatus === 'Processing' ? '#ffcc00' : (
                                remark.updatedStatus === 'Denied' ? 'red' : 'green'
                            )
                        )
                    }}>
                        {upperCase(remark.updatedStatus)}
                    </p>
                </Fragment>,
                remarksMessage: <Fragment>
                    <p>{remark.remarksMessage}</p>
                    <p style={{ fontSize: '12px', color: 'gray', paddingTop: '10px' }}>By: {upperCase(remark.userUpdated)}</p>
                </Fragment>,
                returningFiles: <Fragment>
                    <ListGroup variant="flush">
                        {remark.returningFiles && remark.returningFiles.map(file => (
                            <ListGroupItem>
                                <a href={file.path} target="_blank" rel="noreferrer">
                                    <button className="btn btn-primary py-1 px-2 ml-2">
                                        <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                    </button>
                                </a> {file.originalname} <font size="1rem">{Number(file.size / 1000000).toFixed(2)} MB</font>
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </Fragment>

            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`Tracking ID: ${trackingNumber}`} />
            {!loading ? (
                <Fragment style={{ marginTop: '30px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>

                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold' }}>
                                {requestType} <br />
                                Tracking #: {trackingNumber} - {requestorInfo.lastName} <br />
                            </Card.Title>
                            <Card.Text>
                                <b>Current status:</b> <font color={
                                    !request ? '' : (
                                        (requestStatus === 'Pending' ? 'blue' : (
                                            requestStatus === 'Processing' ? '#ffcc00' : (
                                                requestStatus === 'Denied' ? 'red' : 'green'
                                            )
                                        ))
                                    )
                                }>
                                    {upperCase(requestStatus)}
                                </font>
                            </Card.Text>
                            <Row>
                                <Form.Group as={Col} className="mb-3" xs={12} sm={12} md={4}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.firstName} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" xs={12} sm={6} md={4}>
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="N/A" value={requestorInfo.middleName} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" xs={12} sm={6} md={4}>
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.lastName} readOnly />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" xs={12} sm={4} md={6} lg={4}>
                                    <Form.Label>Student Number</Form.Label>
                                    <Form.Control value={requestorInfo.studentNumber} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" xs={12} sm={8} md={6} lg={4}>
                                    <Form.Label>Year/Section/Course/Program</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.yearLevel + ' ' + requestorInfo.section + ' - ' + requestorInfo.course} readOnly />
                                </Form.Group>

                                <Form.Group as={Col} className="mb-3" xs={12} sm={12} md={12} lg={4}>
                                    <Form.Label>Email Address</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.email} readOnly />
                                </Form.Group>
                            </Row>

                            <Row>
                                <Form.Group as={Col} className="mb-3" xs={12} md={3}>
                                    <Form.Label>Tracking Number</Form.Label>
                                    <Form.Control type='text' value={trackingNumber} readOnly />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" xs={12} md={4}>
                                    <Form.Label>Request Type</Form.Label>
                                    <Form.Control type='text' value={requestType} readOnly />
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" xs={12} md={5}>
                                    <Form.Label>Request Notes</Form.Label>
                                    <Form.Control as="textarea" rows={2} value={notes && notes ? notes : "N/A"} readOnly />
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" xs={12} md={6}>
                                    <Form.Label>Request attachments</Form.Label>
                                    <ListGroup variant="flush">
                                        {fileRequirements && fileRequirements.map(file => (
                                            <ListGroupItem>
                                                {file.originalname} <font size="1rem">{Number(file.size / 1000000).toFixed(2)} MB</font> <a href={file.path} target="_blank" rel="noreferrer">
                                                    <button className="btn btn-primary py-1 px-2 ml-2">
                                                        <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                                    </button>
                                                </a>
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
                                </Form.Group>
                            </Row>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold' }}>Request History</Card.Title>
                            <MDBDataTableV5
                                data={setHistory()}
                                searchTop
                                pagingTop
                                scrollX
                                entriesOptions={[5, 20, 25]}
                                entries={10}
                                style={{ backgroundColor: 'white' }}
                            />
                        </Card.Body>
                    </Card>
                </Fragment>
            ) : (
                <Loader />
            )}
        </Fragment>
    )
}

export default TrackingPageProgress
