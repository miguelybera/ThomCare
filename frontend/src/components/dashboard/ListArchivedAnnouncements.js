import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAnnouncements, deleteAnnouncement, clearErrors } from '../../actions/announcementActions'
import { DELETE_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'

var dateFormat = require('dateformat')

const ListArchivedAnnouncements = ({history}) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error } = useSelector(state => state.announcements)
    const { error: deleteError, isDeleted } = useSelector(state => state.announcement)

    useEffect(() => {
        dispatch(getAdminAnnouncements())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Announcement has been deleted successfully.')
            history.push('/admin/announcements')

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
    }

    const setHistory = () => {

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
                    <p>{announcement.yearLevel}, {announcement.course}, {announcement.track}</p>
                </Fragment>,
                actions: <Fragment>
                    <button><Link to={`/admin/announcement/${announcement._id}`}>Update</Link></button>
                    <button onClick={() => deleteAnnouncementHandler(announcement._id)}>Delete</button>
                </Fragment>
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            {loading ? <Loader /> : (
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Control Panel</h1>

                        <Container className="space_inside"></Container>

                        <Container>
                            <h3>Announcements</h3>
                            <button><Link to='/admin/new/announcement'>Create announcement</Link></button>
                            <MDBDataTableV5
                                data={setHistory()}
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
            )}
        </Fragment>
    )
}

export default ListArchivedAnnouncements
