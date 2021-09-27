import React, { Fragment, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAuditLog, clearErrors } from '../../../actions/auditActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
var dateFormat = require('dateformat')

const ListAllRequests = () => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, audits, error } = useSelector(state => state.audits)

    const changeDateFormat = (date) => dateFormat(date, "ddd, mmm d, yyyy h:MMtt")

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
            <MetaData title={'Audit Log'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Audit Log</h3>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAudits()}
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

export default ListAllRequests