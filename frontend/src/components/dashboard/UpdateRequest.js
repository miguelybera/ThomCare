import React, { Fragment, useEffect, useState } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestDetails, updateRequest, clearErrors } from './../../actions/requestActions'
import { REQUEST_DETAILS_RESET } from './../../constants/requestConstants'
import MetaData from './../layout/MetaData'
import Loader from './../layout/Loader'

const UpdateRequest = ({ history, match }) => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading: requestLoading, error, request } = useSelector(state => state.requestDetails)
    const { loading, error: updateError, isUpdated } = useSelector(state => state.request)

    const requestId = match.params.id

    const [requestorFirstName, setRequestorFirstName] = useState('')
    const [requestorLastName, setRequestorLastName] = useState('')
    const [requestorStudentNumber, setRequestorStudentNumber] = useState('')
    const [requestorEmail, setRequestorEmail] = useState('')
    const [requestorYearLevel, setRequestorYearLevel] = useState('')
    const [requestorSection, setRequestorSection] = useState('')
    const [requestorCourse, setRequestorCourse] = useState('')
    const [requestStatus, setRequestStatus] = useState('')
    const [requestType, setRequestType] = useState('')
    const [requestorNotes, setRequestorNotes] = useState('')
    const [trackingNumber, setTrackingNumber] = useState('')
    const [fileRequirements, setFileRequirements] = useState([])
    const [remarks, setRemarks] = useState([])

    useEffect(() => {
        if (request && request._id !== requestId) {
            dispatch(getRequestDetails(requestId))
        } else if (request) {
            setRequestorFirstName(request.requestorFirstName)
            setRequestorLastName(request.requestorLastName)
            setRequestorStudentNumber(request.requestorStudentNumber)
            setRequestorEmail(request.requestorFirstName)
            setRequestorYearLevel(request.requestorYearLevel)
            setRequestorSection(request.requestorSection)
            setRequestorCourse(request.requestorCourse)
            setRequestStatus(request.requestStatus)
            setRequestType(request.requestorFirstName)
            setRequestorNotes(request.requestorNotes)
            setTrackingNumber(request.trackingNumber)
            setFileRequirements(request.fileRequirements)
            setRemarks(request.remarks)
        } else {
            dispatch(getRequestDetails(requestId))
        }

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
            history.push('/admin/cics/requests')
        }
    }, [request, error, history, alert, dispatch])

    useEffect(() => {
        if (isUpdated) {
            history.push(`/admin/cics/requests`)
            alert.success('Request updated successfully.')
            dispatch({
                type: REQUEST_DETAILS_RESET
            })
        }

        if (updateError) {
            alert.error(error)
            dispatch(clearErrors())
        }
    }, [loading, dispatch, alert, isUpdated, updateError, history])


    return (
        <Fragment>
            <MetaData title={`Update Request`} />
            {requestLoading ? <Loader /> : (
                <Fragment>
                    <p>{requestorFirstName} {requestorLastName}</p>
                    <p>{requestorStudentNumber} {requestorEmail}</p>
                    <p>{setRequestorYearLevel} {requestorSection} {requestorCourse}</p>
                    <p>{requestStatus}</p>
                    <p>{requestType}</p>
                    <p>{requestorNotes}</p>
                    <p>{trackingNumber}</p>
                    <p>cant display file requirements</p>
                </Fragment>
            )}
        </Fragment>
    )
}

export default UpdateRequest
