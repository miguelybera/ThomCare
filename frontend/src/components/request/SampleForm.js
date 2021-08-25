import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getCourses, clearErrors } from './../../actions/courseActions'
import { Table, Row, InputGroup, FormControl, Container, Button, Col, Card, Form, ListGroup } from 'react-bootstrap'
import AddDrop from './AddDrop'

const SampleForm = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)
    const { loading, courses, success, error } = useSelector(state => state.courses)

    console.log(courses)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [course, setCourse] = useState('')
    const [email, setEmail] = useState('')
    const [addDropCourse, setAddDropCourse] = useState({})
    const programs = ['Computer Science', 'Information Systems', 'Information Technology']

    const [numOfRows, setNumOfRows] = useState(["1"])

    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setStudentNumber(user.studentNumber)
        setCourse(user.course)
        setEmail(user.email)

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch(getCourses())

    }, [user, dispatch, alert])

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData
        formData.set("firstName", firstName)
        formData.set("lastName", lastName)
        formData.set("studentNumber", studentNumber)
        formData.set("course", course)
        formData.set("email", email)

        const data = {
            firstName,
            lastName,
            studentNumber,
            course,
            email
        }
        console.log(data)
    }
    return (
        <Fragment>
            <Container className="titles"   >
                <div id="rectangle" >

                    <h3>Fill up *KUNWARI Form6-A*s</h3>

                </div>
            </Container>
            <br />

            <Container style={{ paddingBottom: '30px' }}>
                <h7>General Instructions & Requirements List: </h7>

                <ListGroup variant="flush">
                    <ListGroup.Item>Cras justo odio</ListGroup.Item>
                    <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                    <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                    <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                    <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
                </ListGroup>
            </Container>

            <Container className="align-me" fluid style={{ paddingBottom: '100px' }}>
                <Card style={{ backgroundColor: '#9c0b0b' }}>  {/*, width: '100rem' */}
                    <Card.Body>
                        <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Student Information</Card.Title>
                        <Form style={{ color: 'white' }} onSubmit={submitHandler}>
                            <Row className="mb-3">
                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control type="text" placeholder="First Name" value={firstName} name="firstName" onChange={e => setFirstName(upperCase(e.target.value))} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control type="text" placeholder="Last Name" value={lastName} name="lastName" onChange={e => setLastName(upperCase(e.target.value))} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridEmail">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Middle Name" />
                                </Form.Group>
                            </Row>

                            <Form.Group className="mb-3" controlId="formGridAddress1">
                                <Form.Label>Student Number</Form.Label>
                                <Form.Control placeholder="Student Number" value={studentNumber} name="studentNumber" onChange={e => setStudentNumber(e.target.value)} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formGridAddress2">
                                <Form.Label>Course/Program</Form.Label>
                                <Form.Select aria-label="Default select example" value={course} name="course" onChange={e => setCourse(e.target.value)} required>
                                    {programs.map(program => (
                                        <option value={program}>{program}</option>
                                    ))}
                                </Form.Select>
                            </Form.Group>

                            <Row className="mb-3">
                                <Form.Group as={Col} className="mb-3" controlId="formGridAddress1">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type='email' placeholder="Email Addrses" value={email} name="email" onChange={e => setEmail(e.target.value)} />
                                </Form.Group>
                            </Row>
                            <Card.Title style={{ margin: '10px 0 20px 0', color: 'white', fontWeight: 'bold' }}>Courses to Add / Drop</Card.Title>

                            {numOfRows.map(row => (
                                <Row className="mb-3">
                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Option</Form.Label>
                                        <Form.Select aria-label="Default select example">
                                            <option>-</option>
                                            <option value="1">Add</option>
                                            <option value="2">Drop</option>
                                        </Form.Select>
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridPassword">
                                        <Form.Label>Course ID</Form.Label>
                                        <Form.Select aria-label="Default select example" value={addDropCourse} onChange={e => {
                                            setAddDropCourse(e.target.value)
                                            console.log(addDropCourse)
                                        }}>
                                            <option>-</option>
                                            {courses && courses.map(course => (
                                                <option value={course}>{course.courseCode}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <AddDrop course={addDropCourse}/>
                                </Row>
                            ))}

                            <Button onClick={() => setNumOfRows([...numOfRows, "1"])}>Add row</Button>

                            <center><Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}>Submit</Button></center>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Fragment>
    )
}

export default SampleForm