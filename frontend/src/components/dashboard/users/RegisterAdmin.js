import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Button, Card, Container, Row, Col, InputGroup } from 'react-bootstrap'
import { register, clearErrors } from '../../../actions/userActions'
import { REGISTER_USER_RESET } from '../../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'

const RegisterAdmin = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { error, loading, message, isCreated } = useSelector(state => state.register)

    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [role, setRole] = useState('')
    const [showPassword, setShowPassword] = useState('false')
    const [showConfirm, setShowConfirm] = useState('false')

    const roles = ['CICS Staff', 'IT Dept Chair', 'IS Dept Chair', 'CS Dept Chair']

    const showPasswordToggle = () => setShowPassword(!showPassword)
    const showConfirmToggle = () => setShowConfirm(!showConfirm)
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isCreated) {
            alert.success(message)
            history.push('/admin/users')

            dispatch({
                type: REGISTER_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, message, isCreated])

    const submitHandler = e => {
        e.preventDefault()

        const formData = {
            firstName,
            middleName,
            lastName,
            email,
            role,
            password,
            confirmPassword
        }
        dispatch(register(true, formData))
    }

    return (
        <Fragment>
            <MetaData title={'Register User'} />
            <Sidebar />
            <div className="row">

                <div className="">
                    <Container className="space_inside"></Container>

                    <Container fluid>
                        <h3>Register User</h3>
                        <Container fluid>
                            <Row className='justify-content-md-center' style={{ marginTop: '50px' }}>
                                <Card style={{ width: '40rem', align: 'center' }}>
                                    <Card.Body>
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={2}>
                                                    Name
                                                </Form.Label>
                                                <Col md={4} style={{ marginTop: '5px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="First Name"
                                                        value={firstName}
                                                        onChange={e => setFirstName(upperCase(e.target.value))}
                                                        pattern="([A-zÀ-ž\s]){2,}"
                                                        required
                                                    />
                                                </Col>
                                                <Col md={3} style={{ marginTop: '5px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="(Optional) Middle Name"
                                                        value={middleName}
                                                        onChange={e => setMiddleName(upperCase(e.target.value))}
                                                        pattern="([A-zÀ-ž\s]){2,}"
                                                    />
                                                </Col>
                                                <Col md={3} style={{ marginTop: '5px' }}>
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="Last Name"
                                                        value={lastName}
                                                        onChange={e => setLastName(upperCase(e.target.value))}
                                                        pattern="([A-zÀ-ž\s]){2,}"
                                                        required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>
                                                    Role
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Select
                                                        aria-label="Default select example"
                                                        value={role}
                                                        name="role"
                                                        onChange={e => setRole(e.target.value)}
                                                        required
                                                    >
                                                        <option value=''>-</option>
                                                        {roles.map(role => (
                                                            <option value={role}>{role}</option>
                                                        ))}
                                                    </Form.Select>
                                                </Col>
                                            </Form.Group>
                                            <Form.Group as={Row} className="mb-3">
                                                <Form.Label column sm={3}>
                                                    Email address
                                                </Form.Label>
                                                <Col sm={9}>
                                                    <Form.Control
                                                        type="email"
                                                        placeholder="juan.delacruz.iics@ust.edu.ph"
                                                        pattern="[a-z.]{1,}@ust\.edu\.ph"
                                                        value={email}
                                                        name="email"
                                                        onChange={e => setEmail(e.target.value)}
                                                        required
                                                    />
                                                </Col>
                                            </Form.Group>
                                            <Row className="mb-3">
                                                <Form.Group as={Col} md={6} style={{ marginTop: '5px' }}>
                                                    <Form.Label>Password</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            type={showPassword ? "password" : "text"}
                                                            placeholder="Password"
                                                            name="password"
                                                            value={password}
                                                            onChange={e => setPassword(e.target.value)}
                                                            minlength='6'
                                                            required
                                                        />
                                                        <Button variant="secondary" onClick={showPasswordToggle}>
                                                            <span className="fa-sm">
                                                                <i className={showPassword ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                            </span>
                                                        </Button>
                                                    </InputGroup>
                                                </Form.Group>
                                                <Form.Group as={Col} md={6} style={{ marginTop: '5px' }}>
                                                    <Form.Label>Confirm Password</Form.Label>
                                                    <InputGroup className="mb-3">
                                                        <Form.Control
                                                            type={showConfirm ? "password" : "text"}
                                                            placeholder="Confirm Password"
                                                            name="confirmPassword"
                                                            value={confirmPassword}
                                                            onChange={e => setConfirmPassword(e.target.value)}
                                                            minlength='6'
                                                            required
                                                        />
                                                        <Button variant="secondary" onClick={showConfirmToggle}>
                                                            <span className="fa-sm">
                                                                <i className={showConfirm ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                                            </span>
                                                        </Button>
                                                    </InputGroup>
                                                </Form.Group>
                                            </Row>
                                            <center>
                                                <Button
                                                    type='submit'
                                                    style={{ marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                                    disabled={loading ? true : false}>
                                                    {loading ? (
                                                        <span>
                                                            <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                                        </span>
                                                    ) : (
                                                        <span>Register</span>
                                                    )}
                                                </Button>
                                            </center>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Container>
                    </Container>
                </div>
            </div>
        </Fragment>

    )
}

export default RegisterAdmin
