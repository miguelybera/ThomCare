import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container } from 'react-bootstrap'
import { register, clearErrors } from '../../../actions/userActions'
import { REGISTER_USER_RESET } from '../../../constants/userConstants'
import { INSIDE_DASHBOARD_FALSE } from '../../../constants/dashboardConstants'
import MetaData from '../../layout/MetaData'

const ConfirmRegister = ({ history, studentInfo, currentStep, setCurrentStep }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { error, loading, message, isCreated } = useSelector(state => state.register)

    const [success, setSuccess] = useState(false)

    const goBack = () => setCurrentStep(currentStep - 1)

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (isCreated) {
            setSuccess(!success)

            dispatch({
                type: REGISTER_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })

    }, [dispatch, history, alert, error, message, isCreated, success])

    const submitHandler = (e) => {
        e.preventDefault()

        dispatch(register(false, studentInfo))
    }

    return (
        <>
            <MetaData title={'Confirm Student Information'} />
            {!success ? (
                <Fragment>
                    <Container fluid style={{ padding: "50px 20px" }}>
                        <center>
                            <h3>Confirm student information</h3>
                            <p className="text-muted" style={{ fontSize: '12px', textAlign: 'center', marginBottom: '20px', maxWidth: '30rem' }}>
                                Kindly confirm your student information below.
                                Once submitted, you will not be able to update your profile (Contact your administrator to request for a profile update).
                            </p>
                        </center>
                        <Card style={{ maxWidth: '600px', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body>
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style={{ width: '50%' }}
                                        aria-valuenow='50'
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        50%
                                    </div>
                                </div>
                                <Card.Text><b>Name:</b> {studentInfo.firstName}{studentInfo.middleName ? ' ' + studentInfo.middleName + ' ' : ' '}{studentInfo.lastName}</Card.Text>
                                <Card.Text><b>Student Number:</b> {studentInfo.studentNumber}</Card.Text>
                                <Card.Text><b>Course:</b> {studentInfo.course}</Card.Text>
                                <Card.Text><b>Email:</b> {studentInfo.email}</Card.Text>
                                <center>
                                    <Button
                                        variant='danger'
                                        onClick={goBack}
                                        style={{ marginRight: '5px', marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        onClick={submitHandler}
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
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            ) : (
                <Fragment>
                    <Container fluid style={{ padding: "50px 20px" }}>
                        <center>
                            <h3>Almost there!</h3>
                        </center>
                        <Card style={{ maxWidth: '600px', marginTop: '40px', margin: 'auto', backgroundColor: "#F5F5F5", borderTop: '7px solid #9c0b0b' }}>
                            <Card.Body>
                                <div class="progress">
                                    <div
                                        class="progress-bar"
                                        role="progressbar"
                                        style={{ width: '100%' }}
                                        aria-valuenow='100'
                                        aria-valuemin="0"
                                        aria-valuemax="100"
                                    >
                                        100%
                                    </div>
                                </div>
                                <Card.Text style={{ textAlign: 'center', paddingBottom: '50px' }}>Registration is being processed. Kindly check your inbox to see the verification link sent to your email.</Card.Text>
                                <center>
                                    <Link to='/'>
                                        <Button variant="outline-primary">
                                            <span>
                                                <i class="fa fa-home" style={{ textAlign: 'center' }}></i>
                                            </span> Go back home
                                        </Button>
                                    </Link>
                                </center>
                            </Card.Body>
                        </Card>
                    </Container>
                </Fragment>
            )}
        </>
    )
}

export default ConfirmRegister
