import React, { Fragment} from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { MDBDataTableV5 } from 'mdbreact'
import { Card } from 'react-bootstrap'
var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const TrackingPageProgress = () => {
    const { loading, request } = useSelector(state => state.requestDetails)

    function changeDateFormat(date) {
        return dateFormat(date, "mmm d, yyyy h:MMtt")
    }

    const upperCase = (text) => text.toUpperCase()

    const setHistory = () => {
        const remarks = request.remarks
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateOfRemark',
                    width: 100
                },
                {
                    label: 'Status',
                    field: 'updatedStatus',
                    width: 70
                },
                {
                    label: 'Remarks',
                    field: 'remarksMessage',
                    width: 300
                }
            ],
            rows: []
        }
        remarks.forEach(remark => {
            data.rows.push({
                dateOfRemark: changeDateFormat(remark.dateOfRemark),
                updatedStatus: <Fragment>
                    <p style={{
                        color: remark.updatedStatus === 'Pending' ? 'blue' : (
                            remark.updatedStatus === 'Processing' ? '#ffcc00' : (
                                remark.updatedStatus === 'Denied' ? 'red' : 'green'
                            )
                        )
                    }}>
                        {upperCase(remark.updatedStatus)}
                    </p>
                </Fragment>,
                remarksMessage: <Fragment>
                    <p>{remark.remarksMessage}</p>
                    <p style={{ fontSize: '12px', color: 'gray', paddingTop: '10px' }}>By: {upperCase(remark.userUpdated)}</p>
                </Fragment>
            })
        })
        return data
    }

    return (
        <Fragment>
            <MetaData title={`Tracking ID: ${request.trackingNumber}`} />
            {!loading ? (
                <Fragment style={{ marginTop: '30px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <Card.Title>Tracking ID#: {request && request.trackingNumber}</Card.Title>
                            <Card.Text><b>Name:</b> {request && upperCase(request.requestorLastName)}, {request && upperCase(request.requestorFirstName)}</Card.Text>
                            <Card.Text><b>Current status:</b> <font color={
                                !request ? '' : (
                                    (request.requestStatus === 'Pending' ? 'blue' : (
                                        request.requestStatus === 'Processing' ? '#ffcc00' : (
                                            request.requestStatus === 'Denied' ? 'red' : 'green'
                                        )
                                    ))
                                )
                            }>{request && upperCase(request.requestStatus)}</font></Card.Text>
                            <Card.Text><b>Student number:</b> {request && request.requestorStudentNumber}</Card.Text>
                            <Card.Text><b>Email:</b> {request && request.requestorEmail}</Card.Text>
                            <Card.Text><b>Course:</b> {request && request.requestorCourse}</Card.Text>
                        </Card.Body>
                    </Card>
                    <Card style={{
                        marginTop: '30px',
                        marginBottom: '40px',
                        borderWidth: '0',
                        width: '90%',
                        marginLeft: 'auto',
                        marginRight: 'auto'
                    }}>
                        <MDBDataTableV5
                            data={setHistory()}
                            scrollX
                            searching={false}
                            paging={false}
                            sortable={false}
                            hover
                        />
                    </Card>
                </Fragment>
            ) : (
                <Loader/>
            )}
        </Fragment>
    )
}

export default TrackingPageProgress
