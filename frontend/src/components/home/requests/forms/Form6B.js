import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, clearErrors } from '../../../../actions/courseActions'
import { saveForm } from '../../../../actions/requestActions'
import MetaData from '../../../layout/MetaData'
import Loader from '../../../layout/Loader'
import { FloatingLabel, Row, Container, Button, Col, Card, Form, Breadcrumb } from 'react-bootstrap'
import FORM6BPDF from '../templates/FORM6BPDF'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'

const addDropStyle = {
    marginBottom: '5px'
}

function Form6B() {
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
        }
    }

    const title = 'Cross-Enrollment Form'

    const [submitted, setSubmitted] = useState(false)

    return (
        <Fragment>
            <MetaData title={title} />
            {loading ? <Loader /> : !submitted ? (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px', paddingTop: '40px' }}>
                    <Card style={{ backgroundColor: '#fff', width: '100%' }}>  {/*, width: '100rem' */}
                        <Card.Header style={{ backgroundColor: 'white', textColor: '#919191' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to='/forms/list'>Generate Forms</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Card.Header>
                        <Card.Body>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold', textAlign: 'center' }}>CROSS ENROLLMENT (WITHIN CICS) FORM</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'black', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form style={{ color: 'black' }} onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} sm={12} md={4}>
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={user && user.firstName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} sm={6} md={4}>
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="(Optional)" value={user && user.middleName ? user.middleName[0] : ''} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col}xs={12} sm={6} md={4}>
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={user && user.lastName} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={4}>
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control value={user && user.studentNumber} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={4}>
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={4}>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={user && user.email} readOnly />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3" style={{paddingBottom:'30px'}}>
                                    <Form.Group as={Col} xs={12} sm={12} md={6}>
                                        <Form.Label>Term</Form.Label>
                                        <Form.Control type="text" placeholder="1st" value={term} onChange={e => setTerm(e.target.value)} required />
                                    </Form.Group>

                                    <Row as={Col}>
                                        <Row>
                                            <Form.Group as={Col} xs={12}>
                                                <Form.Label>Academic Year </Form.Label>
                                            </Form.Group>
                                        </Row>

                                        <Row>
                                            <Col xs={1} sm={2}>
                                                <Form.Label>20</Form.Label>
                                            </Col>
                                            <Col xs={5} sm={4}>
                                                <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year1} onChange={e => setYear1(e.target.value)} required />
                                            </Col>
                                            <Col xs={1} sm={2}>
                                                <Form.Label>-20</Form.Label>
                                            </Col>
                                            <Col xs={5} sm={4}>
                                                <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year2} onChange={e => setYear2(e.target.value)} required />
                                            </Col>
                                        </Row>
                                    </Row>
                                </Row>

                                <Card.Title 
                                style={{ margin: '5px 0 20px 0',
                                         color: 'black', 
                                         fontWeight: 'bold',
                                         
                                         paddingTop: '20px'
                                         
                                         
                                        }}>Courses to Cross-enroll / Drop
                                </Card.Title>
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
                                                <Row>
                                                    <Col style={{paddingTop: '13px'}}>
                                                <p>Courses to Cross-enroll/Drop #{idx + 1}</p>
                                                </Col>
                                                <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'right', marginBottom: '5px' }}>
                                                        {
                                                            idx === 0 ? (
                                                                <Button variant='primary' onClick={() => addRow()} style={{ width: '40px' }}>
                                                                    <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                                </Button>

                                                            ) : (
                                                                <Fragment>
                                                                    <Button variant='primary' onClick={() => addRow()} style={{ width: '40px', marginLeft: '5px' }}>
                                                                        <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                                    </Button>
                                                                    <Button variant='danger' onClick={() => deleteRow(idx)} style={{ width: '40px', marginLeft: '5px' }}>
                                                                        <i className="fa fa-minus" aria-hidden="true"></i>
                                                                    </Button>
                                                                </Fragment>
                                                            )
                                                        }
                                                    </Col>
                                                </Row>

                                                <Row style={{ marginBottom: '10px' }}>
                                                    
                                                    <Col xs={12} md={3} lg={3} style={addDropStyle}  >
                                                        <FloatingLabel
                                                            label="Cross-enroll/Drop"
                                                            
                                                        > 
                                                            <Form.Select aria-label="Default select example" name="status" id={status} data-id={idx} value={val.status} onChange={e => onChange(idx, e)} required>
                                                                <option value=''>Cross-enroll/Drop</option>
                                                                <option value="Add">Cross-enroll</option>
                                                                <option value="Drop">Drop</option>
                                                            </Form.Select>
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} md={4} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Course Code"
                                                        >
                                                            <Form.Select aria-label="Default select example" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(idx, e)} required>
                                                                <option value=''>Course Code</option>
                                                                {courses && courses.map(course => (
                                                                    <option value={course.courseCode}>{course.courseCode}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} md={5} lg={7} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Course Name"
                                                        >
                                                            <Form.Control type="text" placeholder="Course Name" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={2} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Lec Units"
                                                        >
                                                            <Form.Control type="number" placeholder="Lec Units" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={2} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Lab Units"
                                                        >
                                                            <Form.Control type="number" placeholder="Lab Units" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={3} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Days"
                                                        >
                                                            <Form.Select aria-label="Default select example" placeholder='M' name="days" id={days} data-id={idx} value={val.days} onChange={e => onChange(idx, e)} required >
                                                                <option value=''>Days</option>
                                                                <option value='M'>M</option>
                                                                <option value='T'>T</option>
                                                                <option value='W'>W</option>
                                                                <option value='Th'>Th</option>
                                                                <option value='F'>F</option>
                                                                <option value='S'>S</option>
                                                                <option value='Su'>Su</option>
                                                            </Form.Select>
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={5} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Time"
                                                        >
                                                            <Form.Control type="text" placeholder="Time" name="time" id={time} data-id={idx} value={val.time} onChange={e => onChange(idx, e)} required />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={4} md={4} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Room Number"
                                                        >
                                                            <Form.Control type="text" placeholder="Room number" name="room" id={room} data-id={idx} value={val.room} onChange={e => onChange(idx, e)} required />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={8} sm={4} md={5} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Section"
                                                        >
                                                            <Form.Control type="text" placeholder="Section" name="section" id={section} data-id={idx} value={val.section} onChange={e => onChange(idx, e)} required />
                                                        </FloatingLabel>
                                                    </Col>
                                                    
                                                    
                                                    
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
                <FORM6BPDF title={`Download Cross-Enrollment Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default Form6B