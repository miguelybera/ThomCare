import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, clearErrors } from './../../actions/requestActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import Sidebar from './../layout/Sidebar'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Button } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const ViewRequest = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, request } = useSelector(state => state.requestDetails)

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const requestId = match.params.id
    const id = requestId.substr(1, requestId.length - 1)
    const viewType = requestId.substr(0, 1)

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [remarks, setRemarks] = useState([])

    useEffect(() => {
        if (request && request._id !== id) {
            dispatch(getRequestDetails(id))
        } else if (request) {
            setRequestorInfo(request.requestorInfo)
            setRequestStatus(request.requestStatus)
            setRequestType(request.requestType)
            setNotes(request.notes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
            setRemarks(request.remarks)
        } else {
            dispatch(getRequestDetails(id))
        }

        if (error) {
            window.history.back()
            alert.error(error)
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, request, history, error])

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
                    <p style={{ fontSize: '12px', color: 'gray', paddingTop: '10px' }}>By: {remark.userUpdated}</p>
                </Fragment>

            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`Tracking ID: ${trackingNumber}`} />
            <Sidebar />
            {!loading ? (
                <Fragment style={{ marginTop: '30px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <Card.Title>Tracking ID#: {trackingNumber}</Card.Title>
                            <Card.Text><b>Name:</b> {requestorInfo.lastName}, {requestorInfo.firstName}</Card.Text>
                            <Card.Text><b>Current status:</b> <font color={
                                !request ? '' : (
                                    (requestStatus === 'Pending' ? 'blue' : (
                                        requestStatus === 'Processing' ? '#ffcc00' : (
                                            requestStatus === 'Denied' ? 'red' : 'green'
                                        )
                                    ))
                                )
                            }>{upperCase(requestStatus)}</font></Card.Text>
                            <Card.Text><b>Request Type:</b> {requestType}</Card.Text>
                            <Card.Text><b>Student number:</b> {requestorInfo.studentNumber}</Card.Text>
                            <Card.Text><b>Email:</b> {requestorInfo.email}</Card.Text>
                            <Card.Text><b>Course:</b> {requestorInfo.course}</Card.Text>
                            <Card.Text><b>Year Level/Section:</b> {requestorInfo.yearLevel} {requestorInfo.section}</Card.Text>
                            <Card.Text><b>Notes:</b> {notes}</Card.Text>
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
                        {viewType === '1' ? (
                            <Fragment>
                                <Link to={`/admin/request/${id}`}><Button>Update</Button></Link>
                                <Button>Delete</Button>
                            </Fragment>
                        ) : ( 
                            viewType === '3' ? (
                                <Button>Assign to self</Button>
                            ) : (
                                viewType === '4' ? (
                                    <Button>Delete</Button>
                                ) : (
                                    <></>
                                )
                            )
                        )}
                    </Card>
                </Fragment>
            ) : (
                <Loader />
            )}
        </Fragment>
    )
}

export default ViewRequest
