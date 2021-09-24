import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import { Button } from 'react-bootstrap'

const ref = React.createRef();

const FORM6BPDF = (props) => {
    const dispatch = useDispatch();

    const { formData } = useSelector(state => state.saveForm)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    return (
        <>
            <span style={{ margin: '10px' }}>
                <h4>Preview of accomplished form. Click 'Save as PDF' to download the form.</h4>
            </span>
            <div className="Post" ref={ref}>
                <h1>{props.title}</h1>
                <h6>Cross-Enrollment Form</h6>
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
                {({ toPdf }) =>
                    <center>
                        <Button onClick={toPdf} style={{ margin: '10px' }}>Save as PDF</Button>
                    </center>
                }
            </Pdf>
        </>
    );
}

export default FORM6BPDF