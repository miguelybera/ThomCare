import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { Markup } from 'interweave'
import { getAdminAnnouncements, clearErrors } from '../../../actions/announcementActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import dateformat from 'dateformat'

const ListAnnouncements = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error } = useSelector(state => state.announcements)
    const changeDateFormat = date => dateformat(date, "mmm d, yyyy h:MMtt")

    const shortenDescription = (description) => {
        let y = description.split(' ')
        let z = description.split(' ').slice(0, 50).join(' ')

        if (y.length > 50) {
            z = z + '...'
        }

        return z
    }

    useEffect(() => {
        dispatch(getAdminAnnouncements('Not me'))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error])

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
                    width: 250
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 350
                },
                {
                    label: 'Tags',
                    field: 'tags',
                    width: 250
                }
            ],
            rows: []
        }

        announcements && announcements.forEach(announcement => {
            data.rows.push({
                date: changeDateFormat(announcement.createdAt),
                title: announcement.title,
                description: <Fragment><Markup content={shortenDescription(announcement.description)} /></Fragment>,
                tags: <Fragment>
                    <span>
                        <p style={{ margin: '0' }}><b>Year Level: </b>{announcement.yearLevel}</p>
                        <p style={{ margin: '0' }}><b>Course: </b>{announcement.course}</p>
                        <p style={{ margin: '0' }}><b>Track: </b>{announcement.track}</p>
                        <p style={{ margin: '0' }}><b>Announcement Type: </b>{announcement.announcementType}</p>
                    </span>
                </Fragment>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                                <h3>Announcements</h3>
                            </div>
                            <div style={{ marginLeft: '2px', marginTop: '30px', marginRight: '2px' }}>
                                <Link to='/admin/new/announcement' style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button variant="outline-secondary">
                                        Create announcement
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAnnouncements()}
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

export default ListAnnouncements
