import React, { Fragment, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
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
import dateformat from 'dateformat'

const ControlPanel = ({ history }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)
    const { loading: listLoading, error, requests, processing, pending, approved, denied, dailyStats, weeklyStats, overViewStats } = useSelector(state => state.requests)
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

    const changeDateFormat = (date) => dateformat(date, "mmm dd")
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

            history.push('/error')
        }

        if (recentsError) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }
    }, [dispatch, history, alert, error, role, reqType, recentsError])

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
                    width: 270
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

    const setDailyData = () => {
        const data = []

        for (let i = 0; i < 7; i++) {
            data.push({
                name: changeDateFormat(new Date(Date.now() - (i * 24 * 60 * 60 * 1000))),
                Total: 0
            })
        }

        dailyStats && dailyStats.forEach((x, idx) => {
            data[idx].Total = x
        })

        return data
    }

    const setWeeklyData = () => {
        const data = []

        for (let i = 0; i < 5; i++) {
            data.push({
                name: changeDateFormat(new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000))),
                Total: 0
            })
        }

        weeklyStats && weeklyStats.forEach((x, idx) => {
            data[idx].Total = x
        })

        return data
    }

    const setOverViewData = () => {
        const data = [
            {
                name: 'Today',
                Total: 0
            },
            {
                name: '7d',
                Total: 0
            },
            {
                name: '30d',
                Total: 0
            },
            {
                name: '60d',
                Total: 0
            }
        ]

        overViewStats && overViewStats.forEach((x, idx) => {
            data[idx].Total = x
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Control Panel'} />
            <Sidebar />
            {listLoading ? <Loader /> : (
                <div className="row">
                    <div className='control-panel'>
                        <Container fluid style={{ margin: '100px 0' }}>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                {user.role === 'Student' ? (
                                    <Fragment>
                                        <center>
                                            <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'edit'} color={'red'} /></Col>
                                        </center>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Col sm><ReportCard requestType={'Requests'} length={requests && requests.length} icon={'edit'} color={'red'} /></Col>
                                        <Col sm><ReportCard requestType={'Pending'} length={pending && pending.length} icon={'paperclip'} color={'blue'} /></Col>
                                        <Col sm><ReportCard requestType={'Processing'} length={processing && processing.length} icon={'spinner'} color={'yellow'} /></Col>
                                        <Col sm><ReportCard requestType={'Denied'} length={denied && denied.length} icon={'times-circle'} color={'blue'} /></Col>
                                        <Col sm><ReportCard requestType={'Approved'} length={approved && approved.length} icon={'check-circle'} color={'red'} /></Col>
                                    </Fragment>
                                )}
                            </Row>
                            {user.role !== 'Student' ? (
                                <Fragment>
                                    <Row style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                        <Col xs={12} md={6} style={{ marginTop: '5px' }}>
                                            <h4 style={{ paddingLeft: '40px' }}>Daily requests</h4>
                                            <ResponsiveContainer width={'99%'} height={300}>
                                                <LineChart width={600} height={300} data={setDailyData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                    <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                                    <CartesianGrid stroke="#ccc" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Col>
                                        <Col xs={12} md={6} style={{ marginTop: '5px' }}>
                                            <h4 style={{ paddingLeft: '40px' }}>Weekly requests</h4>
                                            <ResponsiveContainer width={'99%'} height={300}>
                                                <LineChart width={600} height={300} data={setWeeklyData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                    <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                                    <CartesianGrid stroke="#ccc" />
                                                    <XAxis dataKey="name" />
                                                    <YAxis />
                                                    <Tooltip />
                                                </LineChart>
                                            </ResponsiveContainer>
                                        </Col>
                                    </Row>
                                    <Row style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                        <h4 style={{ paddingLeft: '40px', marginTop: '5px' }}>Overview</h4>
                                        <ResponsiveContainer width={'99%'} height={300}>
                                            <LineChart width={600} height={300} data={setOverViewData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                                <CartesianGrid stroke="#ccc" />
                                                <XAxis dataKey="name" />
                                                <YAxis />
                                                <Tooltip />
                                            </LineChart>
                                        </ResponsiveContainer>
                                    </Row>
                                </Fragment>
                            ) : <Fragment></Fragment>}
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
                            <div style={{ display: 'flex', marginBottom: '20px' }}>
                                <div style={{ marginLeft: 'auto' }}>
                                    <Link to={link}>
                                        <Button style={{ marginBottom: '20px' }}>
                                            View All Requests
                                    </Button>
                                    </Link>
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>
            )
            }
        </Fragment >
    )
}

export default ControlPanel
