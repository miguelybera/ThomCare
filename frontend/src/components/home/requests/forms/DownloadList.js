import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Container, Button } from 'react-bootstrap'
import { Markup } from 'interweave'
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
            <MetaData title={`Downloadable Forms`}/>
            <Container>
                <div id="rectangle" >
                    <h3>DOWNLOADABLE FORMS</h3>
                </div>
            </Container>
            {loading ? <Loader/> : <Container fluid style={{ paddingTop: '38px', marginBottom: '50px' }}>
                <Table bordered hover size="sm" style={{ paddingTop: '100px', marginTop: '50px', justifyContent: 'center' }}>
                    <thead>
                        <tr style={{ textAlign: 'center' }}>
                            <th>Document Name</th>
                            <th>Description</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {forms && forms.map(form => (
                            <tr>
                                <td style={{ textAlign: 'center' }}>{form.title}</td>
                                <td><Markup content={form.description}/></td>
                                <td style={{ textAlign: 'center' }}>
                                    <Button variant="outline-success" href={form.attachments[0].path} target="_blank" rel="noreferrer" style={{ margin: '5px' }}>
                                        <i class="fa fa-download" aria-hidden="true"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>}
        </Fragment>
    )
}

export default DownloadList