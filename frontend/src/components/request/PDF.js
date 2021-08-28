import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";

const ref = React.createRef();

const PDF = (props) => {

    const { formData } = useSelector(state => state.form)

    return (
        <>
            <div className="Post" ref={ref}>
                <h1>{props.title}</h1>
                <h6>Add/Drop Form</h6>
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