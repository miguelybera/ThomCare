import React, { Fragment, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getRequests, assignRequest, clearErrors } from '../../../actions/requestActions'
import { ASSIGN_REQUEST_RESET } from '../../../constants/requestConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const ListAvailableRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, requests, error } = useSelector(state => state.requests)
    const { error: updateError, isUpdated } = useSelector(state => state.request)

    const changeDateFormat = (date) => dateFormat(date, "mmm d, yyyy h:MMtt")
    const upperCase = (text) => text.toUpperCase()
    
    useEffect(() => {
        dispatch(getRequests('CICS Staff', 'Available'))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
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

    const assignRequestHandler = (id) => {
        dispatch(assignRequest(id, {}))
    }

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

        requests.forEach(request => {
            const viewType = '3'+request._id

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
                    <Button variant="warning" className="mr-5" style={{ margin: '5px' }} onClick={() => {
                        assignRequestHandler(request._id)
                    }}>
                        <i class="fa fa-user" aria-hidden="true" />
                    </Button>
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
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Available Requests</h3>
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

export default ListAvailableRequests