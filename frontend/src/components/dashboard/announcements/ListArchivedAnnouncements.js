import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getArchivedAnnouncements, deleteAnnouncement, clearErrors } from '../../../actions/announcementActions'
import { DELETE_ANNOUNCEMENT_RESET } from '../../../constants/announcementConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
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

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isDeleted, deleteError])

    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")

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
                    width: 150
                },
                {
                    label: 'Title',
                    field: 'title',
                    width: 180
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
                    width: 150
                }
            ],
            rows: []
        }

        announcements && announcements.forEach(announcement => {
            data.rows.push({
                date: changeDateFormat(announcement.createdAt),
                title: announcement.title,
                description: announcement.description,
                tags: <Fragment>
                    <span>
                        <p style={{ margin: '0' }}><b>Year Level: </b>{announcement.yearLevel}</p>
                        <p style={{ margin: '0' }}><b>Course: </b>{announcement.course}</p>
                        <p style={{ margin: '0' }}><b>Track: </b>{announcement.track}</p>
                        <p style={{ margin: '0' }}><b>Announcement Type: </b>{announcement.announcementType}</p>
                    </span>
                </Fragment>,
                actions: <Fragment>
                    <Link to={`/admin/announcement/${announcement._id}`}>
                        <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                            <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                    <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        handleShow()
                        setDeleteAnnouncementId(announcement._id)
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
            <MetaData title={'Announcements'} />
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
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Archived Announcements</h3>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAnnouncements()}
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

export default ListArchivedAnnouncements
