import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { FloatingLabel, Form, Button, Card, Container, Row } from 'react-bootstrap'
import { resetPassword, clearErrors } from './../actions/userActions'
import { NEW_PASSWORD_RESET } from './../constants/userConstants'
import MetaData from './layout/MetaData'

const NewPassword = ({history, match}) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, success, loading } = useSelector(state => state.forgotPassword)

    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const submitHandler = e => {
        e.preventDefault()

        dispatch(resetPassword(match.params.token, {password, confirmPassword}))
    }
    
    useEffect(() => {
        if(success){
            history.push('/password-success')
            alert.success('Password updated successfully')
            dispatch({
                type: NEW_PASSWORD_RESET
            })
        }
        
        if(error){
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: NEW_PASSWORD_RESET
            })
        }

    }, [dispatch, alert, error, success, history])

    return (
        <>
            <MetaData title={'New Password'}/> 
            <Container fluid>
                <Row className='justify-content-md-center' style={{marginTop: '50px'}}>
                    <Card style={{ width: '30rem', align: 'center' }}>
                        <Card.Body>
                            <Card.Title style={{margin: '50px 0 20px 0'}}>Update Password</Card.Title>
                            <Form onSubmit={submitHandler}>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="New Password"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="password" 
                                        placeholder="mypassword"
                                        name="password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <FloatingLabel
                                    controlId="floatingInput"
                                    label="Confirm Password"
                                    className="mb-3"
                                >
                                    <Form.Control
                                        type="password" 
                                        placeholder="mypassword"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={e => setConfirmPassword(e.target.value)}
                                    />
                                </FloatingLabel>
                                <Button
                                    type='submit' 
                                    style={{marginTop: '10px', borderRadius: '50px', width: '10rem'}}
                                >Change Password</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Row>
            </Container>
        </>
    )
}

export default NewPassword
