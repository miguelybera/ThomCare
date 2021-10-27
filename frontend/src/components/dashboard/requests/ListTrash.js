import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, updateRequest, deleteRequest, clearErrors } from '../../../actions/requestActions'
import { createAudit } from '../../../actions/auditActions'
import { UPDATE_REQUEST_RESET, DELETE_REQUEST_RESET } from '../../../constants/requestConstants'
import { NEW_AUDIT_RESET } from '../../../constants/auditConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import dateformat from 'dateformat'

const dropdown = {
    border: "2px solid black",
    borderRadius: "20px",
    margin: '5px 0'
}

const ListAllRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { user } = useSelector(state => state.auth)
    const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.request)
    const { success } = useSelector(state => state.audit)

    const [show, setShow] = useState(false)
    const [emptyShow, setEmptyShow] = useState(false)
    const [deleteAll, setDeleteAll] = useState(false)
    const [requestId, setRequestId] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)
    const handleEmptyClose = () => setEmptyShow(false)
    const handleEmptyShow = () => setEmptyShow(true)

    const changeDateFormat = (date) => dateformat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    const [requestType, setRequestType] = useState('')

    let requestTypes = [
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Request for Leave of Absence',
        'Submission of Admission Memo',
        'Others (CICS Office)'
    ]

    if (user.role !== 'CICS Office') {
        requestTypes = [
            'Adding/Dropping of Course',
            'Cross Enrollment within CICS',
            'Cross Enrollment outside CICS',
            'Request for Petition Classes within CICS',
            'Request for Crediting of Courses',
            'Request for Overload',
            'Request to Override',
            'Request for Late Enrollment',
            'Request for Manual Enrollment',
            'Others (Dept Chair)'
        ]
    }

    useEffect(() => {
        if (user.role === 'CICS Office') {
            dispatch(getRequests('CICS Office', 'Trash'))
        } else {
            dispatch(getRequests('Dept Chair', 'Trash'))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted && deleteAll) {
            dispatch({
                type: DELETE_REQUEST_RESET
            })
        }

        if (isDeleted && deleteAll === false) {
            alert.success('Request has been deleted successfully.')
            history.push('/admin/requests/trash')

            dispatch({
                type: DELETE_REQUEST_RESET
            })
        }

        if (isUpdated) {
            alert.success('Request has been restored successfully.')
            history.push('/admin/requests/trash')

            dispatch({
                type: UPDATE_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isUpdated, isDeleted, deleteError, deleteAll, user.role])

    useEffect(() => {
        if (success) {
            dispatch({
                type: NEW_AUDIT_RESET
            })
        }
    }, [dispatch, success])

    useEffect(() => {
        if (user.role === 'CICS Office') {
            dispatch(getRequests('CICS Office', 'Trash', requestType))
        } else {
            dispatch(getRequests('Dept Chair', 'Trash', requestType))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, requestType, user.role])

    const deleteRequestHandler = (id) => {
        dispatch(deleteRequest(id, 'No'))
        handleClose()
    }

    const updateRequestHandler = (id) => {
        dispatch(updateRequest(id, { isTrash: false }, true))
        handleClose()
    }

    const emptyTrash = () => {
        setDeleteAll(!deleteAll)

        let length = requests.length

        requests.forEach(request => {
            dispatch(deleteRequest(request._id, 'Yes'))
        })

        alert.success('Trash has been emptied.')

        const msg = {
            name: "Emptied requests trash",
            eventInfo: `${length} request(s) deleted.`
        }

        dispatch(createAudit(msg))

        handleEmptyClose()
    }

    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 120
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 250
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 310
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 230
                }
            ],
            rows: []
        }

        requests && requests.forEach(request => {
            const viewType = '4' + request._id

            data.rows.push({
                date: changeDateFormat(request.createdAt),
                requestType: request.requestType,
                name: request.requestorInfo.firstName + ' ' + request.requestorInfo.lastName,
                requestStatus: <Fragment>
                    <p style={{
                        color: request.requestStatus === 'Pending' ? 'blue' : (
                            request.requestStatus === 'Processing' ? '#ffcc00' : (
                                request.requestStatus === 'Denied' ? 'red' : 'green'
                            )
                        )
                    }}>
                        {upperCase(request.requestStatus)}
                    </p>
                </Fragment>,
                actions: <Fragment>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                View
                            </Tooltip>
                        }>
                        <Link to={`/view/request/${viewType}`}>
                            <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                                <i class="fa fa-eye" aria-hidden="true" style={{ textDecoration: 'none' }} />
                            </Button>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Restore
                            </Tooltip>
                        }>
                        <Button variant="outline-warning" className="mr-5" style={{ margin: '5px', color: 'black' }} onClick={() => { updateRequestHandler(request._id) }}>
                            <i class="fa fa-undo" aria-hidden="true" />
                        </Button>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Delete
                            </Tooltip>
                        }>
                        <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                            handleShow()
                            setRequestId(request._id)
                        }}>
                            <i class="fa fa-trash" aria-hidden="true" />
                        </Button>
                    </OverlayTrigger>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Trashed Requests'} />
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
                    <Button variant="primary" onClick={() => deleteRequestHandler(requestId)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Modal show={emptyShow} onHide={handleEmptyClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Empty Trash?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete ALL messages? This cannot be undone.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleEmptyClose}>
                        Close
                                </Button>
                    <Button variant="primary" onClick={() => emptyTrash()}>
                        Yes, I'm sure
                                </Button>
                </Modal.Footer>
            </Modal>
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                                <h3>Trash</h3>
                            </div>
                            <div style={{ marginLeft: 'auto', marginTop: '30px' }}>
                                <Button variant='outline-danger' onClick={handleEmptyShow}>Empty Trash</Button>
                            </div>
                        </div>
                        <Form>
                            <Row >
                                <Col xs={12} md={4} lg={3}>
                                    <Form.Group>
                                        <Form.Select
                                            aria-label="Course"
                                            size="sm"
                                            style={dropdown}
                                            name="requestType"
                                            value={requestType}
                                            onChange={e => setRequestType(e.target.value)}
                                        >
                                            <option value=''>Request Type</option>
                                            {requestTypes.map(r => (
                                                <option value={r}>{r}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>

                                </Col>
                            </Row>
                        </Form>

                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setRequests()}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    entriesOptions={[10, 20, 30, 40, 50]}
                                    entries={10}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListAllRequests