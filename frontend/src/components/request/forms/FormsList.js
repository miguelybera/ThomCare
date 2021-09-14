import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Table, Row, InputGroup, FormControl, Container, Button } from 'react-bootstrap'


const FormsList = () => {
    return (
        <Fragment>
            <Container>
                <div id="rectangle" >
                    <h3>FORMS</h3>
                </div>
            </Container>
            <Container fluid style={{ paddingTop: '38px' }}>
                <Table bordered striped hover size="sm" style={{ paddingTop: '100px', marginTop: '50px', justifyContent: 'center' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Document Code</th>
                            <th>Document Name</th>
                            <th>Availability</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        <tr>
                            <td>Form 6A</td>
                            <td>Adding/Dropping of course</td>
                            <td>Available</td>
                            <td>
                                <Link to='/form-6a'>
                                    <Button variant="primary" href="/form-6a">
                                        <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Fill up
                                    </Button>
                                </Link>
                                <Button variant="warning"  href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" >
                                    <i class="fa fa-eye" aria-hidden="true"></i> View
                                </Button>
                            </td>
                        </tr>
                        <tr>
                            <td>Form 6A / Form 6B</td>
                            <td>Cross - Enrollment (within CICS) / Cross- Enrollment with other academic unit/s</td>
                            <td>Available</td>
                            <td><Link to='/form-6b'>
                                <Button variant="primary" href="/form-6b">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Fill up
                                </Button>

                            </Link>
                                <Button variant="warning"  href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" >
                                    <i class="fa fa-eye" aria-hidden="true"></i> View
                                </Button></td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>CICS Petition Classes</td>
                            <td>Available</td>
                            <td><Link to='/petition-classes'>
                                <Button variant="primary" href="/petition-classes">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Fill up
                                </Button>
                            </Link>
                                <Button variant="warning"  href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" >
                                    <i class="fa fa-eye" aria-hidden="true"></i> View
                                </Button></td>
                        </tr>
                        <tr>
                            <td>-</td>
                            <td>Request for Overload</td>
                            <td>Available</td>
                            <td><Link to='/overload-form'>
                                <Button variant="primary" href="/form-6a">
                                    <i class="fa fa-pencil-square-o" aria-hidden="true"></i> Fill up
                                </Button>
                            </Link>
                                <Button variant="warning"  href="https://drive.google.com/file/d/1T5FATdMcVEhhTsfrqkEOKudhWF7rkvE_/view?usp=sharing" >
                                    <i class="fa fa-eye" aria-hidden="true"></i> View
                                </Button></td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default FormsList