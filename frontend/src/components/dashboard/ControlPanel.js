import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests, updateRequest, clearErrors } from '../../actions/requestActions'
import Sidebar from './../layout/Sidebar'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Container, Button, Row, Col } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'
import ReportCard from './controlpanel/ReportCard'

var dateFormat = require('dateformat')

const ControlPanel = () => {

    const { user } = useSelector(state => state.auth)
    const { loading: listLoading, error, recents, requests, processing, pending, approved, denied } = useSelector(state => state.requests)

    const dispatch = useDispatch()
    const alert = useAlert()

    const role = user && user.role

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

        dispatch(getRequests(role, 'All'))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

    }, [dispatch, alert, error, role])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const upperCase = (text) => text.toUpperCase()

    let link = ''

    if (user.role === 'CICS Staff') {
        link = '/admin/all/requests'
    } else if (user.role === 'Student') {
        link = '/me/requests'
    } else {
        link = '/admin/deptchair/requests'
    }

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
                    width: 150
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 300
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
            const viewType = '2' + request._id

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
                    <Link to={`/view/request/${viewType}`}>
                        <Button variant="primary" className="mr-5" style={{ marginRight: '5px' }}>
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
                        <h1 className="my-4">Control Panel</h1>
                        <Container className="space_inside"></Container>

                        {user.role === 'Student' ? (
                            <Fragment>
                                <Container style={{ display: 'flex', justifyContent: 'center' }}>
                                    <ReportCard requestType={'Requests'} length={requests && requests.length} icon={'pencil'} />
                                </Container>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <Container fluid style={{backgroundColor: '#F5F7FA'}}>
                                    <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'pencil'} /></Col>
                                        <Col sm><ReportCard requestType={'Pending'} length={pending && pending.length} icon={'paper-clip'} /></Col>
                                        <Col sm><ReportCard requestType={'Processing'} length={processing && processing.length} icon={'paper-plane'} /></Col>
                                        <Col sm><ReportCard requestType={'Denied'} length={denied && denied.length} icon={'bubble'} /></Col>
                                        <Col sm><ReportCard requestType={'Approved'} length={approved && approved.length} icon={'home'} /></Col>
                                    </Row>
                                </Container>
                            </Fragment>
                        )}

                        <MDBDataTableV5
                            data={setRequests()}
                            searchTop
                            pagingTop
                            scrollX
                            entries={5}
                        />

                        <Link to={link}>
                            <Button>
                                View All Requests
                            </Button>
                        </Link>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ControlPanel
