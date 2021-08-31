import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { UPDATE_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import { getAnnouncementDetails, updateAnnouncement, clearErrors } from '../../actions/announcementActions'

// <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>

var dateFormat = require('dateformat')

const UpdateAnnouncement = ({ history, match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: announcementLoading, error, announcement } = useSelector(state => state.announcementDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.announcement)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [announcementType, setAnnouncementType] = useState('')
    const [archiveDate, setArchiveDate] = useState('')
    const [setExpiry, setSetExpiry] = useState()
    const [fileAttachments, setFileAttachments] = useState([])
    const [filePath, setFilePath] = useState('')

    const levels = ['All', '1st Year', '2nd Year', '3rd Year', '4th Year']

    const programs = ['All', 'Computer Science', 'Information Systems', 'Information Technology']

    const csTracks = [
        "All",
        "Core Computer Science",
        "Game Development",
        "Data Science"
    ]

    const itTracks = [
        "All",
        "Network and Security",
        "Web and Mobile App Development",
        "IT Automation"
    ]

    const isTracks = [
        "All",
        "Business Analytics",
        "Service Management"
    ]


    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('title', title)
        formData.set('description', description)
        formData.set('yearLevel', yearLevel)
        formData.set('course', course)
        formData.set('track', track)
        formData.set('announcementType', announcementType)
        if (!setExpiry) {
            formData.set('archiveDate', '3000-01-01')
        } else {
            formData.set('archiveDate', changeDateFormat(archiveDate))
        }
        formData.set('setExpiry', setExpiry)

        dispatch(updateAnnouncement(announcement._id, formData))
    }

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")

    const announcementId = match.params.id

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
            setFileAttachments(announcement.fileAttachments)
            setFilePath(announcement.fileAttachments[0].path)
        } else {
            dispatch(getAnnouncementDetails(announcementId))
        }
    }, [announcement])

    useEffect(() => {

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_ANNOUNCEMENT_RESET
            })
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
            dispatch({
                type: UPDATE_ANNOUNCEMENT_RESET
            })
        }

        if (isUpdated) {
            window.history.back()
            dispatch(getAnnouncementDetails(announcementId))
            alert.success('Announcement updated successfully.')

            dispatch({
                type: UPDATE_ANNOUNCEMENT_RESET
            })
        }

    }, [dispatch, error, alert, isUpdated, updateError, announcement, announcementId, history])

    const onChange = e => {
        setFileAttachments(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'Update Announcement'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Control Panel</h1>
                    <Container className="space_inside"></Container>

                    <Container fluid>
                        <h3>Update Announcement</h3>
                        {announcementLoading ? <Loader /> : (
                            <Card>
                                <Card.Body>
                                    <Form onSubmit={submitHandler}>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Title</Form.Label>
                                            <Form.Control type="text" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress1">
                                            <Form.Label>Description</Form.Label>
                                            <Form.Control as="textarea" rows={10} name="description" value={description} onChange={e => setDescription(e.target.value)} />
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formGridAddress2">
                                            <Form.Label>Year Level</Form.Label>
                                            <Form.Select aria-label="Default select example" name="yearLevel" value={yearLevel} onChange={e => setYearLevel(e.target.value)}>
                                                {levels.map(level => (
                                                    <option value={level}>{level}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Label>Course</Form.Label>
                                            <Form.Select aria-label="Default select example" value={course} name="course" onChange={e => setCourse(e.target.value)} required>
                                                {programs.map(program => (
                                                    <option value={program}>{program}</option>
                                                ))}
                                            </Form.Select>
                                            <Form.Label>Track</Form.Label>
                                            <Form.Select aria-label="Default select example" name="track" value={track} onChange={e => setTrack(e.target.value)} disabled={course === 'All' ? true : false}>
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
                                            <Form.Label>Announcement Type</Form.Label>
                                            <Form.Select aria-label="Default select example" name="announcementType" value={announcementType} onChange={e => setAnnouncementType(e.target.value)}>
                                                <option value='All'>-</option>
                                                <option value="Memorandum">Memorandum</option>
                                                <option value="Enrollment">Enrollment</option>
                                                <option value="Class Suspension">Class Suspension</option>
                                            </Form.Select>
                                        </Form.Group>
                                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                            <Form.Check type="checkbox" label="Set expiry date" defaultChecked={setExpiry} value={setExpiry} nme="setExpiry" onClick={() => { setSetExpiry(!setExpiry) }} />
                                            <Form.Control type="date" name="archiveDate" value={archiveDate} onChange={e => setArchiveDate(e.target.value)} disabled={setExpiry ? false : true} />
                                        </Form.Group>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Attach image(s):</Form.Label>
                                            <Form.Control type="file" multiple />
                                        </Form.Group>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Attach document(s):</Form.Label>
                                            <Form.Control type="file" name="file" onChange={onChange} />
                                        </Form.Group>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label href={filePath}>Download PDF</Form.Label>
                                        </Form.Group>
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
                                    </Form>
                                </Card.Body>
                            </Card>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>

    )
}

export default UpdateAnnouncement
