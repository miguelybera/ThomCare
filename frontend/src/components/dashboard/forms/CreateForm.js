import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, OverlayTrigger, Tooltip, ListGroup, ListGroupItem } from 'react-bootstrap'
import { createForm, clearErrors } from '../../../actions/formActions'
import { NEW_FORM_RESET } from '../../../constants/formConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'
import Sidebar from '../../layout/Sidebar'

const CreateForm = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, success, error } = useSelector(state => state.newForm)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [attachments, setAttachments] = useState([])

    useEffect(() => {
        if (success) {
            alert.success('Form uploaded.')
            history.push('/admin/manageforms')

            dispatch({
                type: NEW_FORM_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, success, error])

    const onChange = e => {
        const files = Array.from(e.target.files)

        setAttachments([])

        files.forEach(file => {
            setAttachments(oldArray => [...oldArray, file])
        })
    }

    const submitHandler = e => {
        e.preventDefault()

        const formData = new FormData()
        attachments.forEach(file => {
            formData.append('attachments', file)
        })
        formData.set('title', title)
        formData.set('description', description)

        dispatch(createForm(formData))
    }

    return (
        <>
            <MetaData title={'New Form'} />
            <Sidebar />
            <Container fluid>
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>New Form</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Title"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='title'
                                            value={title}
                                            onChange={e => setTitle(e.target.value)}
                                            required
                                        />
                                    </FloatingLabel>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <FloatingLabel
                                        label="Form Description"
                                        className="mb-3"
                                    >
                                        <Form.Control
                                            type='text'
                                            name='description'
                                            value={description}
                                            onChange={e => setDescription(e.target.value)}
                                            required
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
                                    <Form.Control type="file" name="attachments" onChange={onChange} required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <ListGroup>
                                        {attachments.map((file, idx) => (
                                            <ListGroupItem>
                                                File {idx + 1}: {file.name}
                                            </ListGroupItem>
                                        ))}
                                    </ListGroup>
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
        </>
    )
}

export default CreateForm