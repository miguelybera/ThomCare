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

    const { loading: announcementLoading, error, success, announcement } = useSelector(state => state.announcementDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.announcement)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('')
    const [course, setCourse] = useState('')
    const [track, setTrack] = useState('')
    const [announcementType, setAnnouncementType] = useState('')
    const [archiveDate, setArchiveDate] = useState('')
    const [setExpiry, setSetExpiry] = useState(false)

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('title', title)
        formData.set('description', description)
        formData.set('yearLevel', yearLevel)
        formData.set('course', course)
        formData.set('track', track)
        formData.set('announcementType', announcementType)
        formData.set('archiveDate', archiveDate)
        formData.set('setExpiry', setExpiry)

        dispatch(updateAnnouncement(announcement._id, formData))
    }

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")

    const announcementId = match.params.id

    let announcementTitle = ''
    let announcementDescription = ''
    let announcementYearLevel = ''
    let announcementCourse = ''
    let announcementTrack = ''
    let announcementAnnouncementType = ''
    let announcementArchiveDate = ''

    if (announcement && announcement.title) { announcementTitle = announcement.title }
    if (announcement && announcement.description) { announcementDescription = announcement.description }
    if (announcement && announcement.yearLevel) { announcementYearLevel = announcement.yearLevel }
    if (announcement && announcement.course) { announcementCourse = announcement.course }
    if (announcement && announcement.track) { announcementTrack = announcement.track }
    if (announcement && announcement.announcementType) { announcementAnnouncementType = announcement.announcementType }
    if (announcement && announcement.archiveDate) { announcementArchiveDate = announcement.archiveDate }

    useEffect(() => {
        if (announcement && announcement._id !== announcementId) {
            dispatch(getAnnouncementDetails(announcementId))
        }
        else {
            setTitle(announcementTitle)
            setDescription(announcementDescription)
            setYearLevel(announcementYearLevel)
            setCourse(announcementCourse)
            setTrack(announcementTrack)
            setAnnouncementType(announcementAnnouncementType)
            setArchiveDate(changeDateFormat(announcementArchiveDate))
            if(archiveDate !== '3000-01-01') {
                setSetExpiry(true)
            }
        }

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
            history.push('/admin/announcements')
            dispatch(getAnnouncementDetails(announcementId))
            alert.success('Announcement updated successfully.')

            dispatch({
                type: UPDATE_ANNOUNCEMENT_RESET
            })
        }

    }, [dispatch, error, alert, isUpdated, updateError, announcement, announcementId, history])


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
                                                <option value='All'>-</option>
                                                <option value="1st Year">First Year</option>
                                                <option value="2nd Year">Second Year</option>
                                                <option value="3rd Year">Third Year</option>
                                                <option value="4th Year">Fourth Year</option>
                                            </Form.Select>
                                            <Form.Label>Course</Form.Label>
                                            <Form.Select aria-label="Default select example" name="course" value={course} onChange={e => setCourse(e.target.value)}>
                                                <option value='All'>-</option>
                                                <option value="Computer Science">Computer Science</option>
                                                <option value="Information Systems">Information Systems</option>
                                                <option value="Information Technology">Information Technology</option>
                                            </Form.Select>
                                            <Form.Label>Track</Form.Label>
                                            <Form.Select aria-label="Default select example" name="track" value={track} onChange={e => setTrack(e.target.value)}>
                                                <option value='All'>-</option>
                                                <option value="Web and Mobile App Development">Web and Mobile App Development</option>
                                                <option value="Network and Security">Network and Security</option>
                                                <option value="IT Automation">IT Automation</option>
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
                                            <Form.Check type="checkbox" label="Set expiry date" defaultChecked={setExpiry} value={setExpiry} nme="setExpiry" onChange={e => setSetExpiry(!setExpiry)}/>
                                            <Form.Control type="date" name="archiveDate" value={archiveDate} onChange={e => setArchiveDate(changeDateFormat(e.target.value))} disabled={setExpiry ? false : true}/>
                                        </Form.Group>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Attach image(s):</Form.Label>
                                            <Form.Control type="file" multiple />
                                        </Form.Group>
                                        <Form.Group controlId="formFileMultiple" className="mb-3">
                                            <Form.Label>Attach document(s):</Form.Label>
                                            <Form.Control type="file" multiple />
                                        </Form.Group>
                                        <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} disabled={loading ? true : false}>Update</Button>
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
