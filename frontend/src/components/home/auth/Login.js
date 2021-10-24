import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { login, clearErrors } from './../../../actions/userActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'

const Login = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error } = useSelector(state => state.auth)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState('false')

    const showPasswordToggle = () => setShowPassword(!showPassword)

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
                    <Card style={{ backgroundColor: "#F5F5F5", width: '30rem', align: 'center', borderTop: '7px solid #9c0b0b', marginBottom: '50px' }}>
                        <Card.Body>
                            <Card.Title style={{ margin: '20px 0 20px 0', fontWeight: "bold" }}>Login</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type='email'
                                        placeholder="juan.delacruz.iics@ust.edu.ph"
                                        pattern="[a-z.]{1,}@ust\.edu\.ph"
                                        name="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group style={{ marginTop: '5px' }}>
                                    <Form.Label>Password</Form.Label>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            type={showPassword ? "password" : "text"}
                                            placeholder="••••••••"
                                            name="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                        <Button variant="secondary" onClick={showPasswordToggle}>
                                            <span className="fa-sm">
                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </span>
                                        </Button>
                                    </InputGroup>
                                </Form.Group>
                                <center><Button type='submit' style={{ marginTop: '15px', borderRadius: '50px', width: '10rem' }}>Submit</Button></center>
                            </Form>
                            <Row style={{ paddingTop: '20px', fontSize: "14px" }} >
                                <Col style={{ textAlign: 'center' }}>No account yet? Click <Link to='/register' style={{ textDecoration: 'underline', color: 'blue' }}>here</Link> to register.</Col>
                            </Row>
                            <Row style={{ paddingTop: '10px', fontSize: "14px" }} >
                                <Col style={{ textAlign: 'center' }}>Forgot your Password? <Link to='/forgotpassword' style={{ textDecoration: 'underline', color: 'blue' }}>Reset password</Link>.</Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
            <Container fluid style={{ paddingTop: "75px" }} />
        </Fragment>
    )
}

export default Login
