import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAnnouncementType, deleteAnnouncementType, clearErrors } from './../../../actions/announcementActions'
import { DELETE_ANNOUNCEMENT_TYPE_RESET } from './../../../constants/announcementConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from './../../layout/Sidebar'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'

const ListAnnouncementType = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcementTypes, error } = useSelector(state => state.announcementType)
    const { error: deleteError, isDeleted } = useSelector(state => state.announcement)

    const [show, setShow] = useState(false);
    const [deleteAnnouncementId, setDeleteAnnouncementId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getAnnouncementType())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Announcement type has been deleted successfully.')
            history.push('/admin/announcementTypes')

            dispatch({
                type: DELETE_ANNOUNCEMENT_TYPE_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isDeleted, deleteError])

    const deleteAnnouncementTypeHandler = (id) => {
        dispatch(deleteAnnouncementType(id))
        handleClose()
    }

    const setAnnouncementType = () => {
        const data = {
            columns: [
                {
                    label: 'No.',
                    field: 'number',
                    width: 100
                },
                {
                    label: 'Announcement Category',
                    field: 'announcementCategory',
                    width: 800
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 100
                }
            ],
            rows: []
        }

        announcementTypes && announcementTypes.forEach((announcement, x) => {
            data.rows.push({
                number: ++x,
                announcementCategory: announcement.announcementCategory,
                actions: <Fragment>
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
                    <Button variant="primary" onClick={() => deleteAnnouncementTypeHandler(deleteAnnouncementId)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px" }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                                <h3>Announcement Types</h3>
                            </div>
                        </div>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAnnouncementType()}
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

export default ListAnnouncementType
