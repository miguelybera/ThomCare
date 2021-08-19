import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Breadcrumb } from 'react-bootstrap'
import { getAnnouncementDetails, getUser, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '20px',
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
    const [date, setDate] = useState('')
    const [createdBy, setCreatedBy] = useState('')

    let announcementTitle = ''
    let announcementDescription = ''
    let announcementYearLevel = ''
    let announcementCourse = ''
    let announcementTrack = ''
    let announcementDate = ''
    let announcementCreatedBy = ''

    if (announcement && announcement.title) { announcementTitle = announcement.title }
    if (announcement && announcement.description) { announcementDescription = announcement.description }
    if (announcement && announcement.yearLevel) { announcementYearLevel = announcement.yearLevel }
    if (announcement && announcement.course) { announcementCourse = announcement.course }
    if (announcement && announcement.track) { announcementTrack = announcement.track }
    if (announcement && announcement.createdAt) { announcementDate = announcement.createdAt }
    if (announcement && announcement.createdBy) { announcementCreatedBy = announcement.createdBy }

    useEffect(() => {
        if (announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        } else {
            setTitle(announcementTitle)
            setDescription(announcementDescription)
            setYearLevel(announcementYearLevel)
            setCourse(announcementCourse)
            setTrack(announcementTrack)
            setDate(announcementDate)
            setCreatedBy(announcementCreatedBy)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, announcement, announcementId])

    useEffect(() => {
        if (announcementCreatedBy) {
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
                        <Card.Text style={{ fontWeight: 'lighter', color: 'gray', fontSize: '12px' }}>Posted on: {changeDateFormat(date)}</Card.Text>
                        <Card.Text style={{ paddingBottom: '45px' }}>{description}</Card.Text>
                        <Card.Text style={{ fontWeight: '600', color: 'gray', fontSize: '12px' }}>Posted by: {singleUser && upperCase(singleUser.firstName + ' ' + singleUser.lastName)}</Card.Text>
                        <Card.Text style={{ fontSize: '10px', color: 'gray' }}>Tags: {yearLevel}, {course}, {track}</Card.Text>
                    </Card.Body>
                </Card>
            )}
        </>
    )
}

export default AnnouncementDetails