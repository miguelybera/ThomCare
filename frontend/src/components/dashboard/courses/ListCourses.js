import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getCourses, deleteCourse, clearErrors } from '../../../actions/courseActions'
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

    const [show, setShow] = useState(false);
    const [id, setId] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getCourses())

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
                    width: 150
                },
                {
                    label: 'Course Name',
                    field: 'courseName',
                    width: 300
                },
                {
                    label: 'Lec Units',
                    field: 'lecUnits',
                    width: 100
                },
                {
                    label: 'Lab Units',
                    field: 'labUnits',
                    width: 100
                },
                {
                    label: 'Total Units',
                    field: 'totalUnits',
                    width: 100
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
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
                totalUnits: Number(course.lecUnits) + Number(course.labUnits) + ' units',
                actions: <Fragment>
                    <Link to={`/admin/course/${course._id}`}>
                        <Button variant="warning" className="mr-5" style={{ margin: '5px' }}>
                            <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                    <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        setId(course._id)
                        handleShow()
                    }}>
                        <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
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
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Courses</h3>
                        <Link to='/admin/new/course'>
                            <Button>
                                Add new course
                            </Button>
                        </Link>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setCourses()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
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