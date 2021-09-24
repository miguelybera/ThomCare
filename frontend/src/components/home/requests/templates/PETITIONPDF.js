import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'

const ref = React.createRef();

const PDF = (props) => {
    const dispatch = useDispatch();

    const { formData } = useSelector(state => state.saveForm)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    return (
        <>
            <div className="Post" ref={ref}>
                <h1>{props.title}</h1>
                <h6>Request for Petition Classes</h6>
                <p>Full name: {formData.firstName} {formData.middleName} {formData.lastName}</p>
                <p>Student number: {formData.studentNumber}</p>
                <p>Email: {formData.email}</p>
                <p>Course: {formData.course}</p>
                <p>List:</p>
                {formData.addDrop.map(item => (
                    <>
                        <p>{item.status}</p>
                        <p>{item.coursecode}</p>
                        <p>{item.courseName}</p>
                        <p>{item.lecUnits}</p>
                        <p>{item.labUnits}</p>
                        <p>{item.days}</p>
                        <p>{item.time}</p>
                        <p>{item.section}</p>
                    </>
                ))}
            </div>
            <Pdf targetRef={ref} filename="addDropForm.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
}

export default PDF