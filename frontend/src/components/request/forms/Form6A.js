import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, clearErrors } from '../../../actions/courseActions'
import { saveForm } from '../../../actions/requestActions'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import { Row, Container, Button, Col, Card, Form, Breadcrumb } from 'react-bootstrap'
import FORM6APDF from '../templates/FORM6APDF'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../../constants/dashboardConstants'


function Form6A({ history }) {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { courses, success, error, loading } = useSelector(state => state.courses)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getCourses())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/forms/list')
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, history])

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
            room: '',
            section: ''
        }
    ])

    const [term, setTerm] = useState('')
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')

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
            addDrop: inputFields,
            term,
            year1,
            year2
        }

        setSubmitted(!submitted)

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
            room: '',
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

    const title = 'Add/Drop Course Form'

    const [submitted, setSubmitted] = useState(false)

    return (
        <Fragment>
            <MetaData title={title} />
            {loading ? <Loader /> : !submitted ? (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px', paddingTop: '40px' }}>
                    <Card style={{ backgroundColor: '#fff', width: '90%' }}>  {/*, width: '100rem', backgroundColor: '#9c0b0b' */}
                        <Card.Header style={{ backgroundColor: 'white', textColor: '#919191' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to='/forms/list'>Generate Forms</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold', textAlign: 'center' }}>ADD / DROP COURSE FORM</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form style={{ color: 'black' }} onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={user && user.firstName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="S." value={user && user.middleName ? user.middleName[0] : 'N/A'} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={user && user.lastName} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control value={user && user.studentNumber} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col}>
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>

                                    <Row as={Col}>
                                        <Form.Group as={Col} className="mb-3">
                                            <Form.Label>Email address</Form.Label>
                                            <Form.Control type='email' value={user && user.email} readOnly />
                                        </Form.Group>
                                    </Row>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col}>
                                        <Form.Label>Term</Form.Label>
                                        <Form.Control type="text" placeholder="1st" value={term} onChange={e => setTerm(e.target.value)} required />
                                    </Form.Group>

                                    <Row as={Col}>
                                        <Row>
                                            <Form.Group as={Col}>
                                                <Form.Label>Academic Year </Form.Label>
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Col xs={1}>
                                                <Form.Label>20</Form.Label>
                                            </Col>
                                            <Col xs={2}>
                                                <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year1} onChange={e => setYear1(e.target.value)} required />
                                            </Col>
                                            <Col xs={1}>
                                                <Form.Label>-20</Form.Label>
                                            </Col>
                                            <Col xs={2}>
                                                <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year2} onChange={e => setYear2(e.target.value)} required />
                                            </Col>
                                        </Row>
                                    </Row>
                                </Row>

                                <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Courses to Add / Drop</Card.Title>
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
                                            room = `room-${idx}`,
                                            section = `section-${idx}`

                                        return (
                                            <Fragment key={val.index}>

                                                <Row style={{ fontWeight: 'bold' }}>
                                                    <Col xs={2}>
                                                        <Form.Label>Add/Drop</Form.Label>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Label>Course ID</Form.Label>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Form.Label>Course Name</Form.Label>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Label>Lec Units</Form.Label>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Label>Lab Units</Form.Label>
                                                    </Col>
                                                </Row>
                                                <Row className="mb-2" >
                                                    <Col xs={2}>
                                                        <Form.Select aria-label="Default select example" name="status" id={status} data-id={idx} value={val.status} onChange={e => onChange(idx, e)} required>
                                                            <option value=''>-</option>
                                                            <option value="Add">Add</option>
                                                            <option value="Drop">Drop</option>
                                                        </Form.Select>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Select aria-label="Default select example" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(idx, e)} required>
                                                            <option value=''>-</option>
                                                            {courses && courses.map(course => (
                                                                <option value={course.courseCode}>{course.courseCode}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Col>
                                                    <Col xs={4}>
                                                        <Form.Control type="text" placeholder="Theology 1" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(idx, e)} readOnly />
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Control type="number" placeholder="3Lec" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(idx, e)} readOnly />
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Form.Control type="number" placeholder="3Lec" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(idx, e)} readOnly />
                                                    </Col>
                                                </Row>
                                                <Row className="mb-3" >
                                                    <Row style={{ fontWeight: 'bold' }}>
                                                        <Col xs={2}>
                                                            <Form.Label>Days</Form.Label>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Form.Label>Time</Form.Label>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Form.Label>Room</Form.Label>
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Form.Label>Section</Form.Label>
                                                        </Col>
                                                        <Col xs={1}>
                                                            <Form.Label>+/-</Form.Label>
                                                        </Col>
                                                    </Row>
                                                    <Row className="mb-3">
                                                        <Col xs={2}>
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
                                                        </Col>
                                                        <Col xs={3}><Form.Control type="text" placeholder="3:00PM - 5:00PM" name="time" id={time} data-id={idx} value={val.time} onChange={e => onChange(idx, e)} required />
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Form.Control type="text" placeholder="Room number" name="room" id={room} data-id={idx} value={val.room} onChange={e => onChange(idx, e)} required />
                                                        </Col>
                                                        <Col xs={3}>
                                                            <Form.Control type="text" placeholder="4ITF" name="section" id={section} data-id={idx} value={val.section} onChange={e => onChange(idx, e)} required />
                                                        </Col>
                                                        <Col xs={1} style={{ textAlign: 'right' }}>
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
                                                        </Col>
                                                    </Row>
                                                </Row>
                                            </Fragment>
                                        )
                                    }
                                    )
                                }

                                <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Generate Form</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <FORM6APDF title={`Download Add Drop Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default Form6A