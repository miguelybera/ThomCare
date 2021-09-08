import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests, deleteRequest, clearErrors } from '../../actions/requestActions'
import { UPDATE_REQUEST_RESET, DELETE_REQUEST_RESET } from '../../constants/requestConstants'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const ListAllRequests = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { user } = useSelector(state => state.auth)
    const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.request)

    const [show, setShow] = useState(false);
    const [deleteRequestId, setDeleteRequestId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (user.role === 'CICS Staff') {
            dispatch(getRequests('CICS Staff', false, true))
        } else {
            dispatch(getRequests('Dept Chair', false, true))
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
            history.push('/controlpanel')

            dispatch({
                type: DELETE_REQUEST_RESET
            })
        }

        if (isUpdated) {
            alert.success('Request has been restored successfully.')
            history.push('/controlpanel')

            dispatch({
                type: UPDATE_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    // const deleteAnnouncementHandler = (id) => {
    //     dispatch(deleteAnnouncement(id))
    //     handleClose()
    // }

    const upperCase = (text) => text.toUpperCase()

    const deleteRequestHandler = (id) => {
        dispatch(deleteRequest(id))
        handleClose()
    }

    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 100
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 150
                },
                {
                    label: 'Requested by',
                    field: 'requestorName',
                    width: 300
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 180
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: []
        }

        requests.forEach(request => {
            data.rows.push({
                date: changeDateFormat(request.createdAt),
                requestType: request.requestType,
                requestorName: request.requestorFirstName + ' ' + request.requestorLastName,
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
                    <Link to={`/admin/request/${request._id}`}>
                        <Button variant="primary" className="mr-5" style={{ marginRight: '5px' }}>
                            <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                    <Button variant="warning" className="mr-5" style={{ marginRight: '5px' }} onClick={() => {
                        console.log('here')
                    }}>
                        <i class="fa fa-archive" aria-hidden="true" />
                    </Button>
                    <Button variant="danger" className="mr-5" style={{ marginRight: '5px' }} onClick={() => {
                        handleShow()
                        setDeleteRequestId(request._id)
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
            <MetaData title={'Requests'} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this announcement?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteRequestHandler(deleteRequestId)}>Yes, I'm sure</Button>
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
                                    entries={5}
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