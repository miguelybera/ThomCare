import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, OverlayTrigger, Tooltip, ListGroup, ListGroupItem } from 'react-bootstrap'
import { getFormDetails, updateForm, clearErrors } from './../../../actions/formActions'
import { UPDATE_FORM_RESET } from './../../../constants/formConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import Sidebar from './../../layout/Sidebar'

const UpdateForm = ({ history, match }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, error, form } = useSelector(state => state.formDetails)
    const { loading: updateLoading, isUpdated, error: updateError } = useSelector(state => state.form)

    const [title, setTitle] = useState()
    const [description, setDescription] = useState()
    const [attachments, setAttachments] = useState([])
    const [oldAttachments, setOldAttachments] = useState([])

    const formId = match.params.id

    useEffect(() => {
        if (form && form._id !== formId) {
            dispatch(getFormDetails(formId))
        } else if (form) {
            setTitle(form.title)
            setDescription(form.description)
            setOldAttachments(form.attachments)
        } else {
            dispatch(getFormDetails(formId))
        }

        if (isUpdated) {
            alert.success('Form updated.')
            history.push('/admin/manageforms')

            dispatch({
                type: UPDATE_FORM_RESET
            })
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, isUpdated, updateError, error, form, formId])

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
        formData.set('title', title)
        formData.set('description', description)

        attachments.forEach(file => {
            formData.append('attachments', file)
        })

        dispatch(updateForm(formId, formData))
    }

    return (
        <>
            <MetaData title={'Update Form'} />
            <Sidebar />
            {loading ? <Loader /> : (
                <Container fluid>
                    <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                        <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                            <Card.Body>
                                <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Update Form</Card.Title>
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
                                        <Form.Control type="file" name="attachments" onChange={onChange} className="mb-3" />
                                        <Form.Group className="mb-3">
                                            {oldAttachments !== 0 &&
                                                <Form.Label>Previous attachment: </Form.Label>
                                            }
                                            <ListGroup>
                                                {oldAttachments && oldAttachments.map(file => (
                                                    <Fragment>
                                                        <ListGroupItem>
                                                            {file.originalname} <font size="1rem">{Number(file.size / 1000000).toFixed(2)} MB</font> <a href={file.path} target="_blank" rel="noreferrer">
                                                                <button className="btn btn-primary py-1 px-2 ml-2">
                                                                    <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                                                </button>
                                                            </a>
                                                        </ListGroupItem>
                                                    </Fragment>
                                                ))}
                                            </ListGroup>
                                        </Form.Group>
                                    </Form.Group>
                                    <center>
                                        <Button
                                            type='submit'
                                            style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                            disabled={loading ? true : false}
                                        >
                                            {updateLoading ? (
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
            )}
        </>
    )
}

export default UpdateForm