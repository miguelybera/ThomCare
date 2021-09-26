import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import { createCourse, clearErrors } from '../../../actions/courseActions'
import { NEW_COURSE_RESET } from '../../../constants/courseConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Sidebar from '../../layout/Sidebar'

const CreateCourse = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.newCourse)

    const [courseName, setCourseName] = useState()
    const [courseCode, setCourseCode] = useState()
    const [lecUnits, setLecUnits] = useState()
    const [labUnits, setLabUnits] = useState()

    useEffect(() => {
        if (success) {
            alert.success('Course created.')
            history.push('/admin/courses')

            dispatch({
                type: NEW_COURSE_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, success, error])

    const submitHandler = e => {
        e.preventDefault()

        const formData = {
            courseCode,
            courseName,
            lecUnits,
            labUnits
        }

        dispatch(createCourse(formData))
    }
    
    return (
        <>
            <MetaData title={'New Course'} />
            <Sidebar />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>New Course</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Course Code"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                        type='text'
                                        name='courseCode'
                                        value={courseCode}
                                        onChange={e => setCourseCode(e.target.value)}
                                        required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Course Name"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='courseName'
                                            value={courseName}
                                            onChange={e => setCourseName(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Lecture Units"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='lecUnits'
                                            value={lecUnits}
                                            onChange={e => setLecUnits(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Laboratory Units"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='labUnits'
                                            value={labUnits}
                                            onChange={e => setLabUnits(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <center>
                                    <Button
                                        type='submit'
                                        style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                    >
                                        {loading ? (
                                            <span>
                                                <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                            </span>
                                        ) : (
                                            <span>Submit</span>
                                        )}
                                    </Button>
                                </center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default CreateCourse