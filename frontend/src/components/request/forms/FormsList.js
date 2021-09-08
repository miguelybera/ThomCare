import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, InputGroup, FormControl, Container, Button } from 'react-bootstrap'


const FormsList = () => {
    return (
        <Fragment>
            <Container>
                <div id="rectangle" >

                    <h3>REQUEST FORMS</h3>

                </div>
            </Container>



            <Container fluid style={{paddingTop: '38px'}}>
                

                <Table striped bordered hover size="sm" style={{paddingTop: '100px', marginTop: '50px', justifyContent: 'center'}}>
                    <thead>
                        <tr style={{textAlign: 'center'}}>
                            <th>Document Code</th>
                            <th>Document Name</th>
                            <th>Availability</th>
                            <th></th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Form 6A</td>
                            <td>Adding/Dropping of course</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td>Form 6A</td>
                            <td>Cross Enrollment (within CICS)</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6b">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>CICS Petition Classes</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>Crediting of Course/s</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>Request for overload</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>Request for late enrollment</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                        <tr>
                            <td></td>
                            <td>Request for manual enrollment</td>
                            <td>Available</td>
                            <td><Button variant="primary" href="/form-6a">Fill up</Button></td>

                        </tr>
                    </tbody>

                </Table>


            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default FormsList