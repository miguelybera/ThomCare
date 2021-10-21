import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { Markup } from 'interweave'
import { getAnnouncementDetails, getUser, clearErrors } from './../../../actions/announcementActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import dateformat from 'dateformat'

const cardStyle = {
    margin: '50px auto',
    width: '100%',
    align: 'center'
}

const AnnouncementDetails = ({ history, match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcement, error } = useSelector(state => state.announcementDetails)
    const { singleUser, error: userError } = useSelector(state => state.singleUser)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [announcementType, setAnnouncementType] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [fileAttachments, setFileAttachments] = useState([])

    const announcementId = match.params.id

    const changeDateFormat = (date) => dateformat(date, "ddd, mmm d, yyyy h:MMtt")
    const upperCase = (name) => name.toUpperCase()

    useEffect(() => {
        if (announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        } else if (announcement) {
            setTitle(announcement.title)
            setDescription(announcement.description)
            setYearLevel(announcement.yearLevel)
            setCourse(announcement.course)
            setTrack(announcement.track)
            setAnnouncementType(announcement.announcementType)
            setCreatedBy(announcement.createdBy)
            setCreatedAt(announcement.createdAt)
            setFileAttachments(announcement.fileAttachments)
        } else {
            dispatch(getAnnouncementDetails(announcementId))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/')
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, history, alert, error, announcement, announcementId])

    useEffect(() => {
        if (createdBy) {
            dispatch(getUser(createdBy))
        }

        if (userError) {
            alert.error(userError)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, userError, createdBy])

    const setAttachments = () => {
        const data = {
            columns: [
                {
                    label: 'File name',
                    field: 'fileName',
                    width: 750
                },
                {
                    label: 'File Size',
                    field: 'fileSize',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'action',
                    width: 100
                }
            ],
            rows: []
        }

        fileAttachments && fileAttachments.forEach(file => {
            data.rows.push({
                fileName: file.originalname,
                fileSize: Number(file.size / 1000000).toFixed(2) + ' MB',
                action: <Fragment>
                    <a href={file.path} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary py-1 px-2 ml-2">
                            <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </button>
                    </a>
                </Fragment>
            })
        })

        return data
    }

    return (
        <>
            <MetaData title={title} />
            {loading ? <Loader /> : (
                <Card style={cardStyle}>
                    <Card.Header>
                        <Breadcrumb>
                            <Breadcrumb.Item><Link to='/'>Announcements</Link></Breadcrumb.Item>
                            <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>{title}</Card.Title>
                        <Card.Text style={{ fontWeight: 'lighter', color: 'gray', fontSize: '12px' }}>Posted on: {changeDateFormat(createdAt)}</Card.Text>
                        <Card.Text style={{ paddingBottom: '45px' }}><Markup content={description} /></Card.Text>
                        <Card.Text>
                            {fileAttachments.length !== 0 && (<p>Attachments:</p>)}
                            {fileAttachments.length !== 0 && (
                                <MDBDataTableV5
                                    data={setAttachments()}
                                    searchTop
                                    entriesOptions={[10, 20, 30, 40, 50]}
                                    entries={10}
                                    style={{ backgroundColor: 'white' }}
                                />
                            )}
                        </Card.Text>
                        <Card.Text style={{ fontWeight: '600', color: 'gray', fontSize: '12px' }}>Posted by: {singleUser && upperCase(singleUser.firstName + ' ' + singleUser.lastName)}</Card.Text>
                        <Card.Text style={{ fontSize: '10px', color: 'gray' }}>
                            <span style={{ fontWeight: '300', color: 'gray', fontSize: '12px' }}>Year Level: {yearLevel}</span>
                            <br />
                            <span style={{ fontWeight: '300', color: 'gray', fontSize: '12px' }}>Course: {course}</span>
                            <br />
                            <span style={{ fontWeight: '300', color: 'gray', fontSize: '12px' }}>Track: {track}</span>
                            <br />
                            <span style={{ fontWeight: '300', color: 'gray', fontSize: '12px' }}>Announcement Type: {announcementType}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default AnnouncementDetails