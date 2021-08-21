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

var dateFormat = require('dateformat')

const ControlPanel = () => {
    
    const { loading } = useSelector(state => state.auth)
    
    return (
        <Fragment>
            <MetaData title={'Announcements'} />
            {loading ? <Loader /> : (
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Control Panel</h1>

                        <Container className="space_inside"></Container>

                        
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ControlPanel
