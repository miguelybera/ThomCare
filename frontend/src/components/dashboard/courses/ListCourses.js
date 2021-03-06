import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAllCourses, deleteCourse, clearErrors } from '../../../actions/courseActions'
import { DELETE_COURSE_RESET } from '../../../constants/courseConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'

const ListCourses = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, courses, error } = useSelector(state => state.courses)
    const { isDeleted, error: deleteError } = useSelector(state => state.course)

    const [show, setShow] = useState(false)
    const [id, setId] = useState('')

    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    useEffect(() => {
        dispatch(getAllCourses())

        if (isDeleted) {
            alert.success('Course deleted.')
            history.push('/admin/courses')

            dispatch({
                type: DELETE_COURSE_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isDeleted, deleteError])

    const deleteCourseHandler = id => {
        dispatch(deleteCourse(id))
        handleClose()
    }

    const setCourses = () => {
        const data = {
            columns: [
                {
                    label: 'Course Code',
                    field: 'courseCode',
                    width: 145
                },
                {
                    label: 'Course Name',
                    field: 'courseName',
                    width: 270
                },
                {
                    label: 'Lec Units',
                    field: 'lecUnits',
                    width: 135
                },
                {
                    label: 'Lab Units',
                    field: 'labUnits',
                    width: 135
                },
                {
                    label: 'Available?',
                    field: 'available',
                    width: 135
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 180
                }
            ],
            rows: []
        }

        courses.forEach(course => {
            data.rows.push({
                courseCode: course.courseCode,
                courseName: course.courseName,
                lecUnits: course.lecUnits + ' units',
                labUnits: course.labUnits + ' units',
                available: <Fragment>
                    <p style={{
                        color: course.available === 'No' ? 'red' : 'green'
                    }}>
                        {course.available}
                    </p>
                </Fragment>,
                actions: <Fragment>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Edit
                            </Tooltip>
                        }>
                        <Link to={`/admin/course/${course._id}`}>
                            <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                                <i class="fa fa-edit" aria-hidden="true" style={{ textDecoration: 'none' }} />
                            </Button>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Delete
                            </Tooltip>
                        }>
                        <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                            setId(course._id)
                            handleShow()
                        }}>
                            <i class="fa fa-trash" aria-hidden="true" />
                        </Button>
                    </OverlayTrigger>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Courses'} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this course?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => deleteCourseHandler(id)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                                <h3>Courses</h3>
                            </div>
                            <div style={{ marginLeft: '2px', marginTop: '30px', marginRight: '2px' }}>
                                <Link to='/admin/new/course' style={{ textDecoration: 'none', color: 'white' }}>
                                    <Button variant="outline-secondary">
                                        Add course
                                    </Button>
                                </Link>
                            </div>
                        </div>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setCourses()}
                                    searchTop
                                    searchBottom={false}

                                    scrollX
                                    entriesOptions={[10, 20, 30, 40, 50]}
                                    entries={10}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListCourses