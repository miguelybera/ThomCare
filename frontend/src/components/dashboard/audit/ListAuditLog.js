import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button, FormControl } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAuditLog, clearErrors } from '../../../actions/auditActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import dateformat from 'dateformat'

const dropdown = {
    border: "2px solid black",
    borderRadius: "20px",
    margin: '5px 0'
}

const ListAllRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, audits, error } = useSelector(state => state.audits)

    const changeDateFormat = (date) => dateformat(date, "yyyy-mm-dd h:MMtt")

    useEffect(() => {
        dispatch(getAuditLog())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error])

    const setAudits = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateAudit',
                    width: 150
                },
                {
                    label: 'Event Name',
                    field: 'name',
                    width: 200
                },
                {
                    label: 'Event Info',
                    field: 'eventInfo',
                    width: 450
                },
                {
                    label: 'User',
                    field: 'user',
                    width: 200
                }
            ],
            rows: []
        }

        audits.forEach(audit => {
            data.rows.push({
                dateAudit: changeDateFormat(audit.dateAudit),
                eventInfo: audit.eventInfo,
                user: audit.user,
                name: audit.name
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
                    <Container fluid style={{ padding: "50px 0px" }}>
                        <Row style={{ marginTop: '30px', marginBottom: '20px' }}>
                            <Col style={{ marginRight: 'auto' }} xs={12} sm={12} md={3}>
                                <h3>Audit Log</h3>
                            </Col>
                        </Row>
                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAudits()}
                                    searchTop
                                    searchBottom={false}
                                    scrollX
                                    entriesOptions={[10, 20, 30, 40, 50]}
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