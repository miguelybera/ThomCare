import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Button, Modal, Row, Col, Form, ListGroup, ListGroupItem, Container } from 'react-bootstrap'
import { getRequestDetails, updateRequest, deleteRequest, assignRequest, unassignRequest, clearErrors } from '../../../actions/requestActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import { ASSIGN_REQUEST_RESET, UNASSIGN_REQUEST_RESET, UPDATE_REQUEST_RESET, DELETE_REQUEST_RESET } from '../../../constants/requestConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../../layout/Sidebar'
import dateformat from 'dateformat'

const ViewRequest = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, request } = useSelector(state => state.requestDetails)
    const { error: updateError, isUpdated, isDeleted } = useSelector(state => state.request)
    const { user } = useSelector(state => state.auth)

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [remarks, setRemarks] = useState([])
    const [unassign, setUnassign] = useState(false)

    const requestId = match.params.id
    const id = requestId.substr(1, requestId.length - 1)
    const [viewType, setViewType] = useState(requestId.substr(0, 1))

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeDateFormat = (date) => dateformat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

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
    }, [dispatch, history, alert, error, request, isUpdated, id])

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
            if (Number(viewType) === 1 && setUnassign) {
                alert.success('Request has been unassigned from user successfully.')
                setViewType(3)

                history.push(`/view/request/${viewType}${request._id}`)
                dispatch({
                    type: UNASSIGN_REQUEST_RESET
                })
            } else if (Number(viewType) === 1 && !setUnassign) {
                alert.success('Request has been moved to Trash.')
                setViewType(4)

                history.push(`/view/request/${viewType}${request._id}`)
                dispatch({
                    type: UPDATE_REQUEST_RESET
                })
            } else if (Number(viewType) === 4) {
                alert.success('Request has been restored.')
                setViewType(1)

                history.push(`/view/request/${viewType}${request._id}`)
                dispatch({
                    type: UPDATE_REQUEST_RESET
                })
            } else if (Number(viewType) === 3) {
                alert.success('Request has been assigned to user successfully.')
                setViewType(1)

                history.push(`/view/request/${viewType}${request._id}`)
                dispatch({
                    type: ASSIGN_REQUEST_RESET
                })
            }
            dispatch(getRequestDetails(id))
        }

        if (isDeleted) {
            if (Number(viewType) === 2) {
                alert.success('Request has been deleted successfully.')
                window.history.back()
            } else if (Number(viewType) === 4) {
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
    }, [dispatch, history, alert, error, updateError, isUpdated, isDeleted, viewType])

    const updateRequestHandler = (id, del) => {
        dispatch(updateRequest(id, { isTrash: del }, true))
    }

    const assignRequestHandler = (id) => {
        dispatch(assignRequest(id, {}))
    }

    const unassignRequestHandler = (id) => {
        dispatch(unassignRequest(id, {}))
        setUnassign(!unassign)
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
                    width: 200
                },
                {
                    label: 'Status',
                    field: 'updatedStatus',
                    width: 200
                },
                {
                    label: 'Remarks',
                    field: 'remarksMessage',
                    width: 325
                },
                {
                    label: 'Files',
                    field: 'returningFiles',
                    width: 275
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
                    <p style={{ fontSize: '12px', color: 'gray', paddingTop: '10px' }}>By: {remark.userUpdated}</p>
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

    const setAttachments = () => {
        const data = {
            columns: [
                {
                    label: 'File name',
                    field: 'fileName',
                    width: 750
                },
                {
                    label: 'File Size',
                    field: 'fileSize',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'action',
                    width: 100
                }
            ],
            rows: []
        }

        fileRequirements && fileRequirements.forEach(file => {
            data.rows.push({
                fileName: file.originalname,
                fileSize: Number(file.size / 1000000).toFixed(2) + ' MB',
                action: <Fragment>
                    <a href={file.path} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary py-1 px-2 ml-2">
                            <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </button>
                    </a>
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
                <Container fluid style={{ padding: "50px 0px", marginTop: '50px' }}>
                    <Container fluid>
                        <Card style={{ width: '100%', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
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
                                <Card.Text>
                                    <span className='text-muted'><strong>Date submitted:</strong> {changeDateFormat(request.createdAt)}</span>
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
                                    <Form.Group as={Col} className="mb-3" xs={12}>
                                        <Form.Label>Request attachments</Form.Label>
                                        <MDBDataTableV5
                                            data={setAttachments()}
                                            searchTop
                                            pagingTop
                                            scrollX
                                            entriesOptions={[5, 20, 25]}
                                            entries={10}
                                            style={{ backgroundColor: 'white' }}
                                        />
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
                        <center>
                            {Number(viewType) === 1 ? (
                                user.role === 'CICS Office' ? (
                                    <Fragment>
                                        <Link to={`/admin/request/${id}`}>
                                            <Button
                                                variant="primary"
                                                style={{ width: '5rem', margin: '10px' }}
                                            >
                                                Update
                                    </Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            style={{ width: '5rem', margin: '10px' }} onClick={() => {
                                                updateRequestHandler(id, true)
                                            }}>
                                            Delete
                                </Button>
                                        <Button
                                            variant="secondary"
                                            style={{ width: '10rem', margin: '10px' }}
                                            onClick={() => {
                                                unassignRequestHandler(id)
                                            }}>
                                            Unassign from self
                                </Button>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Link to={`/admin/request/${id}`}>
                                            <Button
                                                variant="primary"
                                                style={{ width: '5rem', margin: '10px' }}
                                            >
                                                Update
                                    </Button>
                                        </Link>
                                        <Button
                                            variant="danger"
                                            style={{ width: '5rem', margin: '10px' }} onClick={() => {
                                                updateRequestHandler(id, true)
                                            }}>
                                            Delete
                                </Button>
                                    </Fragment>
                                )) : (
                                Number(viewType) === 2 ? (
                                    <Fragment>
                                        <Button
                                            variant="danger"
                                            style={{ width: '5rem', margin: '10px' }}
                                            onClick={() => {
                                                handleShow()
                                            }}>
                                            Delete
                                    </Button>
                                    </Fragment>
                                ) : (
                                    Number(viewType) === 3 ? (
                                        <Button
                                            variant="warning"
                                            style={{ width: '8rem', margin: '10px' }}
                                            onClick={() => {
                                                assignRequestHandler(id)
                                            }}>
                                            Assign to self
                                        </Button>
                                    ) : (
                                        Number(viewType) === 4 ? (
                                            <Fragment>
                                                <Button
                                                    variant="warning"
                                                    style={{ width: '5rem', margin: '10px' }}
                                                    onClick={() => {
                                                        updateRequestHandler(id, false)
                                                    }}>
                                                    Restore
                                            </Button>
                                                <Button
                                                    variant="danger"
                                                    style={{ width: '5rem', margin: '10px' }}
                                                    onClick={() => {
                                                        handleShow()
                                                    }}>
                                                    Delete
                                            </Button>
                                            </Fragment>
                                        ) : (
                                            <></>
                                        )
                                    )
                                )
                            )}
                        </center>
                    </Container>
                </Container>
            ) : <Loader />}
        </Fragment>
    )
}

export default ViewRequest
