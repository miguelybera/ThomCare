import React, { Fragment, useEffect } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button, Row, Col, Card, OverlayTrigger, Tooltip as Tool } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, getStats, clearErrors } from '../../../actions/requestActions'
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
    const { loading, error, requests, processing, pending, approved, denied } = useSelector(state => state.requests)
    const { loading: statsLoading, error: statsError, dailyStats, weeklyStats } = useSelector(state => state.stats)

    const role = user && user.role

    let link = '', reqType = '', viewType = ''

    if (user.role === 'CICS Office') {
        link = '/admin/all/requests'
        reqType = 'Me'
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

    const changeDateFormat = (date) => dateformat(date, "mm/dd")
    const upperCase = (text) => text.toUpperCase()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })

        dispatch(getRequests(role, reqType))
        if (role !== 'Student') {
            dispatch(getStats(role))
        }

        if (error || statsError) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }
    }, [dispatch, history, alert, error, role, reqType, statsError])

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

        requests && requests.forEach((request, idx) => {
            if (idx < 5) {
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
                        <OverlayTrigger
                            placement='bottom-start'
                            overlay={
                                <Tool id="Tool-disabled">
                                    View
                                </Tool>
                            }>
                            <Link to={`/view/request/${reqLink}`}>
                                <Button variant="secondary" className="mr-5" style={{ margin: '5px' }}>
                                    <i class="fa fa-eye" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                </Button>
                            </Link>
                        </OverlayTrigger>
                    </Fragment>
                })
            } else {
                return
            }

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
                name: changeDateFormat(new Date(Date.now() - (i * 7 * 24 * 60 * 60 * 1000))) + '-' + changeDateFormat(new Date(Date.now() - ((i - 1) * 7 * 24 * 60 * 60 * 1000))),
                Total: 0
            })
        }

        weeklyStats && weeklyStats.forEach((x, idx) => {
            data[idx].Total = x
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Control Panel'} />
            <Sidebar />
            {loading || statsLoading ? <Loader /> : (
                <div className="row">
                    <div className='control-panel'>
                        <Container fluid style={{ margin: '100px 0' }}>
                            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                                {user.role === 'Student' ? (
                                    <Fragment>
                                        <center>
                                            <Col sm><ReportCard requestType={'My Requests'} length={requests && requests.length} icon={'edit'} color={'white'} /></Col>
                                        </center>
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        <Row>
                                            <center>
                                                <Col sm><ReportCard requestType={'Total Requests'} length={requests && requests.length} icon={'edit'} color={'white'} /></Col>
                                            </center>
                                        </Row>
                                        <Row>
                                            <Col sm><ReportCard requestType={'Pending'} length={pending && pending.length} icon={'paperclip'} color={'blue'} /></Col>
                                            <Col sm><ReportCard requestType={'Processing'} length={processing && processing.length} icon={'spinner'} color={'yellow'} /></Col>
                                            <Col sm><ReportCard requestType={'Approved'} length={approved && approved.length} icon={'check-circle'} color={'green'} /></Col>
                                            <Col sm><ReportCard requestType={'Denied'} length={denied && denied.length} icon={'times-circle'} color={'red'} /></Col>
                                        </Row>
                                    </Fragment>
                                )}
                            </Row>
                            {user.role !== 'Student' ? (
                                <Fragment>
                                    <Row style={{ display: 'flex', justifyContent: 'center', margin: '20px 0' }}>
                                        <Col xs={12} md={6} style={{ marginTop: '5px' }}>
                                            <Card>
                                                <Card.Header><b>My daily requests</b></Card.Header>
                                                <Card.Body>
                                                    <ResponsiveContainer width={'99%'} height={300}>
                                                        <LineChart width={600} height={300} data={setDailyData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                            <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                                            <CartesianGrid stroke="#ccc" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                        <Col xs={12} md={6} style={{ marginTop: '5px' }}>
                                            <Card>
                                                <Card.Header><b>My weekly requests</b></Card.Header>
                                                <Card.Body>
                                                    <ResponsiveContainer width={'99%'} height={300}>
                                                        <LineChart width={600} height={300} data={setWeeklyData()} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                                            <Line type="monotone" dataKey="Total" stroke="#8884d8" />
                                                            <CartesianGrid stroke="#ccc" />
                                                            <XAxis dataKey="name" />
                                                            <YAxis />
                                                            <Tooltip />
                                                        </LineChart>
                                                    </ResponsiveContainer>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    </Row>
                                </Fragment>
                            ) : <Fragment></Fragment>}
                            <Row>
                                {loading ? <Loader /> : (
                                    <Fragment>
                                        <Card>
                                            <div style={{ display: 'flex', marginBottom: '20px' }}>
                                                <div style={{ marginRight: 'auto', marginTop: '10px' }}>
                                                    <Card.Title style={{ paddingTop: '10px' }}><b>Recent submissions</b></Card.Title>
                                                </div>
                                                <div style={{ marginLeft: 'auto', marginTop: '10px' }}>
                                                    <Link to={link}>
                                                        <Button variant='outline-secondary'>
                                                            View All
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                            <Card.Body>
                                                <MDBDataTableV5
                                                    data={setRequests()}
                                                    searchTop
                                                    scrollX
                                                    entries={5}
                                                    entriesOptions={[5]}
                                                />
                                            </Card.Body>
                                        </Card>
                                    </Fragment>
                                )}
                            </Row>
                        </Container>
                    </div>
                </div>
            )
            }
        </Fragment >
    )
}

export default ControlPanel
