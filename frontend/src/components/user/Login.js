import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { login, clearErrors } from './../../actions/userActions'
import MetaData from './../layout/MetaData'
import { FloatingLabel, Form, Button, Card, Container, Row, Col } from 'react-bootstrap'

const Login = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    useEffect(() => {
        if (isAuthenticated) {
            alert.success('Logged in successfully.')
            history.push('/')
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, isAuthenticated, error, history])

    return (
        <Fragment >
            <MetaData title={'Login'} />
            <Container className="space"></Container>
            <Container fluid >
                <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                    <Card style={{ width: '30rem', align: 'center', backgroundColor: '#9c0b0b' }}>
                        <Card.Body>
                            <Card.Title style={{
                                margin: '50px 0 20px 0', align: 'center', color: 'white', fontWeight: 'bold'
                            }}>Login</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type='email'
                                        placeholder="juan.delacruz.iics@ust.edu.ph"
                                        pattern="[a-z]{1,}\.[a-z]{1,}\.(iics|cics)@ust\.edu\.ph"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)} required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
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
                            <Row style={{ paddingTop: '10px' }} >
                                <Col style={{ textAlign: 'center', color: 'white' }}>No account yet? Click <Link to='/register' style={{ textDecoration: 'underline', color: 'white' }}>here</Link> to register.</Col>
                            </Row>
                            <Row style={{ paddingTop: '10px' }} >
                                <Col style={{ textAlign: 'center', color: 'white' }}>Forgot your Password? <Link to='/forgotpassword' style={{ textDecoration: 'underline', color: 'white' }}>Reset password</Link>.</Col>
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
