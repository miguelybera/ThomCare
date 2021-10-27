import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Form, Row, Col, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, assignRequest, clearErrors } from '../../../actions/requestActions'
import { ASSIGN_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import dateformat from 'dateformat'

const dropdown = {
    border: "2px solid black",
    borderRadius: "20px",
    margin: '5px 0'
}

const ListAvailableRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { error: updateError, isUpdated } = useSelector(state => state.request)
    const [requestType, setRequestType] = useState('')

    const requestTypes = [
        'Request for Course Description',
        'Request for Certificate of Grades',
        'Request for Leave of Absence',
        'Submission of Admission Memo',
        'Others (CICS Office)'
    ]

    const changeDateFormat = (date) => dateformat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        dispatch(getRequests('CICS Office', 'Available'))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Request has been assigned to user successfully.')
            history.push('/admin/cics/available/requests')

            dispatch({
                type: ASSIGN_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, updateError, isUpdated])

    useEffect(() => {
        dispatch(getRequests('CICS Office', 'Available', requestType))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, requestType])

    const assignRequestHandler = (id) => {
        dispatch(assignRequest(id, {}))
    }

    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 120
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 250
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 280
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 200
                }
            ],
            rows: []
        }

        requests.forEach(request => {
            const viewType = '3' + request._id

            data.rows.push({
                date: changeDateFormat(request.createdAt),
                requestType: request.requestType,
                name: request.requestorInfo.firstName + ' ' + request.requestorInfo.lastName,
                requestStatus: <Fragment>
                    <p style={{
                        color: request.requestStatus === 'Pending' ? 'blue' : (
                            request.requestStatus === 'Processing' ? '#ffcc00' : (
                                request.requestStatus === 'Denied' ? 'red' : 'green'
                            )
                        )
                    }}>
                        {upperCase(request.requestStatus)}
                    </p>
                </Fragment>,
                actions: <Fragment>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                View
                        </Tooltip>
                        }>
                        <Link to={`/view/request/${viewType}`}>
                            <Button variant="secondary" className="mr-5" style={{ margin: '5px' }}>
                                <i class="fa fa-eye" aria-hidden="true" style={{ textDecoration: 'none' }} />
                            </Button>
                        </Link>
                    </OverlayTrigger>
                    <OverlayTrigger
                        placement='bottom-start'
                        overlay={
                            <Tooltip id="tooltip-disabled">
                                Assign to me
                        </Tooltip>
                        }>
                        <Button variant="outline-secondary" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                            assignRequestHandler(request._id)
                        }}>
                            <i class="fa fa-user" aria-hidden="true" />
                        </Button>
                    </OverlayTrigger>
                </Fragment>
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Available Requests'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <div style={{ display: 'flex', marginBottom: '20px' }}>
                            <div style={{ marginRight: 'auto', marginTop: '30px' }}>
                                <h3>Available Requests</h3>
                            </div>
                        </div>
                        <Form>
                            <Row >
                                <Col xs={12} md={4}>
                                    <Form.Group>
                                        <Form.Select
                                            aria-label="Course"
                                            size="sm"
                                            style={dropdown}
                                            name="requestType"
                                            value={requestType}
                                            onChange={e => setRequestType(e.target.value)}
                                        >
                                            <option value=''>Request Type</option>
                                            {requestTypes.map(r => (
                                                <option value={r}>{r}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setRequests()}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    entriesOptions={[10, 20, 30, 40, 50]}
                                    entries={10}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListAvailableRequests