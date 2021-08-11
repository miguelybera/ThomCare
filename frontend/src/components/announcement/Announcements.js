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

    /**
     * filter code here
     * const [x, setX] = useState('')
     * 
     * const category = []
     */

    function setCurrentPageNo(pageNumber) {
        setCurrentPage(pageNumber)
    }

    let count = announcementCount

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

        dispatch(getAnnouncements())
    }, [dispatch, alert, error])

    return (
        <>
            <MetaData title={`Announcements`} />
            <h1> Announcements </h1>
            <Row>
                <Col col-md-15>
                    <ButtonToolbar aria-label="Toolbar with button groups" size="sm">
                        <ButtonGroup className="me-2" aria-label="Course">
                            <p> Filters: </p>
                            <DropdownButton as={ButtonGroup} title="Course" id="bg-nested-dropdown" variant="outline-dark" >
                                <Dropdown.Item eventKey="1">Computer Science</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Information Systems</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Information Technology</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="Year Level">
                            <DropdownButton as={ButtonGroup} title="Year Level" id="bg-nested-dropdown" variant="outline-dark" >
                                <Dropdown.Item eventKey="1">First Year</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Second Year</Dropdown.Item>
                                <Dropdown.Item eventKey="1">Third Year</Dropdown.Item>
                                <Dropdown.Item eventKey="2">Fourth Year</Dropdown.Item>
                            </DropdownButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="Track">
                            <DropdownButton as={ButtonGroup} title="Track" id="bg-nested-dropdown" variant="outline-dark" >
                            </DropdownButton>
                        </ButtonGroup>
                        <ButtonGroup className="me-2" aria-label="Announcement Type">
                            <DropdownButton as={ButtonGroup} title="Announcement Type" id="bg-nested-dropdown" variant="outline-dark" >
                            </DropdownButton>
                        </ButtonGroup>
                    </ButtonToolbar>
                </Col>
                <Col xs={3} col-auto>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="mr-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-success">Search</Button>
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
                                        <Card.Text style={{fontSize: '12px', color: 'gray'}}>{announcement.createdAt}</Card.Text>
                                        <Card.Text style={{fontSize: '12px', color: 'gray'}}>Year Level: {announcement.yearLevel}</Card.Text>
                                        <Card.Text style={{fontSize: '12px', color: 'gray'}}>Course: {announcement.course} Track: {announcement.track}</Card.Text>
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