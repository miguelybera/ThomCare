import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getAnnouncementDetails, getUser, clearErrors } from './../../../actions/announcementActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
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
    const { singleUser, error: userError } = useSelector(state => state.singleUser)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [createdBy, setCreatedBy] = useState('')
    const [fileAttachments, setFileAttachments] = useState([])

    const announcementId = match.params.id

    const changeDateFormat = (date) => dateFormat(date, "ddd, mmm d, yyyy h:MMtt")
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
            setCreatedBy(announcement.createdBy)
            setCreatedAt(announcement.createdAt)
            setFileAttachments(announcement.fileAttachments)
        } else {
            dispatch(getAnnouncementDetails(announcementId))
        }

        // dispatch(getAnnouncementDetails(announcementId))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/')
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, history, alert, error, announcement, announcementId])

    // useEffect(() => {
    //     if (announcement) {
    //         setTitle(announcement.title)
    //         setDescription(announcement.description)
    //         setYearLevel(announcement.yearLevel)
    //         setCourse(announcement.course)
    //         setTrack(announcement.track)
    //         setCreatedBy(announcement.createdBy)
    //         setCreatedAt(announcement.createdAt)
    //         setFileAttachments(announcement.fileAttachments)
    //     }

    //     if (fileAttachments) {
    //         fileAttachments.forEach(file => {
    //             if (file.mimetype.includes('image/')) {
    //                 setImages(prev => [...prev, file])
    //             } else {
    //                 setFiles(prev => [...prev, file])
    //             }
    //         })
    //     }
    // }, [announcement, announcementId])

    useEffect(() => {
        if (createdBy) {
            dispatch(getUser(createdBy))
        }

        if (userError) {
            alert.error(userError)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, userError, createdBy])

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
                        <Card.Text style={{ paddingBottom: '45px' }}>{description}</Card.Text>
                        <Card.Text>
                            {fileAttachments.length !== 0 && (<p>Attachments:</p>)}
                            <ListGroup variant="flush">
                                {fileAttachments && fileAttachments.map((file, index) => {
                                    if (file.mimetype.includes('image/')) {
                                        return (<Fragment>
                                            <center>
                                                <img src={file.path} style={{ width: '500px' }} alt={`img ${index + 1}`}></img>
                                                <p>{file.originalname}</p>
                                            </center>
                                        </Fragment>)
                                    } else {
                                        return ((
                                            <ListGroupItem>
                                                {file.originalname} <font size="1rem">{Number(file.size / 1000000).toFixed(2)} MB</font> <a href={file.path} target="_blank" rel="noreferrer">
                                                    <button className="btn btn-primary py-1 px-2 ml-2">
                                                        <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                                    </button>
                                                </a>
                                            </ListGroupItem>
                                        ))
                                    }
                                })}
                            </ListGroup>
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