import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pagination from 'react-js-pagination'
import { getAnnouncements, clearErrors } from './../../actions/announcementActions'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Accordion, ButtonGroup, Button, ButtonToolbar, DropdownButton, Dropdown, Form, FormControl, Card, Row, Col } from 'react-bootstrap'

const Announcements = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, announcements, error, announcementCount, resPerPage, filteredAnnouncementsCount } = useSelector(state => state.announcements)

    const [currentPage, setCurrentPage] = useState(1)

    const [search, setSearch] = useState('')

    const category = []

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = announcementCount


    const [filter, setFilter] = useState({
        course: '',
        yearLevel: '',
        track: ''
    })

    const { course, yearLevel, track } = filter

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
        console.log(yearLevel)
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

    return (
        <>
            <MetaData title={`Announcements`} />
            <h1> Announcements </h1>
            <Row>
                <Col col-md-15>
                    <Form>
                        <p> Filters: </p>
                        <Form.Group className="mb-3" controlId="formGridCourse">
                            <Form.Label>Course/Program</Form.Label>
                            <Form.Select aria-label="Default select example" name="course" value={course} onChange={onChange} required>
                                <option value=''>-</option>
                                <option value="Computer Science">Computer Science</option>
                                <option value="Information Systems">Information Systems</option>
                                <option value="Information Technology">Information Technology</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridCourse">
                            <Form.Label>Year Level</Form.Label>
                            <Form.Select aria-label="Default select example" name="yearLevel" value={yearLevel} onChange={onChange} required>
                                <option value=''>-</option>
                                <option value="1st Year">1st Year</option>
                                <option value="2nd Year">2nd Year</option>
                                <option value="3rd Year">3rd Year</option>
                                <option value="4th Year">4th Year</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formGridCourse">
                            <Form.Label>Track</Form.Label>
                            <Form.Select aria-label="Default select example" name="track" value={track} onChange={onChange} required>
                                <option value=''>-</option>
                                <option value="Network and Security">Network and Security</option>
                                <option value="All">All</option>
                                <option value="Information Technology">Information Technology</option>
                            </Form.Select>
                        </Form.Group>
                    </Form>
                </Col>
                <Col xs={3} col-auto>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                        />
                        <Button variant="outline-success" onClick={() => searchKeyword()}>Search</Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                {loading ? <Loader /> : (
                    <Row xs={1} md={2} className="g-4">
                        {announcements && (announcements.length !== 0) ? announcements.map(announcement => (
                            <Col>
                                <Card>
                                    <Card.Body>
                                        <Card.Title>{announcement.title}</Card.Title>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}>{announcement.createdAt}</Card.Text>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}>Year Level: {announcement.yearLevel}</Card.Text>
                                        <Card.Text style={{ fontSize: '12px', color: 'gray' }}>Course: {announcement.course} Track: {announcement.track}</Card.Text>
                                        <Card.Text>{announcement.description}</Card.Text>
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