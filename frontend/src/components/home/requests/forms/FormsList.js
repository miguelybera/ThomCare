import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Container, Button, Modal } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { Markup } from 'interweave'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import MetaData from './../../../layout/MetaData'

const FormsList = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const overloadInstructions = `
    <p><strong>Steps to follow:</strong></p>
    <p>1. The Overload Form should be printed in triplicate copies.</p>
    <p><strong>i.</strong> First copy for the Office of the Registrar</p>
    <p><strong>ii.</strong> Second copy for the Office of the Dean/Department Chair</p>
    <p><strong>iii.</strong> Third copy for the student</p>
    <br/>
    <p>2. Have the approval of the Department Chair and the Dean.</p>
    <p><strong>i.</strong> Generate form by clicking the Fill Out button.</p>
    <p><strong>ii.</strong> Fill out the form legibly with all the required information.</p>
    <p><strong>iii.</strong> Download the generated PDF document and attach your signature.</p>
    <p><strong>vi.</strong> Go to Submit Request and fill out the required textboxes.</p>
    <p><strong>v.</strong> Attach your duly-signed Overload Form and other additional requirements stated below and submit your request.</p>
    <p><strong>vi.</strong> Wait for approval of the Overload Form.</p>
    <p>3. Submit the approved form to the Office of the Registrar for Approval.</p>
    <br/>
    <p>4. Once approved, you may proceed to the Department Chair for advising of the approved overload course.</p>
    <br/>                                
    <p><strong>Additional requirements:</strong></p>
    <ul>
        <li>Letter of Request (PDF) for units beyond allowable no. for the entire AY (3 units for 2nd-3rd year; 6 units for 4th year)</li>
        <li>Copy of student's study plan with valid ID of parent/guardian</li>
        <li>Accomplished and duly-signed Overload Form</li>
    </ul>
    <p><strong>Note:</strong> This is subject to approval of the Program Chair and the CICS Director</p>
    <ul>
        <li>As stipulated in the UST Handbook (PPS No. 1012)</li>
        <ul>
            <li>Graduating student is limited only to six (6) units of overload for the
                Academic Year.</li>
            <li>Non-graduating students, upon the endorsement of the Dean, may carry a
            maximum overload of three (3) units in an academic year for the purpose of
                being on a regular track in the succeeding year level.</li>
        </ul>
    </ul>`

    const form6aInstructions = `
    <h5>Read Me</h5>
    <p>Who will process cross-enrollment?</p>
    <ul>
        <li>Students in another Faculty/College/Institute in UST who wish to enroll a course/sec offered in CICS</li>
        <li>CICS Students who wish to enroll courses/sec offered in another Faculty/College/Institute in UST.</li>
    </ul>
    <br />
    <p><strong>Steps to follow:</strong></p>
    <p>Fill out the form legibly with all the required information.</p>
    <p><strong>i.</strong> Generate form by clicking the Fill Out button.</p>
    <p><strong>ii.</strong> Fill out the form legibly with all the required information.</p>
    <p><strong>iii.</strong> Download the generated PDF document and attach your signature.</p>
    <p><strong>vi.</strong> Go to Submit Request and fill out the required textboxes.</p>
    <p><strong>v.</strong> Attach your duly-signed Form 6A and other additional requirements stated below and submit your request.</p>
    <p><strong>vi.</strong> Wait for approval of the Form 6A.</p>
    <br />
    <p><strong>Additional requirements:</strong></p>
    <ul>
        <li>Letter of Intent</li>
        <li>Valid ID of student</li>
        <li>Accomplished and duly-signed Form 6A</li>
    </ul>
    `
    const form6bInstructions = `
    <h5>Read Me</h5>
    <p>Who will process cross-enrollment?</p>
    <ul>
        <li>Students in another Faculty/College/Institute in UST who wish to enroll a course/sec offered in CICS</li>
        <li>CICS Students who wish to enroll courses/sec offered in another Faculty/College/Institute in UST.</li>
    </ul>
    <br />
    <p><strong>Steps to follow:</strong></p>
    <p>Fill out the form legibly with all the required information.</p>
    <p><strong>i.</strong> Generate form by clicking the Fill Out button.</p>
    <p><strong>ii.</strong> Fill out the form legibly with all the required information.</p>
    <p><strong>iii.</strong> Download the generated PDF document and attach your signature.</p>
    <p><strong>vi.</strong> Go to Submit Request and fill out the required textboxes.</p>
    <p><strong>v.</strong> Attach your duly-signed Form 6B and other additional requirements stated below and submit your request.</p>
    <p><strong>vi.</strong> Wait for approval of the Form 6B.</p>
    <br />
    <p><strong>Additional requirements:</strong></p>
    <ul>
        <li>Letter of Intent</li>
        <li>Valid ID of student</li>
        <li>Accomplished and duly-signed Form 6A</li>
    </ul>`

    function ModalInstructions({ content }) {
        const [show, setShow] = useState(false)

        return (
            <Fragment>
                <Button variant='outline-secondary' onClick={() => setShow(true)}>View Instructions</Button>
                <Modal
                    size="lg"
                    show={show}
                    onHide={() => setShow(false)}
                    aria-labelledby="example-modal-sizes-title-lg"
                    style={{ paddingTop: '40px' }}
                    centered
                >
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-lg">
                            <h3 style={{ fontWeight: 'bold' }}>General Instructions:</h3>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Markup content={content} />
                    </Modal.Body>
                </Modal>
            </Fragment>
        )
    }

    const setForms = () => {
        const data = {
            columns: [
                {
                    label: 'Document Code',
                    field: 'code',
                    width: 200
                },
                {
                    label: 'Document Name',
                    field: 'name',
                    width: 350
                },
                {
                    label: 'Procedure',
                    field: 'procedure',
                    width: 300
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: [
                {
                    code: 'Form 6A',
                    name: 'Adding/Dropping of course / Cross - Enrollment (within CICS)',
                    procedure: <ModalInstructions content={form6aInstructions} />,
                    actions: <Fragment>
                        <Link to='/forms/form-6a'>
                            <Button variant="primary" style={{ margin: '5px' }}>
                                <i class="fa fa-edit" aria-hidden="true"></i>
                            </Button>
                        </Link>
                        <Button variant="secondary" href="https://drive.google.com/file/d/11UDJbETgsYGSlfwU6MH-fqQsaUFH5lMd/view?usp=sharing" target="_blank" rel="noreferrer" style={{ margin: '5px' }}>
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </Button>
                    </Fragment>
                },
                {
                    code: 'Form 6B',
                    name: 'Cross- Enrollment with other academic unit/s',
                    procedure: <ModalInstructions content={form6bInstructions} />,
                    actions: <Fragment>
                        <Link to='/forms/form-6b'>
                            <Button variant="primary" style={{ margin: '5px' }}>
                                <i class="fa fa-edit" aria-hidden="true"></i>
                            </Button>
                        </Link>
                        <Button variant="secondary" href="https://drive.google.com/file/d/1JFb7kCERjKkJZXJbkmdACewAobS7i_UF/view?usp=sharing" target="_blank" rel="noreferrer" style={{ margin: '5px' }}>
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </Button>
                    </Fragment>
                },
                {
                    code: 'Overload Form',
                    name: 'Request for Overload',
                    procedure: <ModalInstructions content={overloadInstructions} />,
                    actions: <Fragment>
                        <Link to='/forms/overload-form'>
                            <Button variant="primary" style={{ margin: '5px' }}>
                                <i class="fa fa-edit" aria-hidden="true"></i>
                            </Button>
                        </Link>
                        <Button variant="secondary" href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" target="_blank" rel="noreferrer" style={{ margin: '5px' }}>
                            <i class="fa fa-eye" aria-hidden="true"></i>
                        </Button>
                    </Fragment>
                },
                {
                    code: 'Others',
                    name: 'Others',
                    procedure: '-',
                    actions: <Fragment>
                        <Link to='/download/forms/list'>
                            <Button variant="secondary" style={{ margin: '5px' }}>
                                <i class="fa fa-eye" aria-hidden="true"></i>
                            </Button>
                        </Link>
                    </Fragment>
                }
            ]
        }
        return data
    }

    return (
        <Fragment>
            <MetaData title={'Forms'} />
            <Container>
                <div id="rectangle" >
                    <h3>FORMS</h3>
                </div>
            </Container>
            <Container fluid style={{ marginTop: '50px', padding: "50px 20px", fontFamily: 'MuktaMalar', textAlign: 'center' }}>
                <MDBDataTableV5
                    data={setForms()}
                    searchTop
                    scrollX
                    entriesOptions={[5, 10, 15]}
                    entries={10}
                    style={{ backgroundColor: 'white' }}
                />
            </Container >
        </Fragment >
    )
}

export default FormsList