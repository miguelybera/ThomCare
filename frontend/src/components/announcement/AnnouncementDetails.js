import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb } from 'react-bootstrap'
import { getAnnouncementDetails, getUser, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const cardStyle = {
    margin: '20px',
    width: '75%',
    align: 'center',
    border: 'solid 0.69px gray'
    
}

const AnnouncementDetails = ({ history, match }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcement, error } = useSelector(state => state.announcementDetails)
    const { singleUser } = useSelector(state => state.singleUser)

    const announcementId = match.params.id

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [fileAttachments, setFileAttachments] = useState([])
    const [files, setFiles] = useState([])
    const [images, setImages] = useState([])

    useEffect(() => {
        if (announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        } else if (announcement) {
            setTitle(announcement.title)
            setDescription(announcement.description)
            setYearLevel(announcement.yearLevel)
            setCourse(announcement.course)
            setTrack(announcement.track)
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

        if (fileAttachments) {
            fileAttachments.forEach(file => {
                if (file.mimetype.includes('image/')) {
                    setImages(oldArray => [...oldArray, file])
                } else {
                    setFiles(oldArray => [...oldArray, file])
                }
            })
        }
    }, [dispatch, history, alert, error, announcement, announcementId])

    useEffect(() => {
        if (createdBy) {
            dispatch(getUser(createdBy))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, createdBy, announcement, announcementId])

    const changeDateFormat = (date) => dateFormat(date, "ddd, mmm d, yyyy h:MMtt")
    const upperCase = (name) => name.toUpperCase()

    return (
        <>
            <MetaData title={`Announcements`} />
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
                        <Card.Text style={{ paddingBottom: '45px' }}>{description}</Card.Text>
                        <Card.Text>
                            {images && images.map(file => (
                                <Fragment>
                                    <center>
                                        <img src={file.path} style={{ width: '500px' }}></img>
                                        <p>{file.originalname}</p>
                                    </center>
                                </Fragment>
                            ))}
                            {files && (<p>Attachments:</p>)}
                            <ul>
                                {files && files.map(file => (
                                    <Fragment>
                                        <li><a href={file.path}>{file.originalname} <i class="fa fa-download" aria-hidden="true"></i></a> Size: {file.size / 1000} Kb</li>
                                    </Fragment>
                                ))}
                            </ul>
                        </Card.Text>
                        <Card.Text style={{ fontWeight: '600', color: 'gray', fontSize: '12px' }}>Posted by: {singleUser && upperCase(singleUser.firstName + ' ' + singleUser.lastName)}</Card.Text>
                        <Card.Text style={{ fontSize: '10px', color: 'gray' }}>Tags: {yearLevel}, {course}, {track}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default AnnouncementDetails