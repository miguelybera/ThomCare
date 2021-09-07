import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminAnnouncements, clearErrors } from './../../actions/announcementActions'
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

    const { loading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])

    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            <Sidebar />
            {loading ? <Loader /> : (
                <div className="row">
                    <div className="">
                        <h1 className="my-4">Control Panel</h1>
                        <Container className="space_inside"></Container>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ControlPanel
