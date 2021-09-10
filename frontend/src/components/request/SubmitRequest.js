import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { submitRequest, clearErrors } from './../../actions/requestActions'
import { SUBMIT_REQUEST_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

const SubmitRequest = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.requestDetails)

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

    const onChange = e => {
        const files = Array.from(e.target.files)

        setFileRequirements([])

        files.forEach(file => {
            setFileRequirements(oldArray => [...oldArray, file])
        })
    }
    const levels = ['1st Year', '2nd Year', '3rd Year', '4th Year']

    const requestTypes = [
        'Adding/Dropping of Course',
        'Cross Enrollment within CICS',
        'Request for Petition Classes within CICS',
        'Request for Crediting of Courses',
        'Request for Overload',
        'Request for Late Enrollment',
        'Request for Manual Enrollment',
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Others'
    ]

    useEffect(() => {
        if (success) {
            alert.success('File submitted.')
            history.push('/')
            dispatch({
                type: SUBMIT_REQUEST_RESET
            })
        }

        if (error) {
            alert.error(error)
            console.log(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, success, error, history])

    return (
        <>
            <MetaData title={'Submit Request'} />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5",width: '30rem', align: 'center',borderTop: '7px solid #9c0b0b', marginBottom: '50px'}}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight:"bold" }}>Submit Request</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <FloatingLabel
                                        controlId="floatingInput"
                                        label="Section"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='section'
                                            value={section}
                                            onChange={e => setSection(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <Form.Label>Year Level</Form.Label>
                                    <Form.Select
                                        className="mb-3"
                                        aria-label="Default select example"
                                        name="yearLevel" value={yearLevel}
                                        onChange={e => setYearLevel(e.target.value)}
                                    >
                                        <option>-</option>
                                        {levels.map(level => (
                                            <option value={level}>{level}</option>
                                        ))}
                                    </Form.Select>
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
                                            name='notes'
                                            value={notes}
                                            onChange={e => setNotes(e.target.value)}
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formGridCourse">
                                    <Form.Label>Attachments</Form.Label>
                                    <Form.Control type="file" name="fileRequirements" onChange={onChange} />
                                </Form.Group>
                                <center><Button
                                    type='submit'
                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                    disabled={loading ? true : false}
                                >Submit</Button></center>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default SubmitRequest