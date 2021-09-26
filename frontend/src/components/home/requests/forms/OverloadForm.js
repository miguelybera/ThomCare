import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getCourses, clearErrors } from '../../../../actions/courseActions'
import { saveForm } from '../../../../actions/requestActions'
import MetaData from '../../../layout/MetaData'
import Loader from '../../../layout/Loader'
import { FloatingLabel, Row, Container, Button, Col, Card, Form, Modal, Breadcrumb } from 'react-bootstrap'
import OVERLOADPDF from '../templates/OVERLOADPDF'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'

const addDropStyle = {
    marginBottom: '5px'
}

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

            /*cheska*/
            courseCodeSpecialTerm: '',
            courseNameSpecialTerm: '',
            lecUnitsSpecialTerm: '',
            labUnitsSpecialTerm: ''
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
        /*cheska*/
        if (values[index]["courseCodeSpecialTerm"] !== '') {
        values[index]["courseNameSpecialTerm"] = getCourseName2(values[index]["courseCodeSpecialTerm"], "courseNameSpecialTerm")
        values[index]["labUnitsSpecialTerm"] = getCourseName2(values[index]["courseCodeSpecialTerm"], "labUnitsSpecialTerm")
        values[index]["lecUnitsSpecialTerm"] = getCourseName2(values[index]["courseCodeSpecialTerm"], "lecUnitsSpecialTerm")
        } else {
            values[index]["courseNameSpecialTerm"] = ''
            values[index]["labUnitsSpecialTerm"] = ''
            values[index]["lecUnitsSpecialTerm"] = ''
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
            course: user.course
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
            /*cheska*/
            courseCodeSpecialTerm: '',
            courseNameSpecialTerm: '',
            lecUnitsSpecialTerm: '',
            labUnitsSpecialTerm: '',
            /* */
            
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
    /*cheska*/
    const getCourseName2 = (code, field) => {
        const val2 = courses.find(course => course.courseCode === code)
        switch (field) {
            
            case "courseNameSpecialTerm":
                return val2.courseNameSpecialTerm
            case "lecUnitsSpecialTerm":
                return val2.lecUnitsSpecialTerm
            case "labUnitsSpecialTerm":
                return val2.labUnitsSpecialTerm
            
            default:
                return
        }
        


    }

    const title = 'Overload Form'

    const [submitted, setSubmitted] = useState(false)

    function ModalDocuments() {
        const [lgShow, setLgShow] = useState(false);
        return (
            <>
                <Button onClick={() => setLgShow(true)}>General Instructions</Button>
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
            </>
        );
    }

    return (
        <Fragment>
            <MetaData title={title} />
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
                        <Card.Body style={{ paddingTop: '0px'}}>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: '#9c0b0b', fontWeight: 'bold', textAlign: 'center' }}>REQUEST FOR STUDY OVERLOAD FORM (MAKE 3 COPIES)</Card.Title>
                            <Card.Title style={{ margin: '10px 0 20px 0', fontWeight: 'bold' }}>Student Information</Card.Title>
                            <Form onSubmit={submitHandler} >
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>First Name</Form.Label>
                                        <Form.Control type="text" value={user && user.firstName} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Middle Initial</Form.Label>
                                        <Form.Control type="text" placeholder="S." value={user && user.middleName ? user.middleName : 'N/A'} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridEmail">
                                        <Form.Label>Last Name</Form.Label>
                                        <Form.Control type="text" value={user && user.lastName} readOnly />
                                    </Form.Group>
                                </Row>
                                <Row className="mb-3">
                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={2}>
                                        <Form.Label>Student Number</Form.Label>
                                        <Form.Control value={user && user.studentNumber} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} sm={6} md={6} lg={6}>
                                        <Form.Label>Course/Program</Form.Label>
                                        <Form.Control type="text" value={user && user.course} readOnly />
                                    </Form.Group>

                                    <Form.Group as={Col} xs={12} sm={12} md={12} lg={4}>
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type='email' value={user && user.email} readOnly />
                                    </Form.Group>
                                </Row>

                                <Row style={{paddingBottom:'20px'}}>
                                

                                    <Form.Group as={Col} lg={2}>
                                        <Form.Label>Curriculum Year</Form.Label>
                                        <Form.Control type='text' placeholder="2021" />
                                    </Form.Group>

                                    <Form.Group as={Col} lg={2} controlId="formGridAddress1">
                                        <Form.Label>Term</Form.Label>
                                        <Form.Control type='text' placeholder="2021 - 2022" />
                                    </Form.Group>
                                </Row>

                                <Card.Title
                                style={{ margin: '10px 0 20px 0',
                                         color: 'black',
                                         fontWeight: 'bold'
                                         }}>Load Requested For Approval:
                                </Card.Title>

                                {/*<Row className="mb-3">

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

                                
                                </Row>
                                        */}

                                {
                                    inputFields.map((val, idx) => {
                                        //set unique id per row
                                        let status = `status-${idx}`,
                                            courseCode = `courseCode-${idx}`,
                                            courseName = `courseName-${idx}`,
                                            lecUnits = `lecUnits-${idx}`,
                                            labUnits = `labUnits-${idx}`,
                                            days = `days-${idx}`,
                                            time = `time-${idx}`
                                        return (
                                            <Fragment key={val.index}>
                                                <Row>
                                                <Col style={{paddingTop: '13px'}}>
                                                <p>#{idx + 1}</p>
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
                                                <Row>

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
                                                    <Col xs={12} md={5} lg={6} style={addDropStyle}>
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
                                                </Row>
                                            </Fragment>
                                        )
                                    }
                                    )
                                }

                                <Card.Title style={{ margin: '30px 0 20px 0', color: 'black', fontWeight: 'bold' }}>SPECIAL TERM LOAD   (if special term graduate):</Card.Title>

                                
                                {
                                    inputFields.map((val, idx) => {
                                        //set unique id per row
                                        let status = `status-${idx}`,
                                            courseCodeSpecialTerm = `courseCode-${idx}`,
                                            courseNameSpecialTerm = `courseName-${idx}`,
                                            lecUnitsSpecialTerm = `lecUnits-${idx}`,
                                            labUnitsSpecialTerm = `labUnits-${idx}`,
                                            days = `days-${idx}`,
                                            time = `time-${idx}`,
                                            section = `section-${idx}`

                                        return (
                                            <Fragment>
                                                <Row>
                                                <Col style={{paddingTop: '13px'}}>
                                                <p>#{idx + 1}</p>
                                                </Col>
                                                <Col xs={4} sm={4} md={3} lg={2} style={{ textAlign: 'right', marginBottom: '5px' }}>
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
                                                <Row className="mb-3" key={val.index}>
                                                

                                                <Col xs={12} md={4} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Course Code"
                                                        >
                                                            <Form.Select aria-label="Default select example" name="courseCodeSpecialTerm" id={courseCodeSpecialTerm} data-id={idx} value={val.courseCodeSpecialTerm} onChange={e => onChange(idx, e)} required>
                                                                <option value=''>Course Code</option>
                                                                {courses && courses.map(course => (
                                                                    <option value={course.courseCode}>{course.courseCode}</option>
                                                                ))}
                                                            </Form.Select>
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} md={5} lg={6} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Course Name"
                                                        >
                                                            <Form.Control type="text" placeholder="Course Name" name="courseNameSpecialTerm" id={courseNameSpecialTerm} data-id={idx} value={val.courseNameSpecialTerm} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={2} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Lec Units"
                                                        >
                                                            <Form.Control type="number" placeholder="Lec Units" name="lecUnitsSpecialTerm" id={lecUnitsSpecialTerm} data-id={idx} value={val.lecUnitsSpecialTerm} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                    <Col xs={12} sm={6} md={2} lg={2} style={addDropStyle}>
                                                        <FloatingLabel
                                                            label="Lab Units"
                                                        >
                                                            <Form.Control type="number" placeholder="Lab Units" name="labUnitsSpecialTerm" id={labUnitsSpecialTerm} data-id={idx} value={val.labUnitsSpecialTerm} onChange={e => onChange(idx, e)} readOnly />
                                                        </FloatingLabel>
                                                    </Col>
                                                </Row>
                                            </Fragment>
                                        )
                                    }
                                    )
                                }

                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword" style={{ margin: '30px 0 20px 0', fontWeight: 'bold' }}>
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

                </Container>
            ) : (
                <OVERLOADPDF title={`Download Overload Form`} content={localStorage.getItem('formData')} />
            )}
        </Fragment>
    )
}

export default OverloadForm