import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { getAnnouncements, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import '../../App.css'
import styled from 'styled-components'
import { Form, FormControl, Card, Row, Col, Container } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const Title = styled.h3`
background-color: #9c0b0b;
  text-align: center;
  color: white;
  padding-top: 7px;
  padding-bottom: 7px;
  margin-right: 0px;
  font-family: MuktaMalar;
  width:100%;
  position: absolute;
  z-index: 1;
  right:0;
  left:0;
`;

const Cards = styled.div`
    background-color: yellow;
    
    
  text-align: center;
  color: white;
  padding-top: 1px;
  padding-bottom: 5px;
  
  
  position: absolute;
  z-index: 1;
  
`;

const Announcements = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error, announcementCount, resPerPage, filteredAnnouncementsCount } = useSelector(state => state.announcements)

    const [currentPage, setCurrentPage] = useState(1)

    const tracks = [
        'Core Computer Science',
        'Game Development',
        'Data Science',
        'Network and Security',
        'Web and Mobile App Development',
        'IT Automation',
        'Business Analytics',
        'Service Management'
    ]

    const csTracks = [
        'Core Computer Science',
        'Game Development',
        'Data Science'
    ]

    const itTracks = [
        'Network and Security',
        'Web and Mobile App Development',
        'IT Automation'
    ]

    const isTracks = [
        'Business Analytics',
        'Service Management'
    ]

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = announcementCount


    const [filter, setFilter] = useState({
        course: '',
        yearLevel: '',
        track: '',
        annnouncementType: '',
        title: ''
    })

    const { course, yearLevel, track, annnouncementType, title } = filter

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getAnnouncements(currentPage, course, yearLevel, track, title))
        
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, currentPage, course, yearLevel, track, title])

    const onChange = e => {
        if (e.target.name === 'course') {
            let value = e.target.value
            setFilter({
                ...filter,
                [e.target.name]: value,
                track: String(value).includes('') ? '' : track
            })
        } else if (e.target.name === 'track') {
            let value = e.target.value
            setFilter({
                ...filter,
                [e.target.name]: value,
                course: csTracks.includes(value) ? 'Computer Science' : (
                    itTracks.includes(value) ? 'Information Technology' : (
                        isTracks.includes(value) ? 'Information Systems' : ''
                    )
                )
            })
        } else {
            setFilter({
                ...filter,
                [e.target.name]: e.target.value
            })
        }
    }

    function changeDateFormat(date) {
        return dateFormat(date, "dddd mmm d, yyyy h:MMtt")
    }

    function shortenDescription(description) {
        let y = description.split(' ')
        let z = description.split(' ').slice(0, 50).join(' ')

        if (y.length > 50) {
            z = z + '...'
        }

        return z
    }

    return (
        <Fragment>
            <MetaData title={`Announcements`}/>
            <Container>
                <Title>Announcements</Title>
                <Container className="space"></Container>
                <Form >
                    <Row >
                        <Col md="auto" style={{ paddingTop: "5px" }}><h7>Filters:</h7>
                        </Col>
                        <Col md="auto">
                            <Form.Group controlId="selectCourseforAnnouncement" >
                                <Form.Select aria-label="Course" size="sm" style={{ border: "2px solid black", borderRadius: "20px", margin: '5px 0' }} name="yearLevel" value={yearLevel} onChange={onChange}>
                                    <option value=''>Year Level</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="auto">
                            <Form.Group controlId="selectYearLevelforAnnouncement">

                                <Form.Select aria-label="YearLevel" size="sm" style={{ border: "2px solid black", borderRadius: "20px", margin: '5px 0' }} name="course" value={course} onChange={onChange}>
                                    <option value=''>Course</option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Information Technology">Information Technology</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="auto">
                            <Form.Group controlId="selectTrackforAnnouncement">

                                <Form.Select aria-label="ITTracks" size="sm" style={{ border: "2px solid black", borderRadius: "20px", margin: '5px 0' }} name="track" value={track} onChange={onChange}>
                                    <option value=''>Track</option>
                                    {String(course).includes('Information Systems') ? (
                                        <Fragment>
                                            {isTracks.map(track => (
                                                <option value={track}>{track}</option>
                                            ))}
                                        </Fragment>
                                    ) : (
                                        String(course).includes('Computer Science') ? (
                                            <Fragment>
                                                {csTracks.map(track => (
                                                    <option value={track}>{track}</option>
                                                ))}
                                            </Fragment>
                                        ) : (
                                            String(course).includes('Information Technology') ? (
                                                <Fragment>
                                                    {itTracks.map(track => (
                                                        <option value={track}>{track}</option>
                                                    ))}
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    {tracks.map(track => (
                                                        <option value={track}>{track}</option>
                                                    ))}
                                                </Fragment>
                                            )
                                        )
                                    )}

                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col md="auto">
                            <Form.Group controlId="selectAnnouncementTypeforAnnouncement">
                                <Form.Select aria-label="AnnouncementType" size="sm" style={{ border: "2px solid black", borderRadius: "20px", margin: '5px 0' }} name="annnouncementType" value={annnouncementType} onChange={onChange}>
                                    <option value=''>Announcement Type</option>
                                    <option value="Memorandum">Memorandum</option>
                                    <option value="Enrollment">Enrollment</option>
                                    <option value="Class Suspension">Class Suspension</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col >
                            <Form.Group controlId="searchAnnouncement" sm >
                                <FormControl
                                    type="search"
                                    placeholder="Search by title"
                                    className="mr-2"
                                    aria-label="Search by title"
                                    size="sm"
                                    name="title"
                                    value={title}
                                    onChange={onChange}
                                    width="170px"
                                    right="0px"
                                    style={{ border: "2px solid black", borderRadius: "20px", margin: '5px 0'  }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <br />

            {loading ? <Loader /> : (
                <Row xs={1} md={2} className="g-4">
                    {announcements && (announcements.length !== 0) ? announcements.map(announcement => (
                        <Col>
                            <Card style={{ borderRadius: '25px', background: '#f5f5f5' }}>
                                <Card.Body>
                                    <Card.Header style={{ background: '#f5f5f5', fontWeight: '600' }}>{announcement.title}</Card.Header>
                                    <Card.Text style={{ marginLeft: '15px' }}>
                                        <span style={{ fontWeight: '500', color: 'gray', fontSize: '12px' }}>{changeDateFormat(announcement.createdAt)}</span>
                                        <br/>
                                        <span style={{ fontSize: '14px' }}>{shortenDescription(announcement.description)}</span>
                                        <br/><br/>
                                        <span style={{ fontSize: '12px' }}><Link to={`/announcement/${announcement._id}`}>Read More &#xbb;</Link></span>
                                        <br/>
                                        <span style={{ fontWeight: '300', color: 'gray', fontSize: '12px' }}>Tags: {announcement.yearLevel}, {announcement.course}, {announcement.track}</span>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : (
                        <Col>
                            <h3 style={{ margin: '10px 0' }}>No announcements found.</h3>
                        </Col>
                    )}
                </Row>
            )}

            {resPerPage < count && (
                <div className="d-flex justify-content-center mt-5">
                    <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resPerPage}
                        totalItemsCount={announcementCount}
                        onChange={setCurrentPageNo}
                        nextPageText={'Next'}
                        prevPageText={'Prev'}
                        firstPageText={'First'}
                        lastPageText={'Last'}
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>
            )}
        </Fragment>
    )
}

export default Announcements