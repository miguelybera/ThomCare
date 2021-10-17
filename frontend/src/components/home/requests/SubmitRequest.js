import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Form, Button, Card, Container, Row, Col, OverlayTrigger, Tooltip, ListGroup, ListGroupItem } from 'react-bootstrap'
import { submitRequest, clearErrors } from './../../../actions/requestActions'
import { SUBMIT_REQUEST_RESET } from './../../../constants/requestConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import dateformat from 'dateformat'

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const SubmitRequest = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error, request } = useSelector(state => state.submitRequest)
    const { user } = useSelector(state => state.auth)

    const [fileRequirements, setFileRequirements] = useState([])
    const [section, setSection] = useState()
    const [yearLevel, setYearLevel] = useState()
    const [requestType, setRequestType] = useState()
    const [notes, setNotes] = useState()

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
        'Request for Leave of Absence',
        'Submission of Admission Memo',
        'Others'
    ]

    let alphabet = []

    const upperCase = (text) => text.toUpperCase()
    const changeDateFormat = date => dateformat(date, "mmm d, yyyy h:MMtt")

    for (let i = 0; i < 26; i++) {
        alphabet.push(upperCase((i + 10).toString(36)))
    }

    const reset = () => {
        dispatch({
            type: SUBMIT_REQUEST_RESET
        })
    }

    useEffect(() => {
        if (success) {
            alert.success('File submitted.')

            setRequestType('')
            setNotes('')
            setFileRequirements([])
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

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileRequirements([])

        files.forEach(file => {
            setFileRequirements(oldArray => [...oldArray, file])
        })
    }

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

    return (
        <>
            <MetaData title={'Submit Request'} />
            <Row>
                <Col xs={12} md={6} lg={5}>
                    <Container fluid>
                        <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                            <Card style={{ align: 'center', marginBottom: '50px' }}>
                                <h5 style={{ marginTop: '20px' }}>General Instructions</h5>
                                <Card.Body>
                                    <Card.Text>For requests such as <strong>Add/Drop Course Form, Overload Form, and Cross-enrollment forms</strong>, go to <Link to='/forms/list'>Generate Form</Link> page.</Card.Text>
                                    <Card.Text>1. Select form.</Card.Text>
                                    <Card.Text>2. Fill out the fields.</Card.Text>
                                    <Card.Text>3. Click the 'Generate Form' button.</Card.Text>
                                    <Card.Text>4. Confirm the details on the page. Click the 'Save as PDF' to download the file.</Card.Text>
                                    <Card.Text>5. Attach e-signature, if required.</Card.Text>
                                    <Card.Text>6. Submit the document by filling out the <strong>Submit Request</strong> form.</Card.Text>
                                    <Card.Text>7. Attach the required documents.</Card.Text>
                                    <Card.Text>8. Click the 'Submit' button.</Card.Text>
                                    <hr />
                                    <Card.Text>For other requests <strong>not available</strong> in the Generate Forms page, go to <Link to='/downloadable/forms/list'>Downloadable Forms</Link> page.</Card.Text>
                                    <Card.Text>1. Select form to download.</Card.Text>
                                    <Card.Text>2. Fill out the fields in the document.</Card.Text>
                                    <Card.Text>3. Submit the document by filling out the <strong>Submit Request</strong> form.</Card.Text>
                                    <Card.Text>4. Attach the required documents.</Card.Text>
                                    <Card.Text>5. Click the 'Submit' button.</Card.Text>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Container>
                </Col>
                <Col xs={12} md={6} lg={7}>
                    {!success ? (
                        <Container fluid>
                            <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                                <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                                    <Card.Body>
                                        <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Submit Request</Card.Title>
                                        <Form onSubmit={submitHandler}>
                                            <Row>
                                                <Col xs={12} sm={12} md={6}>
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
                                                </Col>
                                                <Col xs={12} sm={12} md={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Section: </Form.Label>
                                                        <Form.Select
                                                            aria-label="Default select example"
                                                            name='section'
                                                            value={section}
                                                            onChange={e => setSection(e.target.value)}
                                                            required
                                                        >
                                                            <option value=''>-</option>
                                                            <option value='Alumni'>Alumni</option>
                                                            {alphabet.map(letter => (
                                                                <option value={letter}>{letter}</option>
                                                            ))}
                                                        </Form.Select>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
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
                                                <Form.Label>Notes: </Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    placeholder="(Optional)"
                                                    rows={4}
                                                    name='notes'
                                                    value={notes}
                                                    onChange={e => setNotes(e.target.value)}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>
                                                    Attachments: &nbsp;
                                                    <OverlayTrigger
                                                        placement='bottom-start'
                                                        overlay={
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
                                            <Form.Group className="mb-3">
                                                <ListGroup>
                                                    {fileRequirements.map((file, idx) => (
                                                        <ListGroupItem>
                                                            File {idx + 1}: {file.name}
                                                        </ListGroupItem>
                                                    ))}
                                                </ListGroup>
                                            </Form.Group>
                                            <center>
                                                <Button
                                                    type='submit'
                                                    style={{ margin: '10px 5px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={loading || user.role !== 'Student' ? true : false}
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
                                        <Card.Text><span className='text-muted'><strong>Date submitted:</strong> {changeDateFormat(request.createdAt)}</span></Card.Text>
                                        <Card.Text><b>Name:</b> {request?.requestorInfo.lastName}, {request?.requestorInfo.firstName}</Card.Text>
                                        <Card.Text><b>Request Type:</b> {request?.requestType}</Card.Text>
                                        <Card.Text><b>Notes:</b> {request?.notes}</Card.Text>
                                        <Card.Text>
                                            Attachments:
                                            <ListGroup>
                                                {request?.fileRequirements.map((file, idx) => (
                                                    <ListGroupItem>
                                                        {file.originalname} <span style={{ margin: '0 5px', fontSize: '1rem' }} className="text-muted">
                                                            {Number(file.size / 1000000).toFixed(2)} MB
                                                        </span> <span style={{ margin: '0 5px' }}>
                                                            <a href={file.path} target="_blank" rel="noreferrer">
                                                                <button className="btn btn-primary py-1 px-2 ml-2">
                                                                    <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                                                </button>
                                                            </a>
                                                        </span>
                                                    </ListGroupItem>
                                                ))}
                                            </ListGroup>
                                        </Card.Text>
                                        <Card.Text>
                                            <center><Button variant='outline-danger' onClick={() => reset()}>Back</Button></center>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Fragment>
                        )
                    }
                </Col>
            </Row >
        </>
    )
}

export default SubmitRequest