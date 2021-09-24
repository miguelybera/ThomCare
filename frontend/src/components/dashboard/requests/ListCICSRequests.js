import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, clearErrors } from '../../../actions/requestActions'
import { ASSIGN_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const ListCICSRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()
    
    const { error: updateError, isUpdated } = useSelector(state => state.request)
    const { loading, requests, pending, processing, approved, denied, error } = useSelector(state => state.requests)

    const [requestList, setRequestList] = useState([])
    const [status, setStatus] = useState('Requests')

    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")
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
        dispatch(getRequests('CICS Staff', 'Office'))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (updateError) {
            alert.error(updateError)
            dispatch(clearErrors())
        }

        if (isUpdated) {
            alert.success('Request has been assigned to user.')
            history.push('/admin/cics/available/requests')

            dispatch({
                type: ASSIGN_REQUEST_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, updateError, isUpdated])

    const setRequests = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'date',
                    width: 150
                },
                {
                    label: 'Request Type',
                    field: 'requestType',
                    width: 180
                },
                {
                    label: 'Requested by',
                    field: 'name',
                    width: 230
                },
                {
                    label: 'Status',
                    field: 'requestStatus',
                    width: 150
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 150
                }
            ],
            rows: []
        }

        requestList && requestList.forEach(request => {
            const viewType = '5'+request._id

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
            <MetaData title={'CICS Requests'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>CICS Requests {`/ ${status}`}</h3>
                        
                        <Button style={{margin: '10px'}} onClick={() => setStatus('Requests')}>View All</Button>
                        <Button style={{margin: '10px'}} onClick={() => setStatus('Pending')}>Pending</Button>
                        <Button style={{margin: '10px'}} onClick={() => setStatus('Processing')}>Processing</Button>
                        <Button style={{margin: '10px'}} onClick={() => setStatus('Approved')}>Approved</Button>
                        <Button style={{margin: '10px'}} onClick={() => setStatus('Denied')}>Denied</Button>

                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setRequests()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
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

export default ListCICSRequests