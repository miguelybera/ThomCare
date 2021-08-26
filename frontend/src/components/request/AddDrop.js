import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCourses, clearErrors } from './../../actions/courseActions'
import { Table, Row, InputGroup, FormControl, Container, Button, Col, Card, Form, ListGroup } from 'react-bootstrap'

const AddDrop = (course) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    console.log(course)
    const [courseName, setCourseName] = useState('')
    const [lecUnits, setLecUnits] = useState('')
    const [labUnits, setLabUnits] = useState('')
    const [courseCode, setCourseCode] = useState('')

    useEffect(() => {
        setCourseName(course.courseName)
        setLecUnits(course.lecUnits)
        setLabUnits(course.labUnits)
        setCourseCode(course.courseCode)
    }, [course, dispatch, alert])

    return (
        <Fragment>
            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Course Name</Form.Label>
                <Form.Control type="text" placeholder="Theology 1" value={courseName} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Lecture Units</Form.Label>
                <Form.Control type="text" placeholder="3Lec" value={lecUnits} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Lab Units</Form.Label>
                <Form.Control type="text" placeholder="14 Days" value={labUnits} />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Days</Form.Label>
                <Form.Control type="number" placeholder="14 Days" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Time</Form.Label>
                <Form.Control type="text" placeholder="3:00PM - 5:00PM" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Section</Form.Label>
                <Form.Control type="text" placeholder="4ITF" />
            </Form.Group>
        </Fragment>
    )
}

export default AddDrop