import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { Markup } from 'interweave'
import { getForms, clearErrors } from './../../../actions/formActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import Sidebar from './../../layout/Sidebar'

const ListForms = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, forms } = useSelector(state => state.forms)

    useEffect(() => {
        dispatch(getForms())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, error, alert])

    const setForms = () => {
        const data = {
            columns: [
                {
                    label: 'Title',
                    field: 'title',
                    width: 250
                },
                {
                    label: 'Description',
                    field: 'description',
                    width: 600
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: []
        }

        forms && forms.forEach(form => {
            data.rows.push({
                title: form.title,
                description: <Markup content={form.description} />,
                actions: <Fragment>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Download
                            </Tooltip>
                        }>
                        <a href={form.attachments && form.attachments[0].path} target="_blank" rel="noreferrer">
                            <Button style={{ margin: '5px' }} variant="outline-success">
                                <i class="fa fa-download" aria-hidden="true" style={{ textDecoration: 'none' }} />
                            </Button>
                        </a>
                    </OverlayTrigger>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={`Downloadable Forms`} />
            <Sidebar />
            <Container fluid style={{ padding: "50px 0px" }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                        <h3>Downloadable forms</h3>
                    </div>
                </div>
                {loading ? <Loader /> : (
                    <MDBDataTableV5
                        data={setForms()}
                        searchTop
                        searchBottom={false}
                        scrollX
                        entriesOptions={[10, 20, 30, 40, 50]}
                        entries={10}
                    />
                )}
            </Container>
        </Fragment>
    )
}

export default ListForms
