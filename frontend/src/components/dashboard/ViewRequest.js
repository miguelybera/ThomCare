import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, clearErrors } from './../../actions/requestActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Button } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const ViewRequest = ({ history, match }) => {
    const dispatch = useDispatch()

    const { loading, request } = useSelector(state => state.requestDetails)

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const upperCase = (text) => text.toUpperCase()

    const requestId = match.params.id

    const [requestorFirstName, setRequestorFirstName] = useState('')
    const [requestorLastName, setRequestorLastName] = useState('')
    const [requestorStudentNumber, setRequestorStudentNumber] = useState('')
    const [requestorEmail, setRequestorEmail] = useState('')
    const [requestorYearLevel, setRequestorYearLevel] = useState('')
    const [requestorSection, setRequestorSection] = useState('')
    const [requestorCourse, setRequestorCourse] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [requestorNotes, setRequestorNotes] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [returningFiles, setReturningFiles] = useState([])
    const [remarks, setRemarks] = useState([])
    const [remarksMessage, setRemarksMessage] = useState([])


    useEffect(() => {
        if (request && request._id !== requestId) {
            dispatch(getRequestDetails(requestId))
        } else if (request) {
            setRequestorFirstName(request.requestorFirstName)
            setRequestorLastName(request.requestorLastName)
            setRequestorStudentNumber(request.requestorStudentNumber)
            setRequestorEmail(request.requestorEmail)
            setRequestorYearLevel(request.requestorYearLevel)
            setRequestorSection(request.requestorSection)
            setRequestorCourse(request.requestorCourse)
            setRequestStatus(request.requestStatus)
            setRequestType(request.requestType)
            setRequestorNotes(request.requestorNotes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
            setRemarks(request.remarks)
        } else {
            dispatch(getRequestDetails(requestId))
        }


        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, request, history])

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
                }
            ],
            rows: []
        }
        remarks.forEach(remark => {
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
                    <ul>
                        {remark.returningFiles && remark.returningFiles.map(file => (
                            <li><a href={file.path}>{file.originalname}</a></li>
                        ))}
                    </ul>
                    <p style={{ fontSize: '12px', color: 'gray', paddingTop: '10px' }}>By: {upperCase(remark.userUpdated)}</p>
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
                            <Card.Title>Tracking ID#: {trackingNumber}</Card.Title>
                            <Card.Text><b>Name:</b> {request && upperCase(requestorLastName)}, {upperCase(requestorFirstName)}</Card.Text>
                            <Card.Text><b>Current status:</b> <font color={
                                !request ? '' : (
                                    (requestStatus === 'Pending' ? 'blue' : (
                                        requestStatus === 'Processing' ? '#ffcc00' : (
                                            requestStatus === 'Denied' ? 'red' : 'green'
                                        )
                                    ))
                                )
                            }>{upperCase(requestStatus)}</font></Card.Text>
                            <Card.Text><b>Student number:</b> {requestorStudentNumber}</Card.Text>
                            <Card.Text><b>Email:</b> {requestorEmail}</Card.Text>
                            <Card.Text><b>Course:</b> {requestorCourse}</Card.Text>
                            <Card.Text>
                                Attachments:
                                <ul>
                                    {fileRequirements && fileRequirements.map(file => (
                                        <li><a href={file.path}>{file.originalname}</a></li>
                                    ))}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{
                        marginTop: '30px',
                        marginBottom: '40px',
                        borderWidth: '0',
                        width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <MDBDataTableV5
                            data={setHistory()}
                            scrollX
                            searching={false}
                            paging={false}
                            sortable={false}
                            hover
                        />
                        <Link to={`/admin/request/${requestId}`}><Button>Update</Button></Link>
                    </Card>
                </Fragment>
            ) : (
                <Loader />
            )}
        </Fragment>
    )
}

export default ViewRequest
