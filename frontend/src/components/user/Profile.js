import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearErrors } from '../../actions/userActions'
import { Form, Card, Button, Container, Row, Col } from 'react-bootstrap'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'

const Profile = () => {

    const dispatch = useDispatch()

    const { user, error, loading } = useSelector(state => state.auth)

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [studentNumber, setStudentNumber] = useState('')
    const [email, setEmail] = useState('')
    const [course, setCourse] = useState('')
    const [role, setRole] = useState('')

    useEffect(() => {
        setFirstName(user.firstName)
        setLastName(user.lastName)
        setStudentNumber(user.studentNumber)
        setEmail(user.email)
        setCourse(user.course)
        setRole(user.role)

    }, [user])

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, error])

    return (
        <>
            <MetaData title={'My Profile'} />
            {/** add here if user.role = 'something' display , else display student profile*/}
            {loading ? (
                <Loader />
            ) : (
                <Container fluid>
                    <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                        <Card style={{ width: '40rem', align: 'center' }}>
                            <Card.Body>
                                <Card.Title style={{ margin: '50px 0 20px 0' }}>My Profile</Card.Title>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalName">
                                        <Form.Label column sm={2}>
                                            Name
                                    </Form.Label>
                                        <Col sm={6}>
                                            <Form.Control type="text" placeholder="First Name" value={firstName} disabled />
                                        </Col>
                                        <Col sm={4}>
                                            <Form.Control type="text" placeholder="Last Name" value={lastName} disabled />
                                        </Col>
                                    </Form.Group>

                                    {role === 'Student' ? (
                                        <>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalStudentNumber">
                                                <Form.Label column sm={3}>
                                                    Student number
                                            </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Student number" value={studentNumber} disabled />
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalCourse">
                                                <Form.Label column sm={2}>
                                                    Course
                                            </Form.Label>
                                                <Col sm={10}>
                                                    <Form.Control type="text" placeholder="Course" value={course} disabled />
                                                </Col>
                                            </Form.Group>
                                        </>
                                    ) : (
                                        <>
                                            <Form.Group as={Row} className="mb-3" controlId="formHorizontalRole">
                                                <Form.Label column sm={3}>
                                                    Role
                                            </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control type="text" placeholder="Role" value={role} disabled />
                                                </Col>
                                            </Form.Group>
                                        </>)}
                                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                                            <Form.Label column sm={3}>
                                                Email address
                                        </Form.Label>
                                        <Col sm={9}>
                                            <Form.Control type="email" placeholder="Email address" value={email} disabled />
                                        </Col>
                                    </Form.Group>
                                    <Button><Link to='/password/update' style={{textDecoration: 'none', color: 'white'}}>Change Password</Link></Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>
            )}
        </>
    )
}

export default Profile
