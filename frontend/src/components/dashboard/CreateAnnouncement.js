import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import { NEW_ANNOUNCEMENT_RESET } from '../../constants/announcementConstants'
import { createAnnouncement, clearErrors } from '../../actions/announcementActions'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

// <Card.Title style={{margin: '50px 0 20px 0'}}>Register an account</Card.Title>
// hello testing 
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
    const [fileAttachments, setFileAttachments] = useState([])

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")

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
        formData.set('archiveDate', changeDateFormat(archiveDate))
        formData.set('setExpiry', setExpiry)
        formData.set('fileAttachments', fileAttachments)

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

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, success, error])

    const onChange = e => {
        setFileAttachments(e.target.files[0])
    }

    return (
        <Fragment>
            <MetaData title={'New Announcement'} />
            <Sidebar />
            <div className="row">
                <div className="">
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
                                        <Form.Check type="checkbox" label="Set expiry date" defaultChecked={setExpiry} value={setExpiry} nme="setExpiry" onChange={e => setSetExpiry(!setExpiry)} />
                                        <Form.Control type="date" name="archiveDate" value={archiveDate} onChange={e => setArchiveDate(e.target.value)} disabled={setExpiry ? false : true} />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Attach image(s):</Form.Label>
                                        <Form.Control type="file" multiple />
                                    </Form.Group>
                                    <Form.Group controlId="formFileMultiple" className="mb-3">
                                        <Form.Label>Attach document(s):</Form.Label>
                                        <Form.Control type="file" name="file" onChange={onChange} multiple/>
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
                                            <span>Create</span>
                                        )}
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Container>
                </div>
            </div>
        </Fragment >
    )
}

export default CreateAnnouncement
