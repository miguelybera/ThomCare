import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Button } from 'react-bootstrap'
import { getForms, clearErrors } from './../../../../actions/formActions'
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import MetaData from './../../../layout/MetaData'
import Loader from './../../../layout/Loader'

const DownloadList = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, forms } = useSelector(state => state.forms)

    useEffect(() => {
        dispatch(getForms())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, error, alert])

    return (
        <Fragment>
            <MetaData title={`Downloadble Forms`}/>
            <Container>
                <div id="rectangle" >
                    <h3>DOWNLOADABLE FORMS</h3>
                </div>
            </Container>
            <Container fluid style={{ paddingTop: '38px' }}>
                <Table bordered striped hover size="sm" style={{ paddingTop: '100px', marginTop: '50px', justifyContent: 'center' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Document Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {forms && forms.map(form => (
                            <tr>
                                <td>{form.title}</td>
                                <td>{form.description}</td>
                                <td>
                                    <Button variant="primary" href={form.attachments[0].path} target="_blank" rel="noreferrer">
                                        <i class="fa fa-eye" aria-hidden="true"></i> View/Download
                                </Button></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
            <Container className="space"></Container>
        </Fragment>
    )
}

export default DownloadList