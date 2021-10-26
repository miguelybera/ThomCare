import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, Container, Modal } from 'react-bootstrap'
import { Markup } from 'interweave'
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

    const privacyPolicy = `
    <p>At ThomCare, accessible from thomcare.herokuapp.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by ThomCare and how we use it.</p>
    
    <p>If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us.</p>
    
    <p>This Privacy Policy applies only to our online activities and is valid for visitors to our website with regards to the information that they shared and/or collect in ThomCare. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the <a href="https://www.privacypolicygenerator.info">Free Privacy Policy Generator</a>.</p>
    
    <h3>Consent</h3>
    
    <p>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</p>
    
    <h3>Information we collect</h3>
    
    <p>The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.</p>
    <p>If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.</p>
    <p>When you register for an Account, we may ask for your contact information, including items such as full name, and email address.</p>
    
    <h3>How we use your information</h3>
    
    <p>We use the information we collect in various ways, including to:</p>
    
    <ul>
    <li>Provide, operate, and maintain our website</li>
    <li>Improve, personalize, and expand our website</li>
    <li>Use services, features, and functionality</li>
    <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website</li>
    <li>Send you emails</li>
    <li>Find and prevent fraud</li>
    </ul>
    
    <h3>Log Files</h3>
    
    <p>ThomCare follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable. The purpose of the information is for analyzing trends, administering the site, tracking users' movement on the website, and gathering demographic information.</p>
    
    <h3>Cookies and Web Beacons</h3>
    
    <p>Like any other website, ThomCare uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.</p>
    
    <p>For more general information on cookies, please read <a href="https://www.generateprivacypolicy.com/#cookies">"Cookies" article from the Privacy Policy Generator</a>.</p>
    
    <h3>Advertising Partners Privacy Policies</h3>
    
    <P>You may consult this list to find the Privacy Policy for each of the advertising partners of ThomCare.</p>
    
    <p>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on ThomCare, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</p>
    
    <p>Note that ThomCare has no access to or control over these cookies that are used by third-party advertisers.</p>
    
    <h3>Third Party Privacy Policies</h3>
    
    <p>ThomCare's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options. </p>
    
    <p>You can choose to disable cookies through your individual browser options. To know more detailed information about cookie management with specific web browsers, it can be found at the browsers' respective websites.</p>
    
    <h3>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
    
    <p>Under the CCPA, among other rights, consumers have the right to:</p>
    <p>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</p>
    <p>Request that a business delete any personal data about the consumer that a business has collected.</p>
    <p>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</p>
    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
    
    <h3>GDPR Data Protection Rights</h3>
    
    <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
    <p>The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</p>
    <p>The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</p>
    <p>The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</p>
    <p>The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</p>
    <p>The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</p>
    <p>The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</p>
    <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
    
    <p>ThomCare does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>`

    function PrivacyPolicy() {
        const [show, setShow] = useState(false);

        return (
            <>
                <Button style={{ marginRight: '5px', marginTop: '10px', borderRadius: '50px', width: '10rem' }} onClick={() => setShow(true)}>Register</Button>
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            Privacy Policy for University of Santo Tomas - College of Information and Computing Sciences
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Markup content={privacyPolicy} />
                        <center>
                            <Button
                                variant='outline-secondary'
                                onClick={() => setShow(false)}
                                style={{ margin: '10px 5px', width: '10rem' }}
                            >
                                Close
                            </Button>
                            <Button
                                onClick={submitHandler}
                                style={{ margin: '10px 5px', width: '10rem' }}
                                disabled={loading ? true : false}>
                                {loading ? (
                                    <span>
                                        <i class="fa fa-circle-o-notch fa-spin fa-1x fa-fw" style={{ textAlign: 'center' }}></i>
                                    </span>
                                ) : (
                                    <span>I agree</span>
                                )}
                            </Button>
                        </center>
                    </Modal.Body>
                </Modal>
            </>
        );
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
                                <Card.Text>
                                    View our privacy policy
                                </Card.Text>
                                <center>
                                    <Button
                                        variant='danger'
                                        onClick={goBack}
                                        style={{ marginRight: '5px', marginTop: '10px', borderRadius: '50px', width: '10rem' }}
                                        disabled={loading ? true : false}
                                    >
                                        Back
                                    </Button>
                                    <PrivacyPolicy />
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
