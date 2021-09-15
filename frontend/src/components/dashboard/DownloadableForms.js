import React, { Fragment, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import Sidebar from './../layout/Sidebar'
import { MDBDataTableV5 } from 'mdbreact'
import { Card, Button } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const DownloadableForms = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch])
    
    return (
        <Fragment>
            <MetaData title={`Manage Forms`} />
            <Sidebar />
            <div>
                Manage Forms
            </div>
        </Fragment>
    )
}

export default DownloadableForms
