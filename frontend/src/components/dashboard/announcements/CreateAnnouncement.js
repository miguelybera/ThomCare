import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { createAnnouncement, createAnnouncementType, getAnnouncementType, clearErrors } from '../../../actions/announcementActions'
import { NEW_ANNOUNCEMENT_RESET, NEW_ANNOUNCEMENT_TYPE_RESET } from '../../../constants/announcementConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const CreateAnnouncement = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, success } = useSelector(state => state.newAnnouncement)
    const { loading: announcementTypeLoading, announcementTypes, error: announcementTypeError } = useSelector(state => state.announcementType)

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('All')
    const [course, setCourse] = useState('All')
    const [track, setTrack] = useState('All')
    const [announcementType, setAnnouncementType] = useState('All')
    const [announcementCategory, setAnnouncementCategory] = useState('')
    const [archiveDate, setArchiveDate] = useState(changeDateFormat(Date.now()))
    const [setExpiry, setSetExpiry] = useState(false)
    const [fileAttachments, setFileAttachments] = useState([])

    const levels = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year']
    const programs = ['All', 'Computer Science', 'Information Systems', 'Information Technology']

    const csTracks = ["All", "Core Computer Science", "Game Development", "Data Science"]
    const itTracks = ["All", "Network and Security", "Web and Mobile App Development", "IT Automation"]
    const isTracks = ["All", "Business Analytics", "Service Management"]

    useEffect(() => {
        dispatch(getAnnouncementType())

        if (error) {
            alert.error()
            dispatch(clearErrors())
        }

        if (announcementTypeError) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/announcements')
            alert.success('Announcement created successfully.')
            dispatch({
                type: NEW_ANNOUNCEMENT_RESET
            })
            dispatch({
                type: NEW_ANNOUNCEMENT_TYPE_RESET
            })
        }

        if (!setExpiry) {
            setArchiveDate(changeDateFormat(Date.now()))
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, success, error, announcementTypeError, setExpiry])

    useEffect(() => {
        if (yearLevel === '1st Year' || yearLevel === '2nd Year' || yearLevel === 'All') {
            setTrack('All')
        }

        if (announcementType !== 'Add new') {
            setAnnouncementCategory('')
        }
    }, [track, yearLevel, announcementType])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileAttachments([])

        files.forEach(file => {
            setFileAttachments(oldArray => [...oldArray, file])
        })
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('title', title)
        formData.set('description', description)
        formData.set('yearLevel', yearLevel)
        formData.set('course', course)
        formData.set('track', track)

        if (announcementType === 'Add new') {
            formData.set('announcementType', announcementCategory)
            dispatch(createAnnouncementType(announcementCategory))
        } else {
            formData.set('announcementType', announcementType)
        }

        formData.set('archiveDate', changeDateFormat(archiveDate))
        formData.set('setExpiry', setExpiry)

        fileAttachments.forEach(file => {
            formData.append('fileAttachments', file)
        })

        dispatch(createAnnouncement(formData))
    }

    return (
        <Fragment>
            <MetaData title={'New Announcement'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    {announcementTypeLoading ? <Loader /> : (
                        <Container fluid>
                            <h3>New Announcement</h3>
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={e => setTitle(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control
                                                as="textarea"
                                                rows={10}
                                                name="description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                                required
                                            />
                                        </Form.Group>
                                        <Row>
                                            <Form.Label>Categories</Form.Label>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={6} md={6} lg={3} xl={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Year Level</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        name="yearLevel"
                                                        value={yearLevel}
                                                        onChange={e => setYearLevel(e.target.value)}
                                                        required
                                                    >
                                                        {levels.map(level => (
                                                            <option value={level}>{level}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={6} md={6} lg={3} xl={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Course</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={course}
                                                        name="course"
                                                        onChange={e => setCourse(e.target.value)}
                                                        required
                                                    >
                                                        {programs.map(program => (
                                                            <option value={program}>{program}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={6} md={6} lg={3} xl={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Track</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        name="track"
                                                        value={track}
                                                        onChange={e => setTrack(e.target.value)}
                                                        disabled={course === 'All' || yearLevel === 'All' || yearLevel === '1st Year' || yearLevel === '2nd Year' ? true : false}
                                                        required
                                                    >
                                                        {course === 'Computer Science' ? (
                                                            <Fragment>
                                                                {csTracks.map(track => (
                                                                    <option value={track}>{track}</option>
                                                                ))}
                                                            </Fragment>
                                                        ) : (
                                                            course === 'Information Technology' ? (
                                                                <Fragment>
                                                                    {itTracks.map(track => (
                                                                        <option value={track}>{track}</option>
                                                                    ))}
                                                                </Fragment>
                                                            ) : (
                                                                <Fragment>
                                                                    {isTracks.map(track => (
                                                                        <option value={track}>{track}</option>
                                                                    ))}
                                                                </Fragment>
                                                            )
                                                        )}
                                                    </Form.Select>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={6} md={6} lg={3} xl={3}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Announcement Type</Form.Label>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        name="announcementType"
                                                        value={announcementType}
                                                        onChange={e => setAnnouncementType(e.target.value)}
                                                        required
                                                    >
                                                        <option value='All'>All</option>
                                                        {announcementTypes && announcementTypes.map(type => (
                                                            <option value={type.announcementCategory}>{type.announcementCategory}</option>
                                                        ))}
                                                        <option value='Add new'>Add new...</option>
                                                    </Form.Select>
                                                </Form.Group>
                                                <Form.Group className={announcementType !== 'Add new' ? `mb-3 d-none` : `mb-3`}>
                                                    <Form.Control
                                                        type="text"
                                                        name="announcementCategory"
                                                        value={announcementCategory}
                                                        placeholder="Add new announcement category"
                                                        onChange={e => setAnnouncementCategory(e.target.value)}
                                                        disabled={announcementType !== 'Add new' ? true : false}
                                                    />
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Check
                                                        type="checkbox"
                                                        label="Set expiry date"
                                                        defaultChecked={setExpiry}
                                                        value={setExpiry}
                                                        name="setExpiry"
                                                        onChange={e => setSetExpiry(!setExpiry)}
                                                    />
                                                    <Form.Control
                                                        type="date"
                                                        name="archiveDate"
                                                        value={archiveDate}
                                                        onChange={e => setArchiveDate(e.target.value)}
                                                        disabled={setExpiry ? false : true}
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Attach document(s):</Form.Label>
                                                    <Form.Control
                                                        type="file"
                                                        name="file"
                                                        onChange={onChange}
                                                        multiple
                                                    />
                                                </Form.Group>
                                            </Col>
                                            <Col xs={12} sm={12} md={12} lg={4} xl={4}>
                                                <Form.Label className={fileAttachments.length !== 0 ? `` : `d-none`}>Attachment(s):</Form.Label>
                                                <Form.Group className="mb-3 mt-2">
                                                    <ListGroup>
                                                        {fileAttachments && fileAttachments.map((file, idx) => (
                                                            <ListGroupItem>
                                                                File {idx+1}: {file.name}
                                                            </ListGroupItem>
                                                        ))}
                                                    </ListGroup>
                                                </Form.Group>
                                            </Col>
                                        </Row>
                                        <center>
                                            <Button
                                                type='submit'
                                                style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                                disabled={loading ? true : false}>
                                                {loading ? (
                                                    <span>
                                                        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                    </span>
                                                ) : (
                                                    <span>Create</span>
                                                )}
                                            </Button>
                                        </center>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Container>
                    )}
                </div>
            </div>
        </Fragment>
    )
}

export default CreateAnnouncement
