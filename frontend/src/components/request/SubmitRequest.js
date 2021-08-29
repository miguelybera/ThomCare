import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { submitRequest, clearErrors } from './../../actions/requestActions'
import { SUBMIT_REQUEST_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

const SubmitRequest = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.request)

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        formData.set('fileRequirements', fileRequirements)
        formData.set('requestorSection', requestorSection)
        formData.set('requestorYearLevel', requestorYearLevel)
        formData.set('requestorNotes', requestorNotes)
        formData.set('requestType', requestType)


        dispatch(submitRequest(formData))
    }

    const [fileRequirements, setFileRequirements] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false)
    const [requestorSection, setRequestorSection] = useState()
    const [requestorYearLevel, setRequestorYearLevel] = useState()
    const [requestType, setRequestType] = useState()
    const [requestorNotes, setRequestorNotes] = useState()

    const onChange = e => {
        setFileRequirements(e.target.files[0])
        setIsFilePicked(true)
    }

    const requestTypes = [
        'Adding/Dropping of Course',
        'Cross Enrollment within CICS',
        'Request for Petition Classes within CICS',
        'Request for Crediting of Courses',
        'Request for Overload',
        'Request for late enrollment',
        'Request for manual enrollment',
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Others'
    ]

    useEffect(() => {
        if(success) {
            alert.success('File submitted.')
            history.push('/')
            dispatch({
                type: SUBMIT_REQUEST_RESET
            })
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, success, error, history])

    return (
        <>
            <MetaData title={'Login'} />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '50px 0 20px 0' }}>Submit Request</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Section"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='requestorSection'
                                            value={requestorSection}
                                            onChange={e => setRequestorSection(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Year Level"
                                        className="mb-3"
                                        name='requestorYearLevel'
                                        value={requestorYearLevel}
                                        onChange={e => setRequestorYearLevel(e.target.value)}
                                    >
                                        <Form.Control
                                            type='text'
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <Form.Label>Request Type</Form.Label>
                                    <Form.Select
                                        aria-label="Default select example" 
                                        name='requestType'
                                        value={requestType}
                                        onChange={e => setRequestType(e.target.value)}
                                        required>
                                        <option>-</option>
                                        {requestTypes.map(type => (
                                            <option value={type}>{type}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Notes"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='requestorNotes'
                                            value={requestorNotes}
                                            onChange={e => setRequestorNotes(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <Form.Label>Attachments</Form.Label>
                                    <Form.Control type="file" name="file" onChange={onChange} />
                                </Form.Group>
                                <Button
                                    type='submit'
                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                    disabled={loading ? true : false}
                                >Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default SubmitRequest