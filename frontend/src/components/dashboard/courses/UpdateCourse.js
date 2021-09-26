import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import { getCourseDetails, updateCourse, clearErrors } from '../../../actions/courseActions'
import { COURSE_DETAILS_RESET, UPDATE_COURSE_RESET } from '../../../constants/courseConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import Sidebar from '../../layout/Sidebar'

const CreateCourse = ({ history, match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, course } = useSelector(state => state.courseDetails)
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector(state => state.course)

    const [courseCode, setCourseCode] = useState()
    const [courseName, setCourseName] = useState()
    const [lecUnits, setLecUnits] = useState()
    const [labUnits, setLabUnits] = useState()

    const courseId = match.params.id

    useEffect(() => {
        if (course && course._id !== courseId) {
            dispatch(getCourseDetails(courseId))
        } else if (course) {
            setCourseCode(course.courseCode)
            setCourseName(course.courseName)
            setLecUnits(course.lecUnits)
            setLabUnits(course.labUnits)
        } else {
            dispatch(getCourseDetails(courseId))
        }

        if (isUpdated) {
            alert.success('Course successfully updated.')
            history.push('/admin/courses')

            dispatch({
                type: UPDATE_COURSE_RESET
            })
            
            dispatch({
                type: COURSE_DETAILS_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, isUpdated, error, updateError, course, courseId])

    const submitHandler = e => {
        e.preventDefault()

        const courseData = {
            courseCode,
            courseName,
            lecUnits,
            labUnits
        }

        dispatch(updateCourse(courseId, courseData))
    }

    return (
        <>
            <MetaData title={'Update Course Information'} />
            <Sidebar />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Update Course Information</Card.Title>
                            {loading ? <Loader /> : (
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
                                            disabled={updateLoading ? true : false}
                                        >
                                            {updateLoading ? (
                                                <span>
                                                    <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                </span>
                                            ) : (
                                                <span>Update</span>
                                            )}
                                        </Button>
                                    </center>
                                </Form>
                            )}
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default CreateCourse