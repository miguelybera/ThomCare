import React from 'react'
import { Accordion, ButtonGroup, Button, ButtonToolbar, DropdownButton, Dropdown, Form, FormControl, Card, Row, Col } from 'react-bootstrap'

const Announcements = () => {
    return (
        <>
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
                <Row xs={1} md={2} className="g-4">
                    {Array.from({ length: 8 }).map((_, idx) => (
                        <Col>
                            <Card>
                                <Card.Body>
                                    <Card.Title>Card title</Card.Title>
                                    <Card.Text>
                                        This is a longer card with supporting text below as a natural
                                        lead-in to additional content. This content is a little bit longer.
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Row>
        </>
    )
}

export default Announcements