import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import ReactQuill from 'react-quill'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAnnouncementDetails, getAnnouncementType, createAnnouncementType, updateAnnouncement, clearErrors } from '../../../actions/announcementActions'
import { ANNOUNCEMENT_DETAILS_RESET, NEW_ANNOUNCEMENT_TYPE_RESET, UPDATE_ANNOUNCEMENT_RESET } from '../../../constants/announcementConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import { modules, formats } from '../../../quill-templates/template'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import 'react-quill/dist/quill.snow.css'
import dateformat from 'dateformat'

const UpdateAnnouncement = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: announcementLoading, error, announcement } = useSelector(state => state.announcementDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.announcement)
    const { loading: announcementTypeLoading, announcementTypes, error: announcementTypeError } = useSelector(state => state.announcementType)

    const changeDateFormat = (date) => dateformat(date, "yyyy-mm-dd")

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [announcementType, setAnnouncementType] = useState('')
    const [announcementCategory, setAnnouncementCategory] = useState('')
    const [archiveDate, setArchiveDate] = useState('')
    const [setExpiry, setSetExpiry] = useState()
    const [fileAttachments, setFileAttachments] = useState([])
    const [oldAttachments, setOldAttachments] = useState([])
    const [ctr, setCtr] = useState(0)

    const levels = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year']
    const programs = ['All', 'Computer Science', 'Information Systems', 'Information Technology']
    const csTracks = ["All", "Core Computer Science", "Game Development", "Data Science"]
    const itTracks = ["All", "Network and Security", "Web and Mobile App Development", "IT Automation"]
    const isTracks = ["All", "Business Analytics", "Service Management"]

    const announcementId = match.params.id

    useEffect(() => {
        dispatch(getAnnouncementType())

        if (announcementTypeError) {
            alert.error(announcementTypeError)
            dispatch(clearErrors())

            history.push('/error')
        }
    }, [dispatch, history, alert, announcementTypeError])

    useEffect(() => {
        if (announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        } else if (announcement) {
            setTitle(announcement.title)
            setDescription(announcement.description)
            setYearLevel(announcement.yearLevel)
            setCourse(announcement.course)
            setTrack(announcement.track)
            setAnnouncementType(announcement.announcementType)
            setArchiveDate(changeDateFormat(announcement.archiveDate))
            setSetExpiry(announcement.setExpiry)
            setOldAttachments(announcement.fileAttachments)
        } else {
            dispatch(getAnnouncementDetails(announcementId))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            dispatch({
                type: UPDATE_ANNOUNCEMENT_RESET
            })

            dispatch({
                type: NEW_ANNOUNCEMENT_TYPE_RESET
            })

            dispatch({
                type: ANNOUNCEMENT_DETAILS_RESET
            })
            window.history.back()
            alert.success('Announcement updated successfully.')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, isUpdated, updateError, announcement, announcementId, history])

    useEffect(() => {
        if (!setExpiry && ctr > 0) {
            setArchiveDate(changeDateFormat(Date.now()))
        }

    }, [ctr, setExpiry])

    useEffect(() => {
        if (yearLevel === '1st Year' || yearLevel === '2nd Year' || yearLevel === 'All') {
            setTrack('All')
        }
    }, [track, yearLevel])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileAttachments([])
        setOldAttachments([])

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

        formData.set('setExpiry', setExpiry)
        formData.set('archiveDate', changeDateFormat(archiveDate))

        fileAttachments.forEach(file => {
            formData.append('fileAttachments', file)
        })

        dispatch(updateAnnouncement(announcement._id, formData))
    }
    const setAttachments = () => {
        const data = {
            columns: [
                {
                    label: 'File name',
                    field: 'fileName',
                    width: 750
                },
                {
                    label: 'File Size',
                    field: 'fileSize',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'action',
                    width: 100
                }
            ],
            rows: []
        }

        oldAttachments && oldAttachments.forEach(file => {
            data.rows.push({
                fileName: file.originalname,
                fileSize: Number(file.size / 1000000).toFixed(2) + ' MB',
                action: <Fragment>
                    <a href={file.path} target="_blank" rel="noreferrer">
                        <button className="btn btn-primary py-1 px-2 ml-2">
                            <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </button>
                    </a>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Update Announcement'} />
            <Sidebar />
            {announcementTypeLoading ? <Loader /> : (
                <Container fluid style={{ padding: "50px 20px", marginTop: '50px' }}>
                    <center><h3>Update announcement</h3></center>
                    {announcementLoading || announcementTypeLoading ? <Loader /> : (
                        <Container fluid>
                            <Card style={{ width: '100%', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
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
                                            <ReactQuill
                                                placeholder="Write something..."
                                                name="description"
                                                value={description}
                                                onChange={e => setDescription(e)}
                                                modules={modules}
                                                format={formats}
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
                                                        name="track" value={track}
                                                        onChange={e => setTrack(e.target.value)}
                                                        disabled={course === 'All' || yearLevel === 'All' || yearLevel === '1st Year' || yearLevel === '2nd Year' ? true : false}
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
                                                        onClick={() => {
                                                            setSetExpiry(!setExpiry)
                                                            setCtr(ctr + 1)
                                                        }}
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
                                            <Col xs={12} sm={12} md={12} lg={8} xl={8}>
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
                                            <Col xs={12}>
                                                <Form.Group className="mb-3">
                                                    <Form.Label className={oldAttachments.length !== 0 || fileAttachments.length !== 0 ? `` : `d-none`}>
                                                        Attachment(s):
                                                    </Form.Label>
                                                    {oldAttachments.length !== 0 && <MDBDataTableV5
                                                        data={setAttachments()}
                                                        searchTop
                                                        pagingTop
                                                        scrollX
                                                        entriesOptions={[5, 20, 25]}
                                                        entries={10}
                                                        style={{ backgroundColor: 'white' }}
                                                    />}
                                                    <ListGroup>
                                                        {fileAttachments && fileAttachments.map(file => (
                                                            <ListGroupItem>
                                                                {file.name}
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
                                                    <span>Update</span>
                                                )}
                                            </Button>
                                        </center>
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Container>
                    )}
                </Container>
            )}
        </Fragment>

    )
}

export default UpdateAnnouncement
