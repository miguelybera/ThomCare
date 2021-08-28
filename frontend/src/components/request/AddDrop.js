import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row, InputGroup, FormControl, Container, Button, Col, Card, Form, ListGroup } from 'react-bootstrap'

function AddDrop(props) {

    return (
        props.addDropList.map((val, idx) => {
            //set unique id per row
            let status = `status-${idx}`,
                courseCode = `courseCode-${idx}`,
                courseName = `courseName-${idx}`,
                lecUnits = `lecUnits-${idx}`,
                labUnits = `labUnits-${idx}`,
                days = `days-${idx}`,
                time = `time-${idx}`,
                section = `section-${idx}`

            return (
                <Fragment>
                    <Row className="mb-3" key={val.index}>
                        <Form.Group as={Col}>
                            <Form.Select aria-label="Default select example" name="status" id={status} data-id={idx}>
                                <option>-</option>
                                <option value="Add">Add</option>
                                <option value="Drop">Drop</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="ICS2021/IT2021" name="courseCode" id={courseCode} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="Theology 1" name="courseName" id={courseName} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="number" placeholder="3Lec" name="lecUnits" id={lecUnits} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="number" placeholder="3Lec" name="labUnits" id={labUnits} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="number" placeholder="14 Days" name="days" id={days} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="3:00PM - 5:00PM" name="time" id={time} data-id={idx} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Control type="text" placeholder="4ITF" name="section" id={section} data-id={idx} />
                        </Form.Group>

                        {
                            idx === 0 ? (
                                <Button variant='primary' onClick={() => props.add()} style={{ width: '40px' }}>
                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                </Button>

                            ) : (
                                <Button variant='danger' onClick={() => props.delete(val)} style={{ width: '40px' }}>
                                    <i className="fa fa-minus" aria-hidden="true"></i>
                                </Button>
                            )
                        }
                    </Row>
                </Fragment>
            )
        }
        )
    )
}

export default AddDrop