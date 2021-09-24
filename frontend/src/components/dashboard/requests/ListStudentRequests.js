import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, deleteRequest, clearErrors } from '../../../actions/requestActions'
import { DELETE_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const ListStudentRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { error: deleteError, isDeleted } = useSelector(state => state.request)

    const [show, setShow] = useState(false);
    const [requestId, setRequestId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        dispatch(getRequests('Student', ''))

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
            history.push('/me/requests')

            dispatch({
                type: DELETE_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, deleteError, isDeleted])

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
                    width: 150
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 180
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 150
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
            const viewType = '2'+request._id

            data.rows.push({
                date: changeDateFormat(request.createdAt),
                requestType: request.requestType,
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
                <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                    setRequestId(request._id)
                    handleShow()
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
                        <h3>My Requests</h3>
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

export default ListStudentRequests