import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCICSRequests, clearErrors } from '../../actions/requestActions'
//import { ARCHIVE_ANNOUNCEMENT_RESET, DELETE_ANNOUNCEMENT_RESET } from '../../constants/requestConstants'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'

var dateFormat = require('dateformat')

const ListCICSRequests = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    //const { error: deleteError, isDeleted, isUpdated } = useSelector(state => state.announcement)

    const [show, setShow] = useState(false);
    //const [deleteAnnouncementId, setDeleteAnnouncementId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getCICSRequests())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        // if (deleteError) {
        //     alert.error(deleteError)
        //     dispatch(clearErrors())
        // }

        // if (isDeleted) {
        //     alert.success('Announcement has been deleted successfully.')
        //     history.push('/admin/announcements')

        //     dispatch({
        //         type: DELETE_ANNOUNCEMENT_RESET
        //     })
        // }

        // if (isUpdated) {
        //     alert.success('Announcement has been archived successfully.')
        //     history.push('/admin/announcements')

        //     dispatch({
        //         type: ARCHIVE_ANNOUNCEMENT_RESET
        //     })
        // }

    }, [dispatch, alert, error])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    // const deleteAnnouncementHandler = (id) => {
    //     dispatch(deleteAnnouncement(id))
    //     handleClose()
    // }
    
    const upperCase = (text) => text.toUpperCase()


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
                    <Button variant="primary">Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <h1 className="my-4">Control Panel</h1>

                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Requests</h3>
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

export default ListCICSRequests
