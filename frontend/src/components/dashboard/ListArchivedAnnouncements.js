import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getArchivedAnnouncements, deleteAnnouncement, clearErrors } from '../../actions/announcementActions'
import { DELETE_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'

var dateFormat = require('dateformat')

const ListArchivedAnnouncements = ({ history }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error } = useSelector(state => state.announcements)
    const { error: deleteError, isDeleted } = useSelector(state => state.announcement)

    const [show, setShow] = useState(false);
    const [deleteAnnouncementId, setDeleteAnnouncementId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getArchivedAnnouncements())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Announcement has been deleted successfully.')
            history.push('/admin/archives/announcements')

            dispatch({
                type: DELETE_ANNOUNCEMENT_RESET
            })
        }

    }, [dispatch, alert, error, isDeleted, deleteError])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const deleteAnnouncementHandler = (id) => {
        dispatch(deleteAnnouncement(id))
        handleClose()
    }

    const setAnnouncements = () => {

        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 100
                },
                {
                    label: 'Title',
                    field: 'title',
                    width: 150
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 300
                },
                {
                    label: 'Tags',
                    field: 'tags',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 100
                }
            ],
            rows: []
        }

        announcements.forEach(announcement => {
            data.rows.push({
                date: changeDateFormat(announcement.createdAt),
                title: announcement.title,
                description: announcement.description,
                tags: <Fragment>
                    <p>Year Level: {announcement.yearLevel}</p>
                    <p>Course: {announcement.course}</p>
                    <p>Track: {announcement.track}</p>
                </Fragment>,
                actions: <Fragment>
                    <button><Link to={`/admin/announcement/${announcement._id}`}>Update</Link></button>
                    <button onClick={() => {
                        handleShow()
                        setDeleteAnnouncementId(announcement._id)
                    }}>Delete</button>
                </Fragment>
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Archived Announcements'} />
            {loading ? <Loader /> : (
                <>
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
                            <Button variant="primary" onClick={() => deleteAnnouncementHandler(deleteAnnouncementId)}>Yes, I'm sure</Button>
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
                                <h3>Archived Announcements</h3>
                                <MDBDataTableV5
                                    data={setAnnouncements()}
                                    hover
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
                                    entries={5}
                                />
                            </Container>
                        </div>
                    </div>
                </>
            )}
        </Fragment>
    )
}

export default ListArchivedAnnouncements
