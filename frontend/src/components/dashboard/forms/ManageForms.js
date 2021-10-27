import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { Markup } from 'interweave'
import { getForms, deleteForm, clearErrors } from './../../../actions/formActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import { DELETE_FORM_RESET } from './../../../constants/formConstants'
import MetaData from './../../layout/MetaData'
import Loader from './../../layout/Loader'
import Sidebar from './../../layout/Sidebar'

const ManageForms = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, forms } = useSelector(state => state.forms)
    const { isDeleted, error } = useSelector(state => state.form)

    useEffect(() => {
        dispatch(getForms())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (isDeleted) {
            alert.success('Form has been deleted.')
            history.push('/admin/manageforms')

            dispatch({
                type: DELETE_FORM_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, error, alert, history, isDeleted])

    const deleteFormHandler = id => {
        dispatch(deleteForm(id))
    }

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
                    width: 500
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 250
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
                                Edit
                        </Tooltip>
                        }>
                        <Link to={`/admin/form/${form._id}`}>
                            <Button style={{ margin: '10px 5px' }} variant="primary">
                                <i class="fa fa-edit" aria-hidden="true" />
                            </Button>
                        </Link>
                    </OverlayTrigger>
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
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Delete
                            </Tooltip>
                        }>
                        <Button style={{ margin: '10px 5px' }} variant="danger" onClick={() => deleteFormHandler(form._id)}>
                            <i class="fa fa-trash" aria-hidden="true" />
                        </Button>
                    </OverlayTrigger>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={`Manage Forms`} />
            <Sidebar />
            <Container fluid style={{ padding: "50px 0px" }}>
                <div style={{ display: 'flex', marginBottom: '20px' }}>
                    <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                        <h3>Manage forms</h3>
                    </div>
                    <div style={{ marginLeft: 'auto', marginTop: '30px' }}>
                        <Link to='/admin/new/form'>
                            <Button variant='outline-secondary'>Add new form</Button>
                        </Link>
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
        </Fragment >
    )
}

export default ManageForms
