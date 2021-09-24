import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, updateRequest, deleteRequest, clearErrors } from '../../../actions/requestActions'
import { UPDATE_REQUEST_RESET, DELETE_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const ListAllRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { user } = useSelector(state => state.auth)
    const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.request)

    const [show, setShow] = useState(false);
    const [requestId, setRequestId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        if (user.role === 'CICS Staff') {
            dispatch(getRequests('CICS Staff', 'Trash'))
        } else {
            dispatch(getRequests('Dept Chair', 'Trash'))
        }
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
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
    }, [dispatch, history, alert, error, isUpdated, isDeleted, deleteError, user.role])

    const deleteRequestHandler = (id) => {
        dispatch(deleteRequest(id))
        handleClose()
    }

    const updateRequestHandler = (id) => {
        dispatch(updateRequest(id, {isTrash: false}, true))
        handleClose()
    }
    
    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 150
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 180
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 200
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 180
                }
            ],
            rows: []
        }

        requests.forEach(request => {
            const viewType = '4'+request._id

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
                    <Link to={`/view/request/${viewType}`}>
                        <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                            <i class="fa fa-eye" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                    <Button variant="warning" className="mr-5" style={{ margin: '5px' }} onClick={() => { updateRequestHandler(request._id)}}>
                        <i class="fa fa-undo" aria-hidden="true" />
                    </Button>
                    <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        handleShow()
                        setRequestId(request._id)
                    }}>
                        <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
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
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Trash</h3>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setRequests()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
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