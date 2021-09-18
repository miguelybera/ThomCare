import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, updateRequest, deleteRequest, assignRequest, clearErrors } from './../../actions/requestActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import Sidebar from './../layout/Sidebar'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Button, Modal } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'
import {
    ASSIGN_REQUEST_RESET,
    UPDATE_REQUEST_RESET,
    DELETE_REQUEST_RESET
} from '../../constants/requestConstants'
import { assign } from 'nodemailer/lib/shared'

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
    const { error: updateError, isUpdated, isDeleted } = useSelector(state => state.request)

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const requestId = match.params.id
    const id = requestId.substr(1, requestId.length - 1)
    const [viewType, setViewType] = useState(requestId.substr(0, 1))

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
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, request, history, error, isUpdated])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            if (viewType == 1) {
                alert.success('Request has been moved to Trash.')
                setViewType(4)
                history.push(`/view/request/${viewType}${request._id}`)
            } else if (viewType == 4) {
                alert.success('Request has been restored.')
                setViewType(1)
                history.push(`/view/request/${viewType}${request._id}`)
            } else if (viewType == 3) {
                alert.success('Request has been assigned to user successfully.')
                setViewType(1)
                history.push(`/view/request/${viewType}${request._id}`)
            }

            dispatch({
                type: UPDATE_REQUEST_RESET
            })
            dispatch(getRequestDetails(id))
        }

        if (isDeleted) {
            if (viewType == 2) {
                alert.success('Request has been deleted successfully.')
                window.history.back()
            } else if (viewType == 4) {
                alert.success('Request has been deleted successfully.')
                history.push('/admin/requests/trash')
            }

            dispatch({
                type: DELETE_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, updateError, isUpdated, isDeleted])

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const upperCase = (text) => text.toUpperCase()

    const updateRequestHandler = (id, del) => {
        dispatch(updateRequest(id, { isTrash: del }, true))
    }

    const assignRequestHandler = (id) => {
        dispatch(assignRequest(id, {}))
    }

    const deleteRequestHandler = (id) => {
        dispatch(deleteRequest(id))
        handleClose()
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
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this request?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteRequestHandler(id)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Sidebar />
            {!loading ? (
                <Fragment>
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

                        {viewType == 1 ? (
                            <Fragment>
                                <Link to={`/admin/request/${id}`}><Button>Update</Button></Link>
                                <Button onClick={() => {
                                    updateRequestHandler(id, true)
                                }}>Delete</Button>
                            </Fragment>
                        ) : (
                            viewType == 2 ? (
                                <Fragment>
                                    <Button onClick={() => {
                                        handleShow()
                                    }}>Delete</Button>
                                </Fragment>
                            ) : (
                                viewType == 3 ? (
                                    <Button onClick={() => {
                                        assignRequestHandler(id)
                                    }}>Assign to self</Button>
                                ) : (
                                    viewType == 4 ? (
                                        <Fragment>
                                            <Button onClick={() => {
                                                updateRequestHandler(id, false)
                                            }}>Restore</Button>
                                            <Button onClick={() => {
                                                handleShow()
                                            }}>Delete</Button>
                                        </Fragment>
                                    ) : (
                                        <></>
                                    )
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
