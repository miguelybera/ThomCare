import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getAuditLog, clearErrors } from '../../actions/auditActions'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import {
    INSIDE_DASHBOARD_TRUE
} from '../../constants/dashboardConstants'

var dateFormat = require('dateformat')

const ListAllRequests = () => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, audits, error } = useSelector(state => state.audits)

    useEffect(() => {
        dispatch(getAuditLog())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, alert, error])

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const upperCase = (text) => text.toUpperCase()

    const setAudits = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateAudit',
                    width: 100
                },
                {
                    label: 'User Audit',
                    field: 'userAudit',
                    width: 150
                },
                {
                    label: 'Request Audit',
                    field: 'requestAudit',
                    width: 300
                },
                {
                    label: 'Action Audit',
                    field: 'actionAudit',
                    width: 180
                }
            ],
            rows: []
        }

        audits.forEach(audit => {
            data.rows.push({
                dateAudit: changeDateFormat(audit.dateAudit),
                userAudit: audit.userAudit,
                requestAudit: audit.requestAudit,
                actionAudit: audit.actionAudit
            })
        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'Requests'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Requests</h3>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAudits()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
                                    entries={5}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListAllRequests