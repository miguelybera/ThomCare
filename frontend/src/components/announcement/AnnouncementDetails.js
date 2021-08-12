import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { getAnnouncementDetails, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Accordion, ButtonGroup, Button, ButtonToolbar, DropdownButton, Dropdown, Form, FormControl, Card, Row, Col } from 'react-bootstrap'

var dateFormat = require('dateformat')

const AnnouncementDetails = ({ history, match }) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcement, error } = useSelector(state => state.announcementDetails)

    const announcementId = match.params.id

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [date, setDate] = useState('')
    
    let announcementTitle = ''
    let announcementDescription = ''
    let announcementYearLevel = ''
    let announcementCourse = ''
    let announcementTrack = ''
    let announcementDate = ''
    
    if (announcement && announcement.title) {
        announcementTitle = announcement.title
    }

    if (announcement && announcement.description) {
        announcementDescription = announcement.description
    }

    if (announcement && announcement.yearLevel) {
        announcementYearLevel = announcement.yearLevel
    }

    if (announcement && announcement.course) {
        announcementCourse = announcement.course
    }

    if (announcement && announcement.track) {
        announcementTrack = announcement.track
    }

    if (announcement && announcement.createdAt) {
        announcementDate = announcement.createdAt
    }

    
    useEffect(() => {
        if(announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        } else {
            setTitle(announcementTitle)
            setDescription(announcementDescription)
            setYearLevel(announcementYearLevel)
            setCourse(announcementCourse)
            setTrack(announcementTrack)
            setDate(announcementDate)
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, announcement, announcementId])

    function changeDateFormat(date) {
        return dateFormat(date, "ddd, mmm dS, yyyy h:mm tt")
    }

    return (
        <>
            <MetaData title={`Announcements`} />
            <Row>
                {loading ? <Loader /> : (
                    <Row xs={1} md={2} className="g-4">
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>{title}</Card.Title>
                                    <Card.Text style={{ fontSize: '12px', color: 'gray' }}>{changeDateFormat(date)}</Card.Text>
                                    <Card.Text>{description}</Card.Text>
                                    <Card.Text style={{ fontSize: '10px', color: 'gray' }}>Tags: {yearLevel}, {course}, {track}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                )}
            </Row>
        </>
    )
}

export default AnnouncementDetails