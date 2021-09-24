import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, getRecent, clearErrors } from '../../../actions/requestActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import ReportCard from './ReportCard'
var dateFormat = require('dateformat')

const ControlPanel = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)
    const { loading: listLoading, error, requests, processing, pending, approved, denied } = useSelector(state => state.requests)
    const { loading: recentsLoading, error: recentsError, recents } = useSelector(state => state.recents)

    const role = user && user.role
    
    let link = '', reqType = '', viewType = ''

    if (user.role === 'CICS Staff') {
        link = '/admin/all/requests'
        reqType = 'All'
        viewType = '5'
    } else if (user.role === 'Student') {
        link = '/me/requests'
        reqType = 'All'
        viewType = '2'
    } else {
        link = '/admin/deptchair/requests'
        reqType = 'Requests'
        viewType = '1'
    }

    const changeDateFormat = (date) => dateFormat(date, "yyyy-mm-dd")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

        dispatch(getRequests(role, reqType))
        dispatch(getRecent(role))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (recentsError) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, role, reqType, recentsError])

    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 100
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 200
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 250
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 180
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: []
        }

        recents.forEach(request => {
            const reqLink = viewType + request._id

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
                    <Link to={`/view/request/${reqLink}`}>
                        <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                            <i class="fa fa-eye" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                        </Button>
                    </Link>
                </Fragment>
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Control Panel'} />
            <Sidebar />
            {listLoading ? <Loader /> : (
                <div className="row">
                    <div className="">
                        <h1 style={{margin: '50px 0'}}>Control Panel</h1>
                        <Container fluid>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                {user.role === 'Student' ? (
                                    <Fragment>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'pencil'} color={'red'}/></Col>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'pencil'} color={'red'}/></Col>
                                        <Col sm><ReportCard requestType={'Pending'} length={pending && pending.length} icon={'paperclip'} color={'blue'}/></Col>
                                        <Col sm><ReportCard requestType={'Processing'} length={processing && processing.length} icon={'spinner'} color={'yellow'}/></Col>
                                        <Col sm><ReportCard requestType={'Denied'} length={denied && denied.length} icon={'times-circle'} color={'blue'}/></Col>
                                        <Col sm><ReportCard requestType={'Approved'} length={approved && approved.length} icon={'check-circle'} color={'red'}/></Col>
                                    </Fragment>
                                )}
                            </Row>
                            <Row>
                                <h3>Latest submissions</h3>
                                {recentsLoading ? <Loader /> : (
                                    <MDBDataTableV5
                                        data={setRequests()}
                                        searchTop
                                        pagingTop
                                        scrollX
                                        entries={5}
                                    />
                                )}
                            </Row>
                            <Row>
                                <Link to={link}>
                                    <Button style={{ marginBottom: '20px' }}>
                                        View All Requests
                                    </Button>
                                </Link>
                            </Row>
                        </Container>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ControlPanel
