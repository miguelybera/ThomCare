import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Container, Button, Col, Card, Form, Accordion, ListGroup, ListGroupItem } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequestDetails, updateRequest, clearErrors } from '../../../actions/requestActions'
import { REQUEST_DETAILS_RESET, UPDATE_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../../layout/Sidebar'
var dateFormat = require('dateformat')

const UpdateRequest = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: requestLoading, error, request } = useSelector(state => state.requestDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.request)

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [currentStatus, setCurrentStatus] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [returningFiles, setReturningFiles] = useState([])
    const [remarks, setRemarks] = useState([])
    const [remarksMessage, setRemarksMessage] = useState([])

    const status = ["Pending", "Processing", "Denied", "Approved"]

    const requestId = match.params.id

    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        if (request && request._id !== requestId) {
            dispatch(getRequestDetails(requestId))
        } else if (request) {
            setRequestorInfo(request.requestorInfo)
            setCurrentStatus(request.requestStatus)
            setRequestStatus(request.requestStatus)
            setRequestType(request.requestType)
            setNotes(request.notes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
            setRemarks(request.remarks)
        } else {
            dispatch(getRequestDetails(requestId))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            window.history.back()
        }

        if (isUpdated) {
            dispatch({
                type: UPDATE_REQUEST_RESET
            })

            dispatch({
                type: REQUEST_DETAILS_RESET
            })
            window.history.back()
            alert.success('Request updated successfully.')
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, request, error, history, alert, isUpdated, updateError, requestId])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setReturningFiles([])

        files.forEach(file => {
            setReturningFiles(oldArray => [...oldArray, file])
        })
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('requestStatus', requestStatus)
        formData.set('remarksMessage', remarksMessage)

        returningFiles.forEach(file => {
            formData.append('returningFiles', file)
        })

        dispatch(updateRequest(requestId, formData, false))
    }

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
            <MetaData title={`Update Request`} />
            <Sidebar />
            <Container className="space_inside" />
            {requestLoading ? <Loader /> : (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px' }}>
                    <Card style={{ backgroundColor: '#fff' }}>  {/*, width: '100rem' */}
                        <Card.Body>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold' }}>
                                {requestType} <br />
                                Tracking #: {trackingNumber} - {requestorInfo.lastName} <br />
                            </Card.Title>
                            <Card.Text>
                                <b>Current status:</b> <font color={
                                    !request ? '' : (
                                        (currentStatus === 'Pending' ? 'blue' : (
                                            currentStatus === 'Processing' ? '#ffcc00' : (
                                                currentStatus === 'Denied' ? 'red' : 'green'
                                            )
                                        ))
                                    )
                                }>
                                    {upperCase(currentStatus)}
                                </font>
                            </Card.Text>
                            <Accordion defaultActiveKey="0">
                                <Accordion.Item eventKey="0">
                                    <Accordion.Header>
                                        <Card.Title style={{ margin: '10px 0 20px 0', color: '#000', fontWeight: 'bold' }}>Request Details</Card.Title>
                                    </Accordion.Header>
                                    <Accordion.Body>
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
                                            <Form.Group as={Col} className="mb-3" xs={12} md={4}>
                                                <Form.Label>Request Type</Form.Label>
                                                <Form.Control type='text' value={requestType} readOnly />
                                            </Form.Group>
                                            <Form.Group as={Col} className="mb-3" xs={12} md={3}>
                                                <Form.Label>Tracking Number</Form.Label>
                                                <Form.Control type='text' value={trackingNumber} readOnly />
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
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold' }}>Update Request</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" xs={12} md={6} lg={3}>
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            value={requestStatus}
                                            name="requestStatus"
                                            onChange={e => setRequestStatus(e.target.value)}
                                            required
                                        >
                                            <option value=''></option>
                                            {status.map(status => (
                                                <option value={status}>{status}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" xs={12} md={6} lg={3}>
                                        <Form.Label>Remarks message</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={2}
                                            value={remarksMessage}
                                            name="remarksMessage"
                                            onChange={e => setRemarksMessage(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" xs={12} md={returningFiles.length !== 0 ? 6 : 12} lg={returningFiles.length !== 0 ? 3 : 6}>
                                        <Form.Label>Attachments</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="fileRequirements"
                                            onChange={onChange}
                                            multiple
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" xs={12} md={returningFiles.length !== 0 ? 6 : 6} lg={returningFiles.length !== 0 ? 3 : 12}>
                                        <ListGroup>
                                            {returningFiles && returningFiles.map(file => (
                                                <ListGroupItem>{file.name}</ListGroupItem>
                                            ))}
                                        </ListGroup>
                                    </Form.Group>
                                </Row>
                                <center><Button
                                    type='submit'
                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                    disabled={loading ? true : false}
                                >
                                    {loading ? (
                                        <span>
                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                        </span>
                                    ) : (
                                        <span>Update</span>
                                    )}
                                </Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            )
            }
        </Fragment >
    )
}

export default UpdateRequest