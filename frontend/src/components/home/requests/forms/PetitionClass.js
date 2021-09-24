import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, clearErrors } from '../../../../actions/courseActions'
import { saveForm } from '../../../../actions/requestActions'
import MetaData from '../../../layout/MetaData'
import Loader from '../../../layout/Loader'
import { Row, Container, Button, Col, Card, Form, Breadcrumb } from 'react-bootstrap'
import PETITIONPDF from '../templates/PETITIONPDF'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'

function PetitionClass() {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { courses, success, error, loading } = useSelector(state => state.courses)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getCourses())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error])

    //new 
    const [inputFields, setInputFields] = useState([
        {
            status: '',
            courseCode: '',
            courseName: '',
            lecUnits: '',
            labUnits: '',
            days: '',
            time: '',
            section: ''
        }
    ])

    const onChange = (index, e) => {
        e.preventDefault()
        const values = [...inputFields]

        values[index][e.target.name] = e.target.value

        if (values[index]["courseCode"] !== '') {
            values[index]["courseName"] = getCourseName(values[index]["courseCode"], "courseName")
            values[index]["labUnits"] = getCourseName(values[index]["courseCode"], "labUnits")
            values[index]["lecUnits"] = getCourseName(values[index]["courseCode"], "lecUnits")
        } else {
            values[index]["courseName"] = ''
            values[index]["labUnits"] = ''
            values[index]["lecUnits"] = ''
        }
        setInputFields(values)
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = {
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName ? user.middleName : 'N/A',
            studentNumber: user.studentNumber,
            email: user.email,
            course: user.course,
            addDrop: inputFields
        }

        setSubmitted(true)

        dispatch(saveForm(formData))
    }

    const addRow = () => {
        setInputFields([...inputFields, {
            status: '',
            courseCode: '',
            courseName: '',
            lecUnits: '',
            labUnits: '',
            days: '',
            time: '',
            section: ''
        }])
    }

    const deleteRow = (index) => {
        const values = [...inputFields]

        values.splice(index, 1)

        setInputFields(values)
    }

    const getCourseName = (code, field) => {
        const val = courses.find(course => course.courseCode === code)

        switch (field) {
            case "courseName":
                return val.courseName
            case "lecUnits":
                return val.lecUnits
            case "labUnits":
                return val.labUnits
        }
    }

    const [submitted, setSubmitted] = useState(false)

    const csTracks = [
        "Core Computer Science",
        "Game Development",
        "Data Science"
    ]

    const itTracks = [
        "Network and Security",
        "Web and Mobile App Development",
        "IT Automation"
    ]

    const isTracks = [
        "Business Analytics",
        "Service Management"
    ]

    const title = 'Petition Classes'

    return (
        <Fragment>
            <MetaData title={title} />
            {loading ? <Loader /> : !submitted ? (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px', paddingTop: '40px' }}>
                    <Card style={{ backgroundColor: '#9c0b0b' }}>  {/*, width: '100rem' */}
                        <Card.Header style={{ backgroundColor: 'white', textColor: '#919191' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to='/forms/list'>Generate Forms</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>PETITION CLASS FORM</Card.Title>

                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form style={{ color: 'white' }} onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={user && user.firstName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={user && user.lastName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="S." value={user && user.middleName ? user.middleName : 'N/A'} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridAddress1">
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control value={user && user.studentNumber} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridAddress2">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={user && user.email} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3">
                                        <Form.Label>Specialization Track</Form.Label>
                                        <Form.Select aria-label="Default select example" required>
                                            {user.course === 'Computer Science' ? (
                                                <Fragment>
                                                    {csTracks.map(track => (
                                                        <option value={track}>{track}</option>
                                                    ))}
                                                </Fragment>
                                            ) : (
                                                user.course === 'Information Technology' ? (
                                                    <Fragment>
                                                        {itTracks.map(track => (
                                                            <option value={track}>{track}</option>
                                                        ))}
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        {isTracks.map(track => (
                                                            <option value={track}>{track}</option>
                                                        ))}
                                                    </Fragment>
                                                )
                                            )}
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Implementing Curriculum</Form.Label>
                                        <Form.Control type="text" placeholder="2013/2018/2020" readOnly />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Current Section</Form.Label>
                                        <Form.Control type='text' placeholder='4ITF' readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Petition for:</Form.Label>
                                        <Form.Control type='text' placeholder='Course Code' />
                                    </Form.Group>
                                </Row>



                                <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Generate Form</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <PETITIONPDF title={`Download Petition Class Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default PetitionClass