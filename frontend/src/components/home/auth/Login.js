import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'
import { login, clearErrors } from './../../../actions/userActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'

const Login = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error } = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        if (isAuthenticated) {
            alert.success('Logged in successfully.')
            history.push('/controlpanel')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, alert, isAuthenticated, error, history])

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    return (
        <Fragment >
            <MetaData title={'Login'} />
            <Container fluid >
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center',borderTop: '7px solid #9c0b0b', marginBottom: '50px'}}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight:"bold" }}>Login</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <FloatingLabel label="Email address" className="mb-3">
                                    <Form.Control
                                        type='email'
                                        placeholder="juan.delacruz.iics@ust.edu.ph"
                                        pattern="[a-z.]{1,}@ust\.edu\.ph"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} required
                                    />
                                </FloatingLabel>
                                <FloatingLabel label="Password">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                                <center><Button type='submit' style={{ marginTop: '15px', borderRadius: '50px', width: '10rem' }}>Submit</Button></center>
                            </Form>
                            <Row style={{ paddingTop: '20px', fontSize: "14px" }} >
                                <Col style={{ textAlign: 'center'}}>No account yet? Click <Link to='/register' style={{ textDecoration: 'underline', color: 'blue' }}>here</Link> to register.</Col>
                            </Row>
                            <Row style={{ paddingTop: '10px', fontSize: "14px" }} >
                                <Col style={{ textAlign: 'center'}}>Forgot your Password? <Link to='/forgotpassword' style={{ textDecoration: 'underline', color: 'blue' }}>Reset password</Link>.</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default Login
