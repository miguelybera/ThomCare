import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
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

    const setForms = () => {
        const data = {
            columns: [
                {
                    label: 'Document Name',
                    field: 'name',
                    width: 400
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 400
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200
                }
            ],
            rows: []
        }
        forms && forms.forEach(form => {
            data.rows.push({
                name: form.title,
                description: <div style={{ textAlign: 'left' }}>
                    <Markup content={form.description} />
                </div>,
                actions: <Fragment>
                    <Button variant="outline-success" href={form.attachments[0].path} target="_blank" rel="noreferrer" style={{ margin: '5px' }}>
                        <i class="fa fa-download" aria-hidden="true"></i>
                    </Button>
                </Fragment>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`Downloadable Forms`} />
            <Container>
                <div id="rectangle" >
                    <h3>DOWNLOADABLE FORMS</h3>
                </div>
            </Container>
            {loading ? <Loader /> : <Container fluid style={{ paddingTop: '38px', marginBottom: '50px', textAlign: 'center' }}>
                <div style={{ marginTop: '50px' }}>
                    <MDBDataTableV5
                        data={setForms()}
                        searchTop
                        scrollX
                        entriesOptions={[10, 20, 30]}
                        entries={10}
                        style={{ backgroundColor: 'white' }}
                    />
                </div>
            </Container>}
        </Fragment>
    )
}

export default DownloadList