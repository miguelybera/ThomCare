import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Row, Container, Button, Col, Card, Form, Breadcrumb, Modal, InputGroup } from 'react-bootstrap'
import { getCourses, clearErrors } from '../../../../actions/courseActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import MetaData from '../../../layout/MetaData'
import Loader from '../../../layout/Loader'
import FORM6APDF from '../templates/FORM6APDF'

const addDropStyle = {
    marginBottom: '5px'
}

function Form6A({ history }) {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { courses, error, loading } = useSelector(state => state.courses)
    const { user } = useSelector(state => state.auth)

    const [term, setTerm] = useState('')
    const [year1, setYear1] = useState('')
    const [year2, setYear2] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [middleInitial, setMiddleInitial] = useState('')
    const [studentInfo, setStudentInfo] = useState({})
    const [show, setShow] = useState(false)
    const [otherTerm, setOtherTerm] = useState()

    const [inputFields, setInputFields] = useState([{
        status: '',
        courseCode: '',
        courseName: '',
        lecUnits: '',
        labUnits: '',
        days: '',
        startTime: '',
        endTime: '',
        room: '',
        section: ''
    }])

    const terms = ["1st Term", "2nd Term", "Summer Term", "Not stated (Others)"]

    const title = 'Form 6A - Add/Drop Course Form'

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const goBack = () => {
        window.history.back()
        handleClose()
    }

    const addRow = () => {
        setInputFields([...inputFields, {
            status: '',
            courseCode: '',
            courseName: '',
            lecUnits: '',
            labUnits: '',
            days: '',
            startTime: '',
            endTime: '',
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

    const getMiddleInitial = (name) => {
        const middleName = name ? name.split(' ') : ''
        let mi = ''

        middleName && middleName.forEach(x => {
            mi += x[0]
        })
        return mi
    }

    useEffect(() => {
        dispatch(getCourses())
        setMiddleInitial(getMiddleInitial(user.middleName))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/forms/list')
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, error, history, user])

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

        let toAdd = [], toDrop = [], newAddTotalUnits = 0, newDropTotalUnits = 0

        inputFields.forEach(x => {
            if (x.status === 'Add') {
                toAdd.push(x)
            } else {
                toDrop.push(x)
            }
        })

        const uniqueToAdd = [...new Map(toAdd.map(item => [item['courseCode'], item])).values()]
        const uniqueToDrop = [...new Map(toDrop.map(item => [item['courseCode'], item])).values()]

        uniqueToAdd.forEach(x => {
            newAddTotalUnits += (Number(x.lecUnits) + Number(x.labUnits))
        })

        uniqueToDrop.forEach(x => {
            newDropTotalUnits += (Number(x.lecUnits) + Number(x.labUnits))
        })

        setStudentInfo({
            firstName: user.firstName,
            middleName: user.middleName ? user.middleName[0] : '',
            lastName: user.lastName,
            email: user.email,
            studentNumber: user.studentNumber,
            course: user.course,
            toAdd,
            toDrop,
            newAddTotalUnits,
            newDropTotalUnits,
            term: term !== 'Not stated (Others)' ? term : otherTerm,
            year1,
            year2
        })

        setSubmitted(!submitted)
    }

    return (
        <Fragment>
            <MetaData title={title} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to discard any changes?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Any changes done will be gone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={goBack}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            {loading ? <Loader /> : !submitted ? (
                <Container classname="align-me" fluid style={{ paddingBottom: '100px', paddingTop: '40px' }}>
                    <Card style={{ backgroundColor: '#fff', width: '100%' }}>  {/*, width: '100rem', backgroundColor: '#9c0b0b' */}
                        <Card.Header style={{ backgroundColor: 'white', textColor: '#919191' }}>
                            <Breadcrumb>
                                <Breadcrumb.Item><Link to='/forms/list'>Generate Forms</Link></Breadcrumb.Item>
                                <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                            </Breadcrumb>
                        </Card.Header>
                        <Card.Body style={{ paddingTop: '0px' }} >
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold', textAlign: 'center' }}>{title}</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'black', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form style={{ color: 'black' }} onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} md={5} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={user && user.firstName} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={3} controlId="formGridEmail">
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="(Optional)" value={middleInitial} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} md={4} controlId="formGridEmail">
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
                                <Row className="mb-3" style={{ paddingBottom: '30px' }}>
                                    <Col xs={12} sm={12} md={4}>
                                        <Form.Label>Academic Year </Form.Label>
                                        <InputGroup className="mb-3">
                                            <InputGroup.Text>20</InputGroup.Text>
                                            <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year1} onChange={e => setYear1(e.target.value)} required />
                                            <InputGroup.Text>- 20</InputGroup.Text>
                                            <Form.Control type="text" placeholder="xx" pattern="[0-9]{2}" value={year2} onChange={e => setYear2(e.target.value)} required />
                                        </InputGroup>
                                    </Col>
                                    <Form.Group as={Col} xs={12} sm={12} md={4}>
                                        <Form.Label>Term</Form.Label>
                                        <Form.Select aria-label="Default select example" name="term" id={term} value={term} onChange={e => setTerm(e.target.value)} required>
                                            <option value=''>Term</option>
                                            {terms && terms.map(term => (
                                                <option value={term}>{term}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} sm={12} md={4}>
                                        <Form.Label className={term === 'Not stated (Others)' ? "" : "d-none"}>Other Term</Form.Label>
                                        <Form.Control type='text' placeholder="Other term" value={otherTerm} onChange={e => setOtherTerm(e.target.value)} className={term === 'Not stated (Others)' ? "" : "d-none"} required={term === 'Not stated (Others)' ? true : false} />
                                    </Form.Group>
                                </Row>
                                <Card.Title
                                    style={{
                                        margin: '5px 0 20px 0',
                                        color: 'black',
                                        fontWeight: 'bold',
                                        borderTop: '1px solid black',
                                        paddingTop: '20px'
                                    }}
                                >
                                    Courses to Add / Drop:
                                </Card.Title>
                                {inputFields.map((val, idx) => {
                                    //set unique id per row
                                    let status = `status-${idx}`,
                                        courseCode = `courseCode-${idx}`,
                                        courseName = `courseName-${idx}`,
                                        lecUnits = `lecUnits-${idx}`,
                                        labUnits = `labUnits-${idx}`,
                                        days = `days-${idx}`,
                                        startTime = `startTime-${idx}`,
                                        endTime = `endTime-${idx}`,
                                        room = `room-${idx}`,
                                        section = `section-${idx}`

                                    return (
                                        <Fragment key={val.index}>
                                            <Row>
                                                <Col style={{ paddingTop: '13px' }}>
                                                    <p>Courses to Add/Drop #{idx + 1}</p>
                                                </Col>
                                                <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'right', marginBottom: '5px' }}>
                                                    {idx === 0 ? (
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
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row style={{ marginBottom: '10px' }}>
                                                <Col xs={12} md={6} lg={2} style={addDropStyle}  >
                                                    <FloatingLabel label="Add/Drop">
                                                        <Form.Select aria-label="Default select example" name="status" id={status} data-id={idx} value={val.status} onChange={e => onChange(idx, e)} required>
                                                            <option value=''>-</option>
                                                            <option value="Add">Add</option>
                                                            <option value="Drop">Drop</option>
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Course Code">
                                                        <Form.Select aria-label="Default select example" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(idx, e)} required>
                                                            <option value=''>Course Code</option>
                                                            {courses && courses.map(course => (
                                                                <option value={course.courseCode}>{course.courseCode}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} md={12} lg={4} style={addDropStyle}>
                                                    <FloatingLabel label="Course Name">
                                                        <Form.Control type="text" placeholder="Course Name" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={4} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lec Units">
                                                        <Form.Control type="number" placeholder="Lec Units" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={4} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lab Units">
                                                        <Form.Control type="number" placeholder="Lab Units" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={12} md={4} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Days">
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
                                                <Col xs={6} sm={6} md={6} lg={3} style={addDropStyle}>
                                                    <FloatingLabel label="Start Time (ex: 7:00 AM)">
                                                        <Form.Control type="text" placeholder="Start Time (ex: 7:00 AM)" name="startTime" id={startTime} data-id={idx} value={val.startTime} onChange={e => onChange(idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={3} style={addDropStyle}>
                                                    <FloatingLabel label="End Time (ex: 7:00 AM)">
                                                        <Form.Control type="text" placeholder="End Time (7:00 AM)" name="endTime" id={endTime} data-id={idx} value={val.endTime} onChange={e => onChange(idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Room Number">
                                                        <Form.Control type="text" placeholder="Room number" name="room" id={room} data-id={idx} value={val.room} onChange={e => onChange(idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Section">
                                                        <Form.Control type="text" placeholder="Section" name="section" id={section} data-id={idx} value={val.section} onChange={e => onChange(idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )
                                })}
                                <center>
                                    <Button
                                        type='button'
                                        style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                        variant='outline-danger'
                                        onClick={handleShow}>
                                        Discard
                                    </Button>
                                    <Button type='submit' style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }} disabled={user.role !== 'Student' ? true : false}>Generate Form</Button>
                                </center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <FORM6APDF title={`Download Add Drop Form`} studentInfo={studentInfo} submitted={submitted} setSubmitted={setSubmitted} />
            )}
        </Fragment >
    )
}

export default Form6A