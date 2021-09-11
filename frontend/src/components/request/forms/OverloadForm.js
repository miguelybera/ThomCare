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


function OverloadForm() {
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
            default:
                return
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
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold', textAlign: 'center' }}>REQUEST FOR STUDY OVERLOAD FORM (MAKE 3 COPIES)</Card.Title>
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
                                    <Form.Label>Course/Program</Form.Label>
                                    <Form.Control type="text" value={user && user.course} readOnly />
                                </Form.Group>

                                <Row className="mb-3">
                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={user && user.email} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Curriculum Year</Form.Label>
                                        <Form.Control type='text' placeholder="2021" />
                                    </Form.Group>

                                    <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                        <Form.Label>Term</Form.Label>
                                        <Form.Control type='text' placeholder="2021 - 2022" />
                                    </Form.Group>
                                </Row>

                                <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Load Requested For Approval:</Card.Title>

                                <Row className="mb-3">

                                    <Form.Group as={Col}>
                                        <Form.Label>Course Name</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Units</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Days</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Time</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Section</Form.Label>
                                    </Form.Group>
                                </Row>

                                {
                                    inputFields.map((val, idx) => {
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
                                                        <Form.Control type="text" placeholder="Theology 1" name="courseName" />
                                                    </Form.Group>


                                                    <Form.Group as={Col}>
                                                        <Form.Control type="number" placeholder="3 units" name="labUnits" />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                        <Form.Select aria-label="Default select example" placeholder='M' name="days" id={days} data-id={idx} value={val.days} onChange={e => onChange(idx, e)} required >
                                                            <option value=''>-</option>
                                                            <option value='M'>M</option>
                                                            <option value='T'>T</option>
                                                            <option value='W'>W</option>
                                                            <option value='Th'>Th</option>
                                                            <option value='F'>F</option>
                                                            <option value='S'>S</option>
                                                            <option value='Su'>Su</option>
                                                        </Form.Select>
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                        <Form.Control type="text" placeholder="3:00PM - 5:00PM" name="time" id={time} data-id={idx} value={val.time} onChange={e => onChange(idx, e)} required />
                                                    </Form.Group>

                                                    <Form.Group as={Col}>
                                                        <Form.Control type="text" placeholder="4ITF" name="section" id={section} data-id={idx} value={val.section} onChange={e => onChange(idx, e)} required />
                                                    </Form.Group>

                                                    {
                                                        idx === 0 ? (
                                                            <Button variant='primary' onClick={() => addRow()} style={{ width: '40px' }}>
                                                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            </Button>

                                                        ) : (
                                                            <Button variant='danger' onClick={() => deleteRow(idx)} style={{ width: '40px' }}>
                                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                                            </Button>
                                                        )
                                                    }
                                                </Row>
                                            </Fragment>
                                        )
                                    }
                                    )
                                }

                                <Card.Title style={{ margin: '30px 0 20px 0', color: 'white', fontWeight: 'bold' }}>SPECIAL TERM LOAD   (if special term graduate):</Card.Title>

                                <Row className="mb-3">

                                    <Form.Group as={Col}>
                                        <Form.Label>Course Name</Form.Label>
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Units</Form.Label>
                                    </Form.Group>

                                </Row>

                                {
                                    inputFields.map((val, idx) => {
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
                                                        <Form.Control type="text" placeholder="Theology 1" name="courseName" />
                                                    </Form.Group>


                                                    <Form.Group as={Col}>
                                                        <Form.Control type="number" placeholder="3 units" name="labUnits" />
                                                    </Form.Group>

                                                    {
                                                        idx === 0 ? (
                                                            <Button variant='primary' onClick={() => addRow()} style={{ width: '40px' }}>
                                                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            </Button>

                                                        ) : (
                                                            <Button variant='danger' onClick={() => deleteRow(idx)} style={{ width: '40px' }}>
                                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                                            </Button>
                                                        )
                                                    }
                                                </Row>
                                            </Fragment>
                                        )
                                    }
                                    )
                                }

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" style={{ margin: '30px 0 20px 0', color: 'white', fontWeight: 'bold' }}>
                                    <Form.Label column sm="2">
                                        TENTATIVE DATE OF GRADUATION:
                                    </Form.Label>
                                    <Col sm="">
                                        <Form.Control type="text" placeholder="May 2022" />
                                    </Col>

                                </Form.Group>

                                <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Generate Form</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>

                    <center> <h3 style={{ fontWeight: 'bold', marginTop: '20px' }}>General Instructions:</h3> </ center>
                    <Row className="mb-3" style={{ display: 'flex', flexDirection: 'row', margin: '20px 0px 0px 50px' }}>
                        <ul>
                            <li>The Overload Form should be printed in triplicate copies.</li>
                            <ul>
                                <li>First copy for the Office of the Registrar</li>
                                <li>Second copy for the Office of the Dean/Department Chair</li>
                                <li>Third copy for the student</li>
                            </ul>
                            <li>Fill out the form legibly with all the required information</li>
                            <li>Have the approval of the Department Chair and the Dean</li>
                            <li>Submit the form to the Office of the Registrar for Approval</li>
                            <li>Once approve you may procced to the Department chair for advising of the approved
                                overload course.</li>
                        </ul>
                        <p>Note: Overload Form</p>
                        <ul>
                            <li>As stipulated in the UST Handbook (PPS No. 1012)</li>
                            <ul>
                                <li>Graduating student is limited only to six (6) units of overload for the
                                    Academic Year.</li>
                                <li>Non-graduating students, upon the endorsement of the Dean, may carry a
                                    maximum overload of three (3) units in an academic year for the purpose of
                                    being on a regular track in the succeeding year level.</li>
                            </ul>
                        </ul>
                    </Row>
                </Container>
            ) : (
                <PDF title={`Download Add Drop Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default OverloadForm