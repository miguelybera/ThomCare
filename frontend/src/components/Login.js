import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from  'react-redux'
import { login, clearErrors } from './../actions/userActions'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'

const Login = ({history}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { isAuthenticated, error, loading } = useSelector(state => state.auth)

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        dispatch(login(email, password))
    }

    useEffect(() => {
        if(isAuthenticated) {
            alert.success('Logged in successfully.')
            history.push('/')
        }

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        } //loadError in load_user_fail

    }, [dispatch, alert, isAuthenticated, error])

    return (
        <>
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Login</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Email address"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="email" 
                                        placeholder="name@example.com" 
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingPassword" label="Password">
                                    <Form.Control
                                        type="password" 
                                        placeholder="Password" 
                                        value={password} 
                                        onChange={e => setPassword(e.target.value)}
                                        required
                                    />
                                </FloatingLabel>
                                <Button 
                                    type='submit' 
                                    style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}
                                >Submit</Button>
                            </Form>
                            <Link to='/forgotpassword'>Forgot password?</Link>
                            <Link to='/register'>Register</Link>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default Login
