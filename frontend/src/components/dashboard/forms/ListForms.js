import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Markup } from 'interweave'
import { getForms, clearErrors } from './../../../actions/formActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import Sidebar from './../../layout/Sidebar'

const ListForms = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, forms } = useSelector(state => state.forms)

    useEffect(() => {
        dispatch(getForms())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, error, alert])

    return (
        <Fragment>
            <MetaData title={`Downloadable Forms`} />
            <Sidebar />
            <Container fluid style={{ padding: "50px" }}>
                <h3><b>Downloadable Forms</b></h3>
                <Row xs={1} md={2} className="g-4" >
                    {loading ? <Loader /> : (
                        <Fragment>
                            {forms && forms.map(form => (
                                <Col>
                                    <Card style={{ marginTop: '60px' }}>
                                        <Card.Body>
                                            <Card.Title>{form.title}</Card.Title>
                                            <Card.Text>
                                                <Markup content={form.description}/>
                                            </Card.Text>
                                            <a href={form.attachments && form.attachments[0].path} target="_blank" rel="noreferrer">
                                                <Button style={{ margin: '5px' }}>Download</Button>
                                            </a>
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

export default ListForms
