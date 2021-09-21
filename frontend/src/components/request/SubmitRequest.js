import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { submitRequest, clearErrors } from './../../actions/requestActions'
import { SUBMIT_REQUEST_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import { FloatingLabel, Form, Button, Card, Container, Row, Col, Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const SubmitRequest = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error, request } = useSelector(state => state.form)

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        fileRequirements.forEach(file => {
            formData.append('fileRequirements', file)
        })
        formData.set('section', section)
        formData.set('yearLevel', yearLevel)
        formData.set('notes', notes)
        formData.set('requestType', requestType)

        dispatch(submitRequest(formData))
    }

    const [fileRequirements, setFileRequirements] = useState()
    const [section, setSection] = useState()
    const [yearLevel, setYearLevel] = useState()
    const [requestType, setRequestType] = useState()
    const [notes, setNotes] = useState()

    const upperCase = (text) => text.toUpperCase()

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileRequirements([])

        files.forEach(file => {
            setFileRequirements(oldArray => [...oldArray, file])
        })
    }
    const levels = ['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni']

    const requestTypes = [
        'Adding/Dropping of Course',
        'Cross Enrollment within CICS',
        'Cross Enrollment outside CICS',
        'Request for Petition Classes within CICS',
        'Request for Crediting of Courses',
        'Request for Overload',
        'Request to Override',
        'Request for Late Enrollment',
        'Request for Manual Enrollment',
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Others'
    ]

    useEffect(() => {
        if (success) {
            alert.success('File submitted.')

            setRequestType('')
            setNotes('')
            setFileRequirements('')
            setSection('')
            setYearLevel('')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, success, error])

    const reset = () => {
        dispatch({
            type: SUBMIT_REQUEST_RESET
        })
    }
    return (
        <>
            <MetaData title={'Submit Request'} />
            {!success ? (
                <Container fluid>
                    <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                        <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                            <Card.Body>
                                <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Submit Request</Card.Title>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            label="Section"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type='text'
                                                placeholder="A"
                                                name='section'
                                                value={section}
                                                onChange={e => setSection(upperCase(e.target.value))}
                                                pattern="([A-z]){1}"
                                                maxlength="1"
                                                required
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Year Level: </Form.Label>
                                        <Form.Select
                                            className="mb-3"
                                            aria-label="Default select example"
                                            name="yearLevel" value={yearLevel}
                                            onChange={e => setYearLevel(e.target.value)}
                                            required
                                        >
                                            <option value=''>-</option>
                                            {levels.map(level => (
                                                <option value={level}>{level}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Request Type: </Form.Label>
                                        <Form.Select
                                            aria-label="Default select example"
                                            name='requestType'
                                            value={requestType}
                                            onChange={e => setRequestType(e.target.value)}
                                            required
                                        >
                                            <option value=''>-</option>
                                            {requestTypes.map(type => (
                                                <option value={type}>{type}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <FloatingLabel
                                            label="Notes"
                                            className="mb-3"
                                        >
                                            <Form.Control
                                                type='text'
                                                name='notes'
                                                value={notes}
                                                onChange={e => setNotes(e.target.value)}
                                            />
                                        </FloatingLabel>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>
                                            Attachments:
                                            <OverlayTrigger placement='bottom-start' overlay={
                                                <Tooltip id="tooltip-disabled" >
                                                    Accepted File Formats:
                                                    <ul style={{ textAlign: 'left' }}>
                                                        <li>PDF</li>
                                                        <li>JPG</li>
                                                        <li>PNG</li>
                                                        <li>Word File</li>
                                                        <li>Excel File</li>
                                                    </ul>
                                                </Tooltip >
                                            }>
                                                <span class="fa fa-question-circle" style={{ marginRight: '.3rem' }} />
                                            </OverlayTrigger>
                                        </Form.Label>
                                        <Form.Control type="file" name="fileRequirements" onChange={onChange} multiple required />
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
            )
                : (
                    <Fragment style={{ marginTop: '30px' }}>
                        <Card style={cardStyle}>
                            <Card.Body>
                                <Card.Title>Tracking ID#: {request?.trackingNumber}</Card.Title>
                                <Card.Text><b>Name:</b> {request?.requestorInfo.lastName}, {request?.requestorInfo.firstName}</Card.Text>
                                <Card.Text><b>Request Type:</b> {request?.requestType}</Card.Text>
                                <Card.Text><b>Notes:</b> {request?.notes}</Card.Text>
                                <Card.Text>
                                    Attachments:
                                    <ul>
                                        {request?.fileRequirements.map(file => (
                                            <li><a href={file.path}>{file.originalname}</a></li>
                                        ))}
                                    </ul>
                                </Card.Text>
                                <Card.Text>
                                    <Button onClick={() => reset()}>Submit Request Again</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Fragment>
                )}
        </>
    )
}

export default SubmitRequest