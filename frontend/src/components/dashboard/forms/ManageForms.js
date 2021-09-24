import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { getForms, deleteForm, clearErrors } from './../../../actions/formActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import { DELETE_FORM_RESET } from './../../../constants/formConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import Sidebar from './../../layout/Sidebar'

const ManageForms = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, forms } = useSelector(state => state.forms)
    const { isDeleted, error } = useSelector(state => state.form)

    useEffect(() => {
        dispatch(getForms())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('Form has been deleted.')
            history.push('/admin/manageforms')

            dispatch({
                type: DELETE_FORM_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, history, isDeleted])

    const deleteFormHandler = id => {
        dispatch(deleteForm(id))
    }

    return (
        <Fragment>
            <MetaData title={`Manage Forms`} />
            <Sidebar />

            <Container fluid style={{ padding: "50px" }}>
                <h3><b>Manage Forms</b></h3>
                <Row xs={1} md={2} className="g-4" >
                    {loading ? <Loader /> : (
                        <Fragment>
                            <Link to='/admin/new/form'>
                                <Col>
                                    <Card style={{ border: 0, marginTop: 60 }}>
                                        <Card.Img variant="top" src="https://res.cloudinary.com/exstrial/image/upload/v1629294796/ShopIT/add_button_aatbcn.png" />
                                        <Card.Title class="text-primary" style={{ textAlign: 'center' }}>Upload New Form</Card.Title>
                                        <Card.Body>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </Link>
                            {forms && forms.map(form => (

                                <Col>
                                    <Card style={{ marginTop: '60px' }}>
                                        <Card.Body>
                                            <Card.Title>{form.title}</Card.Title>
                                            <Card.Text>
                                                {form.description}
                                            </Card.Text>
                                            <a href={form.attachments && form.attachments[0].path} target="_blank" rel="noreferrer">
                                                <Button style={{ margin: '5px' }}>Download</Button>
                                            </a>
                                            <Link to={`/admin/form/${form._id}`}>
                                                <Button style={{ margin: '5px' }}>
                                                    Update
                                                </Button>
                                            </Link>
                                            <Button style={{ margin: '5px' }} onClick={() => deleteFormHandler(form._id)}>
                                                Delete
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Fragment>
                    )}
                </Row>
            </Container>
        </Fragment>
    )
}

export default ManageForms
