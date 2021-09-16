import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, updateRequest, clearErrors } from './../../actions/requestActions'
import { REQUEST_DETAILS_RESET, UPDATE_REQUEST_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import Sidebar from './../layout/Sidebar'
import { Row, Container, Button, Col, Card, Form } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const UpdateRequest = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: requestLoading, error, request } = useSelector(state => state.requestDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.request)

    const requestId = match.params.id

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [returningFiles, setReturningFiles] = useState([])
    const [remarks, setRemarks] = useState([])
    const [remarksMessage, setRemarksMessage] = useState([])

    const status = [
        "Pending",
        "Processing",
        "Denied",
        "Approved"
    ]

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

    useEffect(() => {
        if (request && request._id !== requestId) {
            dispatch(getRequestDetails(requestId))
        } else if (request) {
            setRequestorInfo(request.requestorInfo)
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
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, request, error, history, alert, isUpdated, updateError])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setReturningFiles([])

        files.forEach(file => {
            setReturningFiles(oldArray => [...oldArray, file])
        })
    }

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const upperCase = (text) => text.toUpperCase()

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
                    <ul>
                        {remark.returningFiles && remark.returningFiles.map(file => (
                            <li><a href={file.path}>{file.originalname}</a></li>
                        ))}
                    </ul>
                </Fragment>

            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`Update Request`} />
            <Sidebar />
            {requestLoading ? <Loader /> : (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px' }}>
                    <Card style={{ backgroundColor: '#9c0b0b' }}>  {/*, width: '100rem' */}
                        <Card.Body>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>ADD / DROP COURSE FORM</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form style={{ color: 'white' }} onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={requestorInfo.firstName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={requestorInfo.lastName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="N/A" value={requestorInfo.middleName} readOnly />
                                    </Form.Group>
                                </Row>

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Student Number</Form.Label>
                                    <Form.Control value={requestorInfo.studentNumber} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Course/Program</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.course} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Year Level / Section</Form.Label>
                                    <Form.Control type="text" value={requestorInfo.yearLevel + ' ' + requestorInfo.section} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Notes</Form.Label>
                                    <Form.Control type="text" value={notes} readOnly />

                                    {fileRequirements && (<p>Attachments:</p>)}
                                    {fileRequirements && fileRequirements.map(file => (
                                        <li><a href={file.path}>{file.originalname}</a></li>
                                    ))}
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={requestorInfo.email} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Status</Form.Label>
                                        <Form.Select aria-label="Default select example" value={requestStatus} name="requestStatus" onChange={e => setRequestStatus(e.target.value)} required>
                                            <option value=''></option>
                                            {status.map(status => (
                                                <option value={status}>{status}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Request Type</Form.Label>
                                        <Form.Control type='email' value={requestType} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Tracking Number</Form.Label>
                                        <Form.Control type='email' value={trackingNumber} readOnly />
                                    </Form.Group>
                                </Row>


                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Remarks message</Form.Label>
                                    <Form.Control type="text"value={remarksMessage} name="remarksMessage" onChange={e => setRemarksMessage(e.target.value)}/>
                                </Form.Group>

                                <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Courses to Add / Drop</Card.Title>

                                <MDBDataTableV5
                                    data={setHistory()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
                                    entries={10}
                                />

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Attachments</Form.Label>
                                        <Form.Control type="file" name="fileRequirements" onChange={onChange} multiple />
                                    </Form.Group>

                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        {returningFiles && (<p>Attachments:</p>)}
                                        <ul>
                                            {returningFiles && returningFiles.map(file => (
                                                <li>{file.name}</li>
                                            ))}
                                        </ul>
                                    </Form.Group>
                                </Row>
                                <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} disabled={loading ? true : false}>Update</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            )}
        </Fragment>
    )
}

export default UpdateRequest