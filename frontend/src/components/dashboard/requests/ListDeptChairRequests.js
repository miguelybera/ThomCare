import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, ButtonToolbar, ButtonGroup, Row, Col, Form, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, updateRequest, clearErrors } from '../../../actions/requestActions'
import { UPDATE_REQUEST_RESET } from '../../../constants/requestConstants'
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

const ListDeptChairRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, pending, processing, approved, denied, error } = useSelector(state => state.requests)
    const { error: updateError, isUpdated } = useSelector(state => state.request)

    const [requestList, setRequestList] = useState([])
    const [status, setStatus] = useState('Requests')
    const [requestType, setRequestType] = useState('')

    const requestTypes = [
        'Adding/Dropping of Course',
        'Request for Petition Classes within CICS',
        'Request for Crediting of Courses',
        'Request for Overload',
        'Request to Override',
        'Request for Late Enrollment',
        'Request for Manual Enrollment',
        'Others (Dept Chair)'
    ]

    const changeDateFormat = (date) => dateformat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        setRequestList([])

        switch (status) {
            case 'Requests':
                setRequestList(requests)
                break
            case 'Pending':
                setRequestList(pending)
                break
            case 'Processing':
                setRequestList(processing)
                break
            case 'Approved':
                setRequestList(approved)
                break
            case 'Denied':
                setRequestList(denied)
                break
            default:
                break
        }

    }, [status, requests, pending, processing, approved, denied])

    useEffect(() => {
        dispatch(getRequests('Dept Chair', 'Requests'))

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
            alert.success('Request has been moved to Trash successfully.')
            history.push('/admin/deptchair/requests')

            dispatch({
                type: UPDATE_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, updateError, isUpdated])

    useEffect(() => {
        dispatch(getRequests('Dept Chair', 'Requests', requestType))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, requestType])

    const updateRequestHandler = (id) => {
        dispatch(updateRequest(id, { isTrash: true }, true))
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

        requestList && requestList.forEach(request => {
            const viewType = '1' + request._id

            if (request.requestType !== 'Cross Enrollment within CICS') {
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
                                    Edit
                                </Tooltip>
                            }>
                            <Link to={`/admin/request/${request._id}`}>
                                <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                                    <i class="fa fa-edit" aria-hidden="true" style={{ textDecoration: 'none' }} />
                                </Button>
                            </Link>
                        </OverlayTrigger>
                        <OverlayTrigger
                            placement='bottom-start'
                            overlay={
                                <Tooltip id="tooltip-disabled">
                                    Delete
                                </Tooltip>
                            }>
                            <Button variant="danger" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                                updateRequestHandler(request._id)
                            }}>
                                <i class="fa fa-trash" aria-hidden="true" />
                            </Button>
                        </OverlayTrigger>
                    </Fragment>
                })
            }
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'My Requests'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <Row style={{ margin: '30px 0 20px 0' }}>
                            <Col xs={12} sm={4}>
                                <h3>My Requests {`/ ${status}`}</h3>
                            </Col>
                            <Col xs={12} sm={8}>
                                <ButtonToolbar>
                                    <ButtonGroup className="me-2">
                                        <Button variant="outline-secondary" onClick={() => setStatus('Requests')}>All</Button>
                                        <Button variant="outline-secondary" onClick={() => setStatus('Pending')}>Pending</Button>
                                        <Button variant="outline-secondary" onClick={() => setStatus('Processing')}>Processing</Button>
                                        <Button variant="outline-secondary" onClick={() => setStatus('Approved')}>Approved</Button>
                                        <Button variant="outline-secondary" onClick={() => setStatus('Denied')}>Denied</Button>
                                    </ButtonGroup>
                                </ButtonToolbar>
                            </Col>
                        </Row>
                        <Form>
                            <Row >
                                <Col xs={12} md={4} lg={3}>
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

export default ListDeptChairRequests