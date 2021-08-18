import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { getAnnouncements, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Accordion, ButtonGroup, Button, ButtonToolbar, DropdownButton, Dropdown, Form, FormControl, Card, Row, Col, Container } from 'react-bootstrap'

var dateFormat = require('dateformat')

const titles = {
    width: '10px',
    color: 'white',
    paddingTop: '160px',
    paddingBottom: '10px'
}

const rectangle = {
    width:'100%',
    height:'18%',                   /* gran changed this from 22 > 18 */
    background: '#9c0b0b',
    textAlign: 'center',
    color: 'white',
    position:'absolute',
    fontFamily: 'Mukta Malar',
    fontWeight: '500',
    paddingTop: '100px',
    paddingRight: '50px',
    zIndex: -1,
    top: 0,
    left: 0
}

const Announcements = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error, announcementCount, resPerPage, filteredAnnouncementsCount } = useSelector(state => state.announcements)

    const [currentPage, setCurrentPage] = useState(1)

    const category = []

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

    /**
     * if(category) {
     *      count = filteredAnnouncementsCount
     * }
     */

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getAnnouncements(currentPage, course, yearLevel, track, title))

    }, [dispatch, alert, error, currentPage, course, yearLevel, track, title])

    const onChange = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }

    function changeDateFormat(date) {
        return dateFormat(date, "ddd, mmm dS, yyyy h:mm tt")
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
        <>
            <MetaData title={`Announcements`} />
            <Container style={titles}>
                <div style={rectangle}>
                    <h3>Announcements</h3>
                </div>
            </Container>
            <Container>
                <Form>
                    <Row xs="auto">
                        <Col sm>
                            <Form.Group controlId="selectYearLevelforAnnouncement">
                                <Form.Label>Year Level</Form.Label>
                                <Form.Select aria-label="YearLevel" size="sm" name="yearLevel" value={yearLevel} onChange={onChange} required>
                                    <option value=''>-</option>
                                    <option value="1st Year">1st Year</option>
                                    <option value="2nd Year">2nd Year</option>
                                    <option value="3rd Year">3rd Year</option>
                                    <option value="4th Year">4th Year</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId="selectCourseforAnnouncement">
                                <Form.Label>Course</Form.Label>
                                <Form.Select aria-label="Course" size="s" name="course" value={course} onChange={onChange} required>
                                    <option value=''></option>
                                    <option value="Computer Science">Computer Science</option>
                                    <option value="Information Systems">Information Systems</option>
                                    <option value="Information Technology">Information Technology</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId="selectTrackforAnnouncement">
                                <Form.Label>Track</Form.Label>
                                <Form.Select aria-label="ITTracks" size="sm" name="track" value={track} onChange={onChange} required>
                                    <option value=''>-</option>
                                    <option value="Web and Mobile Development">Web and Mobile Development</option>
                                    <option value="Network and Security">Network and Security</option>
                                    <option value="IT Automation">IT Automation</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId="selectAnnouncementTypeforAnnouncement">
                                <Form.Label>Announcement Type</Form.Label>
                                <Form.Select aria-label="AnnouncementType" size="sm" name="annnouncementType" value={annnouncementType} onChange={onChange} required>
                                    <option value=''>-</option>
                                    <option value="Memorandum">Memorandum</option>
                                    <option value="Enrollment">Enrollment</option>
                                    <option value="Class Suspension">Class Suspension</option>
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col sm>
                            <Form.Group controlId="seachAnnouncement" xs={2}>
                                <Form.Label>Search by title</Form.Label>
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    className="mr-2"
                                    aria-label="Search"
                                    size="sm"
                                    name="title"
                                    value={title}
                                    onChange={onChange}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>
            </Container>
            <Row>
                {loading ? <Loader /> : (
                    <Row xs={1} md={2} className="g-4">
                        {announcements && (announcements.length !== 0) ? announcements.map(announcement => (
                            <Col style={{marginBottom: '20px'}}>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{announcement.title}</Card.Title>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}>{changeDateFormat(announcement.createdAt)}</Card.Text>
                                        <Card.Text>{shortenDescription(announcement.description)}</Card.Text>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}><Link to={`/announcement/${announcement._id}`}>Read More &#xbb;</Link></Card.Text>
                                        <Card.Text style={{ fontSize: '10px', color: 'gray' }}>Tags: {announcement.yearLevel}, {announcement.course}, {announcement.track}</Card.Text>
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
            </Row>
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
        </>
    )
}

export default Announcements