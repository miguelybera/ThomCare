import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'
import { getRequestDetails, clearErrors } from './../../actions/requestActions'
import { Card } from 'react-bootstrap'
import {
    INSIDE_DASHBOARD_FALSE
} from '../../constants/dashboardConstants'

import {
    REQUEST_DETAILS_RESET
} from '../../constants/requestConstants'

var dateFormat = require('dateformat')

const cardStyle = {
    marginTop: '30px',
    marginBottom: '40px',
    borderWidth: '0'
}

const Confirmation = ({ history, match }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, error, request } = useSelector(state => state.requestDetails)

    const requestId = match.params.id

    const [requestorInfo, setRequestorInfo] = useState({})
    const [notes, setNotes] = useState('')
    const [requestType, setRequestType] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])

    useEffect(() => {
        if (request && request.trackingNumber !== requestId) {
            dispatch(getRequestDetails(requestId))
        } else if (request) {
            setRequestorInfo(request.requestorInfo)
            setRequestType(request.requestType)
            setNotes(request.notes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
        } else {
            dispatch(getRequestDetails(requestId))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            dispatch({
                type: REQUEST_DETAILS_RESET
            })
            history.push('/submitrequest')
        }

        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch, history, request, requestId, alert, error])

    return (
        <Fragment>
            <MetaData title={`Tracking ID: ${trackingNumber}`} />
            {!loading ? (
                <Fragment style={{ marginTop: '30px' }}>
                    <Card style={cardStyle}>
                        <Card.Body>
                            <Card.Title>Tracking ID#: {trackingNumber}</Card.Title>
                            <Card.Text><b>Name:</b> {requestorInfo.lastName}, {requestorInfo.firstName}</Card.Text>
                            <Card.Text><b>Request Type:</b> {requestType}</Card.Text>
                            <Card.Text><b>Notes:</b> {notes}</Card.Text>
                            <Card.Text>
                                Attachments:
                                <ul>
                                    {fileRequirements && fileRequirements.map(file => (
                                        <li><a href={file.path}>{file.originalname}</a></li>
                                    ))}
                                </ul>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Fragment>
            ) : (
                <Loader />
            )}
        </Fragment>
    )
}

export default Confirmation
