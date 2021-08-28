import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Table, Row, InputGroup, FormControl, Container, Button, Col, Card, Form, ListGroup } from 'react-bootstrap'
import AddDrop from './AddDrop'

function SampleForm() {

    //new 
    const [inputFields, setInputFields] = useState([
        {
            index: Math.random(),
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

        setInputFields(values)
    }

    const submitHandler = e => {
        e.preventDefault()

        localStorage.setItem('formData', JSON.stringify(inputFields))
    }

    const addRow = () => {
        setInputFields([...inputFields, {
            index: Math.random(),
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

    return (
        <Fragment>
            <Container classname="align-me" fluid style={{ paddingBottom: '100px' }}>
                <Card style={{ backgroundColor: '#9c0b0b' }}>  {/*, width: '100rem' */}
                    <Card.Body>
                        <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Student Information</Card.Title>
                        <Form style={{ color: 'white' }} onSubmit={submitHandler} >
                            {/**
                             * <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="Gran Austhyn" readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="De Vera" readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="S." readOnly />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="2018116830" readOnly />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Control type="text" placeholder="Information Technology" readOnly />
                            </Form.Group>
                             

                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type='email' placeholder="granausthyn.devera.iics@ust.edu.ph" readOnly />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridAddress2">
                                    <Form.Label>Category of Courses</Form.Label>
                                    <Form.Select aria-label="Default select example">
                                        <option>-</option>
                                        <option value="GE">General Education(GE)</option>
                                        <option value="NSTP">National Service Training Program (NSTP)</option>
                                        <option value="PE">Physical Education (PE)</option>
                                        <option value="P">Professional</option>
                                    </Form.Select>
                                </Form.Group>
                            </Row>
                            */}
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Courses to Add / Drop</Card.Title>

                            <Row className="mb-3">
                                <Form.Group as={Col}>
                                    <Form.Label>Add/Drop</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Course ID</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Course Name</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Lec Units</Form.Label>
                                </Form.Group>

                                <Form.Group as={Col}>
                                    <Form.Label>Lab Units</Form.Label>
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
                                                    <Form.Select aria-label="Default select example" name="status" id={status} data-id={idx} value={val.status} onChange={e => onChange(idx, e)}>
                                                        <option>-</option>
                                                        <option value="Add">Add</option>
                                                        <option value="Drop">Drop</option>
                                                    </Form.Select>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="text" placeholder="ICS2021/IT2021" name="courseCode" id={courseCode} data-id={idx} value={val.courseCode} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="text" placeholder="Theology 1" name="courseName" id={courseName} data-id={idx} value={val.courseName} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="number" placeholder="3Lec" name="lecUnits" id={lecUnits} data-id={idx} value={val.lecUnits} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="number" placeholder="3Lec" name="labUnits" id={labUnits} data-id={idx} value={val.labUnits} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="number" placeholder="14 Days" name="days" id={days} data-id={idx} value={val.days} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="text" placeholder="3:00PM - 5:00PM" name="time" id={time} data-id={idx} value={val.time} onChange={e => onChange(idx, e)}/>
                                                </Form.Group>

                                                <Form.Group as={Col}>
                                                    <Form.Control type="text" placeholder="4ITF" name="section" id={section} data-id={idx} value={val.section} onChange={e => onChange(idx, e)}/>
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

                            <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Submit</Button></center>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}

export default SampleForm