import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import { NEW_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import { createAnnouncement, clearErrors } from '../../actions/announcementActions'

// <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>

var dateFormat = require('dateformat')

const CreateAnnouncement = ({ history }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, success } = useSelector(state => state.newAnnouncement)

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [yearLevel, setYearLevel] = useState('All')
    const [course, setCourse] = useState('All')
    const [track, setTrack] = useState('All')
    const [announcementType, setAnnouncementType] = useState('All')
    const [archiveDate, setArchiveDate] = useState('')
    const [setExpiry, setSetExpiry] = useState(false)

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()

        formData.set('title', title)
        formData.set('description', description)
        formData.set('yearLevel', yearLevel)
        formData.set('course', course)
        formData.set('track', track)
        formData.set('announcementType', announcementType)
        formData.set('archiveDate', changeDateFormat(archiveDate))
        formData.set('setExpiry', setExpiry)

        dispatch(createAnnouncement(formData))
    }

    useEffect(() => {
        if (error) {
            alert.error()
            dispatch(clearErrors())
        }

        if (success) {
            history.push('/admin/announcements')
            alert.success('Announcement created successfully.')
            dispatch({
                type: NEW_ANNOUNCEMENT_RESET
            })
        }
    }, [dispatch, alert, success, error])

    console.log(setExpiry)

    return (
        <Fragment>
            <MetaData title={'New Announcement'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>

                <div className="col-12 col-md-10">
                    <h1 className="my-4">Control Panel</h1>

                    <Container className="space_inside"></Container>

                    <Container fluid>
                        <h3>New Announcement</h3>
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
                                        <Form.Control type="date" name="archiveDate" value={archiveDate} onChange={e => setArchiveDate(e.target.value)} disabled={setExpiry ? false : true} />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Attach image(s):</Form.Label>
                                        <Form.Control type="file" multiple />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Attach document(s):</Form.Label>
                                        <Form.Control type="file" multiple />
                                    </Form.Group>
                                    <Button type='submit' style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }} disabled={loading ? true : false}>Create</Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default CreateAnnouncement
