import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests, getRecent, clearErrors } from '../../actions/requestActions'
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
    const { loading: listLoading, error, requests, processing, pending, approved, denied } = useSelector(state => state.requests)
    const { loading: recentsLoading, error: recentsError, recents } = useSelector(state => state.recents)

    const dispatch = useDispatch()
    const alert = useAlert()

    const role = user && user.role

    console.log(recents)
    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

        dispatch(getRequests(role, 'All'))
        dispatch(getRecent(role))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (recentsError) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [dispatch, alert, error, role, recentsError])

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
                        <Container fluid>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                {user.role === 'Student' ? (
                                    <Fragment>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'pencil'} /></Col>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'fa fa-pencil'} /></Col>
                                        <Col sm><ReportCard requestType={'Pending'} length={pending && pending.length} icon={'fa fa-paperclip'} /></Col>
                                        <Col sm><ReportCard requestType={'Processing'} length={processing && processing.length} icon={'fa fa-paper-plane'} /></Col>
                                        <Col sm><ReportCard requestType={'Denied'} length={denied && denied.length} icon={'fa fa-times-circle'} /></Col>
                                        <Col sm><ReportCard requestType={'Approved'} length={approved && approved.length} icon={'fa fa-check-circle'} /></Col>
                                    </Fragment>
                                )}
                            </Row>
                            <Row>
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
