import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequests, updateRequest, clearErrors } from '../../actions/requestActions'
import Sidebar from './../layout/Sidebar'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { Container } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const ControlPanel = () => {

    const { loading, user } = useSelector(state => state.auth)
    const { loading: listLoading, error, requests, processing, pending, approved, denied } = useSelector(state => state.requests)

    const dispatch = useDispatch()

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

    }, [dispatch, error, role])

    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            <Sidebar />
            {listLoading ? <Loader /> : (
                <div className="row">
                    <div className="">
                        <h1 className="my-4">Control Panel</h1>
                        <Container className="space_inside"></Container>
                        {user.role === 'CICS Staff' ? (
                            <Fragment>
                                <p>Total Requests: {requests && requests.length}</p>
                                <p>Total processing: {processing && processing.length}</p>
                                <p>Total pending: {pending && pending.length}</p>
                                <p>Total denied: {denied && denied.length}</p>
                                <p>Total approved: {approved && approved.length}</p>
                            </Fragment>
                        ) : (
                            user.role === 'Student' ? (
                                <Fragment>
                                    <p>Total Requests: {requests && requests.length}</p>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <p>Total Requests: {requests && requests.length}</p>
                                    <p>Total processing: {processing && processing.length}</p>
                                    <p>Total pending: {pending && pending.length}</p>
                                    <p>Total denied: {denied && denied.length}</p>
                                    <p>Total approved: {approved && approved.length}</p>
                                </Fragment>
                            )
                        )}
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ControlPanel
