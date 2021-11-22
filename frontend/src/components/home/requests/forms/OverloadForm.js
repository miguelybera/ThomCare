import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Row, Container, Button, Col, Card, Form, Modal, Breadcrumb, InputGroup } from 'react-bootstrap'
import { getCourses, clearErrors } from '../../../../actions/courseActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import MetaData from '../../../layout/MetaData'
import Loader from '../../../layout/Loader'
import OVERLOADPDF from '../templates/OVERLOADPDF'

const addDropStyle = {
    marginBottom: '5px'
}

function OverloadForm({ history }) {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { courses, error, loading } = useSelector(state => state.courses)
    const { user } = useSelector(state => state.auth)

    const [studentInfo, setStudentInfo] = useState({})
    const [middleInitial, setMiddleInitial] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [tentative, setTentative] = useState('')
    const [curriculum, setCurriculum] = useState('')
    const [term, setTerm] = useState('')

    const [fullTime, setFullTime] = useState()
    const [workingStudent, setWorkingStudent] = useState()
    const [bar, setBar] = useState()
    const [violations, setViolations] = useState()
    const [unitsEarned, setUnitsEarned] = useState()
    const [incompleteGrades, setIncompleteGrades] = useState()
    const [normalLoad, setNormalLoad] = useState()
    const [totalUnits, setTotalUnits] = useState()
    const [totalOverloadUnits, setTotalOverloadUnits] = useState()
    const [totalFives, setTotalFives] = useState()
    const [unitsRequired, setUnitsRequired] = useState()
    const [specialAttend, setSpecialAttend] = useState()
    const [show, setShow] = useState(false)
    const [otherTerm, setOtherTerm] = useState()

    const [overload, setOverload] = useState([{
        status: '',
        courseCode: '',
        courseName: '',
        lecUnits: '',
        labUnits: '',
        days: '',
        startTime: '',
        endTime: ''
    }])
    const [specialTerm, setSpecialTerm] = useState([{
        courseCode: '',
        courseName: '',
        lecUnits: '',
        labUnits: ''
    }])

    const terms = ["1st Term", "2nd Term", "Summer Term", "Not stated (Others)"]

    const title = 'Overload Form'

    const getMiddleInitial = (name) => {
        const middleName = name ? name.split(' ') : ''
        let mi = ''

        middleName && middleName.forEach(x => {
            mi += x[0]
        })
        return mi
    }

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const goBack = () => {
        window.history.back()
        handleClose()
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
    }, [dispatch, history, alert, error, user])

    const addRow = (num) => {
        if (num === 1) {
            setOverload([...overload, {
                courseCode: '',
                courseName: '',
                lecUnits: '',
                labUnits: '',
                days: '',
                startTime: '',
                endTime: ''
            }])
        } else {
            setSpecialTerm([...specialTerm, {
                courseCode: '',
                courseName: '',
                lecUnits: '',
                labUnits: ''
            }])
        }
    }

    const deleteRow = (num, index) => {
        const values = num === 1 ? [...overload] : [...specialTerm]

        values.splice(index, 1)

        if (num === 1) {
            setOverload(values)
        } else {
            setSpecialTerm(values)
        }
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

    const onChange = (num, index, e) => {
        e.preventDefault()

        const values = num === 1 ? [...overload] : [...specialTerm]

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

        if (num === 1) {
            setOverload(values)
        } else {
            setSpecialTerm(values)
        }
    }

    const submitHandler = e => {
        e.preventDefault()

        setStudentInfo({
            firstName: user.firstName,
            lastName: user.lastName,
            middleName: user.middleName ? user.middleName : 'N/A',
            studentNumber: user.studentNumber,
            email: user.email,
            course: user.course,
            overload,
            specialTerm,
            tentative,
            curriculum,
            term: term !== 'Not stated (Others)' ? term : otherTerm,
            fullTime: fullTime ? 'Yes' : 'No',
            workingStudent: workingStudent ? 'Yes' : 'No',
            bar: bar ? 'Yes' : 'No',
            violations: violations ? 'Yes' : 'No',
            unitsEarned,
            incompleteGrades,
            normalLoad,
            totalUnits,
            totalOverloadUnits,
            totalFives,
            unitsRequired,
            specialAttend
        })

        setSubmitted(!submitted)
    }

    function ModalDocuments() {
        const [lgShow, setLgShow] = useState(false)

        return (
            <Fragment>
                <Button variant='outline-secondary' onClick={() => setLgShow(true)}>General Instructions</Button>
                <Modal
                    size="lg"
                    show={lgShow}
                    onHide={() => setLgShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ paddingTop: '40px' }}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h3 style={{ fontWeight: 'bold' }}>General Instructions:</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
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
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
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
                <Container classname="align-me" fluid style={{ paddingBottom: '100px', marginTop: '30px' }}>
                    <Card style={{ backgroundColor: '#fff' }}>  {/*, width: '100rem' */}
                        <Card.Header style={{ backgroundColor: 'white', textColor: '#919191' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '86% 14%' }}>
                                <div>
                                    <Breadcrumb style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Breadcrumb.Item><Link to='/forms/list'>Generate Forms</Link></Breadcrumb.Item>
                                        <Breadcrumb.Item active>{title}</Breadcrumb.Item>
                                    </Breadcrumb></div>
                                <div><ModalDocuments /></div>
                            </div>
                        </Card.Header>
                        <Card.Body style={{ paddingTop: '0px' }}>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold', textAlign: 'center' }}>REQUEST FOR STUDY OVERLOAD FORM (MAKE 3 COPIES)</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form onSubmit={submitHandler} >
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
                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={2}>
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control value={user && user.studentNumber} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={4}>
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={6}>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={user && user.email} readOnly />
                                    </Form.Group>
                                </Row>

                                <Card.Title style={{ margin: '10px 0 20px 0', fontWeight: 'bold' }}>Answer the following</Card.Title>
                                <Row style={{ paddingBottom: '20px' }}>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Curriculum Year</Form.Label>
                                        <Form.Control type='text' placeholder="2021-2022" pattern="20[0-9]{2}-20[0-9]{2}" value={curriculum} onChange={e => setCurriculum(e.target.value)} required />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label>Term</Form.Label>
                                        <Form.Select aria-label="Default select example" name="term" id={term} value={term} onChange={e => setTerm(e.target.value)} required>
                                            <option value=''>Term</option>
                                            {terms && terms.map(term => (
                                                <option value={term}>{term}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3}>
                                        <Form.Label className={term === 'Not stated (Others)' ? "" : "d-none"}>Other Term</Form.Label>
                                        <Form.Control type='text' placeholder="Other term" value={otherTerm} onChange={e => setOtherTerm(e.target.value)} className={term === 'Not stated (Others)' ? "" : "d-none"} required={term === 'Not stated (Others)' ? true : false} />
                                    </Form.Group>
                                </Row>
                                <Row style={{ paddingBottom: '20px' }}>
                                    <Form.Group as={Col} xs={12} md={3}>
                                        <Form.Check type="checkbox" label="Full Time" defaultChecked={fullTime} value={fullTime} onChange={e => setFullTime(!fullTime)} />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} md={3}>
                                        <Form.Check type="checkbox" label="Working Student" defaultChecked={workingStudent} value={workingStudent} onChange={e => setWorkingStudent(!workingStudent)} />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} md={3}>
                                        <Form.Check type="checkbox" label="Does the program require Bar or Board Examination?" defaultChecked={bar} value={bar} onChange={e => setBar(!bar)} />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} md={3}>
                                        <Form.Check type="checkbox" label="Is there a violation of courses prerequisites?" defaultChecked={violations} value={violations} onChange={e => setViolations(!violations)} />
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>Total Number of Units Earned</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={unitsEarned} onChange={e => setUnitsEarned(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>No. of INCOMPLETE grades</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={incompleteGrades} onChange={e => setIncompleteGrades(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>Total Number of Units Required for the Program</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={unitsRequired} onChange={e => setUnitsRequired(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>No. of Special Terms Attended</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={specialAttend} onChange={e => setSpecialAttend(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>Normal Load for the Current Term</InputGroup.Text>
                                            <Form.Control type="text" placeholder="How many units?" value={normalLoad} onChange={e => setNormalLoad(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>Total Number of Units to be Taken including Overload</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={totalUnits} onChange={e => setTotalUnits(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>Total Number of Overload Units Already Taken</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={totalOverloadUnits} onChange={e => setTotalOverloadUnits(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group as={Col} xs={12} style={{ paddingBottom: '12px' }}>
                                        <InputGroup>
                                            <InputGroup.Text>No. of 5s</InputGroup.Text>
                                            <Form.Control type="text" placeholder="ex. 1" value={totalFives} onChange={e => setTotalFives(e.target.value)} required />
                                        </InputGroup>
                                    </Form.Group>
                                </Row>
                                <Card.Title
                                    style={{
                                        margin: '10px 0 20px 0',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Load Requested For Approval:
                                </Card.Title>
                                {overload.map((val, idx) => {
                                    //set unique id per row
                                    let courseCode = `courseCode-${idx}`,
                                        courseName = `courseName-${idx}`,
                                        lecUnits = `lecUnits-${idx}`,
                                        labUnits = `labUnits-${idx}`,
                                        days = `days-${idx}`,
                                        startTime = `startTime-${idx}`,
                                        endTime = `endTime-${idx}`

                                    return (
                                        <Fragment key={val.index}>
                                            <Row>
                                                <Col style={{ paddingTop: '13px' }}>
                                                    <p>#{idx + 1}</p>
                                                </Col>
                                                <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'right', marginBottom: '5px' }}>
                                                    {idx === 0 ? (
                                                        <Button variant='primary' onClick={() => addRow(1)} style={{ width: '40px' }}>
                                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                        </Button>
                                                    ) : (
                                                        <Fragment>
                                                            <Button variant='primary' onClick={() => addRow(1)} style={{ width: '40px', marginLeft: '5px' }}>
                                                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            </Button>
                                                            <Button variant='danger' onClick={() => deleteRow(1, idx)} style={{ width: '40px', marginLeft: '5px' }}>
                                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                                            </Button>
                                                        </Fragment>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row className="mb-3">
                                                <Col xs={12} md={4} lg={3} style={addDropStyle} >
                                                    <FloatingLabel label="Course Code">
                                                        <Form.Select aria-label="Default select example" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(1, idx, e)} required>
                                                            <option value=''>Course Code</option>
                                                            {courses && courses.map(course => (
                                                                <option value={course.courseCode}>{course.courseCode}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} md={8} lg={9} style={addDropStyle}>
                                                    <FloatingLabel label="Course Name">
                                                        <Form.Control type="text" placeholder="Course Name" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(1, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={6} md={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lec Units">
                                                        <Form.Control type="number" placeholder="Lec Units" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(1, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={6} md={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lab Units">
                                                        <Form.Control type="number" placeholder="Lab Units" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(1, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Days">
                                                        <Form.Select aria-label="Default select example" placeholder='M' name="days" id={days} data-id={idx} value={val.days} onChange={e => onChange(1, idx, e)} required >
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
                                                        <Form.Control type="text" placeholder="Start Time (ex: 7:00 AM)" name="startTime" id={startTime} data-id={idx} value={val.startTime} onChange={e => onChange(1, idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={6} sm={6} md={6} lg={3} style={addDropStyle}>
                                                    <FloatingLabel label="End Time (ex: 7:00 AM)">
                                                        <Form.Control type="text" placeholder="End Time (7:00 AM)" name="endTime" id={endTime} data-id={idx} value={val.endTime} onChange={e => onChange(1, idx, e)} required />
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )
                                })
                                }
                                <Card.Title style={{ margin: '30px 0 20px 0', color: 'black', fontWeight: 'bold' }}>
                                    SPECIAL TERM LOAD   (if special term graduate):
                                </Card.Title>

                                {specialTerm.map((val, idx) => {
                                    //set unique id per row
                                    let courseCode = `courseCode-${idx}`,
                                        courseName = `courseName-${idx}`,
                                        lecUnits = `lecUnits-${idx}`,
                                        labUnits = `labUnits-${idx}`

                                    return (
                                        <Fragment>
                                            <Row>
                                                <Col style={{ paddingTop: '13px' }}>
                                                    <p>#{idx + 1}</p>
                                                </Col>
                                                <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'right', marginBottom: '5px' }}>
                                                    {idx === 0 ? (
                                                        <Button variant='primary' onClick={() => addRow(2)} style={{ width: '40px' }}>
                                                            <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                        </Button>

                                                    ) : (
                                                        <Fragment>
                                                            <Button variant='primary' onClick={() => addRow(2)} style={{ width: '40px', marginLeft: '5px' }}>
                                                                <i className="fa fa-plus-circle" aria-hidden="true"></i>
                                                            </Button>
                                                            <Button variant='danger' onClick={() => deleteRow(2, idx)} style={{ width: '40px', marginLeft: '5px' }}>
                                                                <i className="fa fa-minus" aria-hidden="true"></i>
                                                            </Button>
                                                        </Fragment>
                                                    )}
                                                </Col>
                                            </Row>
                                            <Row className="mb-3" key={val.index}>
                                                <Col xs={12} md={4} lg={3} style={addDropStyle} >
                                                    <FloatingLabel label="Course Code">
                                                        <Form.Select aria-label="Default select example" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(2, idx, e)} required>
                                                            <option value='requested'>Course Code</option>
                                                            {courses && courses.map(course => (
                                                                <option value={course.courseCode}>{course.courseCode}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} md={8} lg={5} style={addDropStyle}>
                                                    <FloatingLabel label="Course Name">
                                                        <Form.Control type="text" placeholder="Course Name" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(2, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lec Units">
                                                        <Form.Control type="number" placeholder="Lec Units" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(2, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                                <Col xs={12} sm={6} md={6} lg={2} style={addDropStyle}>
                                                    <FloatingLabel label="Lab Units">
                                                        <Form.Control type="number" placeholder="Lab Units" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(2, idx, e)} readOnly />
                                                    </FloatingLabel>
                                                </Col>
                                            </Row>
                                        </Fragment>
                                    )
                                })
                                }
                                <Row className="mb-3" style={{ margin: '30px 0 20px 0', fontWeight: 'bold' }}>
                                    <Col xs={12} md={3} style={addDropStyle} >
                                        <Form.Label>
                                            TENTATIVE DATE OF GRADUATION:
                                        </Form.Label>
                                    </Col>
                                    <Col xs={12} md={6} style={addDropStyle}>
                                        <Form.Control type="text" placeholder="Month / Year" value={tentative} onChange={e => setTentative(e.target.value)} required />
                                    </Col>
                                </Row>
                                <center>
                                    <Button
                                        type='button'
                                        style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                        variant='outline-danger'
                                        onClick={handleShow}>
                                        Discard
                                    </Button>
                                    <Button
                                        type='submit'
                                        style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                        disabled={user.role !== 'Student' ? true : false}
                                    >
                                        Generate Form
                                    </Button>
                                </center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Container>
            ) : (
                <OVERLOADPDF title={`Download Overload Form`} studentInfo={studentInfo} submitted={submitted} setSubmitted={setSubmitted} />
            )}
        </Fragment>
    )
}

export default OverloadForm