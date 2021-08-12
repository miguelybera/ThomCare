import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { getAnnouncements, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Accordion, ButtonGroup, Button, ButtonToolbar, DropdownButton, Dropdown, Form, FormControl, Card, Row, Col } from 'react-bootstrap'

var dateFormat = require('dateformat')

const Announcements = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error, announcementCount, resPerPage, filteredAnnouncementsCount } = useSelector(state => state.announcements)

    const [currentPage, setCurrentPage] = useState(1)

    const [search, setSearch] = useState('')
    const [readMore, setReadMore] = useState(false)

    const category = []

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = announcementCount


    const [filter, setFilter] = useState({
        course: '',
        yearLevel: '',
        track: '',
        annnouncementType: ''
    })

    const { course, yearLevel, track, annnouncementType } = filter

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

        dispatch(getAnnouncements(currentPage, course, yearLevel, track))
        
    }, [dispatch, alert, error, currentPage, course, yearLevel, track])

    function searchKeyword() {
        console.log('search clicked')
    }

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

        if(y.length > 50 ) {
            z = z + '...'
        }

        return z
    }

    return (
        <>
            <MetaData title={`Announcements`} />
            <h1> Announcements </h1>
            <Form>
                <Row>
                    <Form.Group as={Col} xs={2} controlId="selectCourseforAnnouncement">
                        <Form.Label>Course</Form.Label>
                        <Form.Select aria-label="Course" size="sm" name="course" value={course} onChange={onChange} required>
                            <option value=''>-</option>
                            <option value="Computer Science">Computer Science</option>
                            <option value="Information Systems">Information Systems</option>
                            <option value="Information Technology">Information Technology</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={2} controlId="selectYearLevelforAnnouncement">
                        <Form.Label>Year Level</Form.Label>
                        <Form.Select aria-label="YearLevel" size="sm" name="yearLevel" value={yearLevel} onChange={onChange} required>
                            <option value=''>-</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={3} controlId="selectTrackforAnnouncement">
                        <Form.Label>Track</Form.Label>
                        <Form.Select aria-label="ITTracks" size="sm" name="track" value={track} onChange={onChange} required>
                            <option value=''>-</option>
                            <option value="WMD">Web and Mobile Development</option>
                            <option value="NS">Network Security</option>
                            <option value="ITA">IT Automation</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} xs={2} controlId="selectAnnouncementTypeforAnnouncement">
                        <Form.Label>Announcement Type</Form.Label>
                        <Form.Select aria-label="AnnouncementType" size="sm" name="annnouncementType" value={annnouncementType} onChange={onChange} required>
                            <option value=''>-</option>
                            <option value="Memorandum">Memorandum</option>
                            <option value="Enrollment">Enrollment</option>
                            <option value="Class Suspension">Class Suspension</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} controlId="seachAnnouncement" xs={2}>
                        <Form.Label>Search title</Form.Label>
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                            size="sm"
                            name="search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success" xs={1} onClick={() => searchKeyword()}>Search</Button>
                    </Form.Group>
                </Row>
            </Form>

            <Row>
                {loading ? <Loader /> : (
                    <Row xs={1} md={2} className="g-4">
                        {announcements && (announcements.length !== 0) ? announcements.map(announcement => (
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{announcement.title}</Card.Title>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}>{changeDateFormat(announcement.createdAt)}</Card.Text>
                                        <Card.Text>{shortenDescription(announcement.description)}</Card.Text>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}><Link to={`/announcement/${announcement._id}`}>Read More</Link></Card.Text>
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