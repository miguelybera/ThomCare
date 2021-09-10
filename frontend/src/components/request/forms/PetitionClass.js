import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, clearErrors } from '../../../actions/courseActions'
import { saveForm } from '../../../actions/requestActions'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import { Row, Container, Button, Col, Card, Form } from 'react-bootstrap'
import PDF from './PDF'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../../constants/dashboardConstants'


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

    return (
        <Fragment>
            <MetaData title={'Add/Drop Form'} />
            {loading ? <Loader /> : !submitted ? (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px' }}>
                    <Card style={{ backgroundColor: '#9c0b0b' }}>  {/*, width: '100rem' */}
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

                                <Form.Group className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Student Number</Form.Label>
                                    <Form.Control value={user && user.studentNumber} readOnly />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridAddress2">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type='email' value={user && user.email} readOnly />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Specialization Track</Form.Label>
                                        <Form.Control type='text' value='di ko alam iset hehe' readOnly />
                                    </Form.Group>

                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Current Section</Form.Label>
                                        <Form.Control type='text' value='di ko alam iset hehe' readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Implementing Curriculum</Form.Label>
                                        <Form.Control type='text' value='di ko alam iset hehe' readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Petition for:</Form.Label>
                                        <Form.Control type='text' value='di ko alam iset basta course code' />
                                    </Form.Group>
                                </Row>



                                <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Submit</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <PDF title={`Download Add Drop Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default PetitionClass