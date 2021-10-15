import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import { Button } from 'react-bootstrap'
import './css/overload.css'
import '../../../../App.css'

const ref = React.createRef();

const OVERLOADPDF = ({ studentInfo, submitted, setSubmitted }) => {
    const dispatch = useDispatch();

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const studentNumber = studentInfo.studentNumber.split('')
    const middleInitial = studentInfo.middleName ? studentInfo.middleName[0] + '.' : ''
    const name = studentInfo.lastName + ', ' + studentInfo.firstName + ' ' + middleInitial
    const course = user.course

    const options = {
        format: 'legal'
    }

    const goBack = () => setSubmitted(!submitted)

    console.log(studentInfo)
    return (
        <>
            <div style={{ fontFamily: 'MuktaMalar' }}>
                <span style={{ margin: '10px' }}>
                    <h4>Preview of accomplished form.</h4>
                    <h6>Click 'Save as PDF' button below to download the form.</h6>
                </span>
                <div className="Post" ref={ref} style={{ border: '1px solid black ' }}>
                    <div className="titlerow">
                        <center>
                            <span>UNIVERSITY OF SANTO TOMAS</span><br />
                            <span>Espa&#241;a, Manila</span>

                            <br />
                            <br />

                            <p>REQUEST FOR STUDY OVERLOAD</p>
                            <p>(Applicable to graduating students only - PPS No. 1012 Student Handbook)</p>
                        </center>
                    </div>

                    <div className="firstrow">
                        <div>NAME OF STUDENT: {name} </div>
                        <div>STUDENT NO. {studentNumber}</div>
                    </div>

                    <div className="secondrow">
                        <div>Program: {course}</div>
                        <div>CURRICULUM YEAR: {studentInfo.curriculum}</div>
                        <div>TERM: {studentInfo.term} </div>

                    </div>

                    <div className="tablerow">

                        <table>
                            <tbody>
                                <tr>
                                    <td>Full-Time Student</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.fullTime}</td>
                                    <td>Total Number of Units Earned</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.unitsEarned}</td>
                                    <td>Does the program require Bar or Board Examination?</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.bar}</td>
                                </tr>
                                <tr>
                                    <td>No. of "INCOMPLETE" grades</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.incompleteGrades}</td>
                                    <td>Total Number of Units Required for the Program</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.unitsRequired}</td>
                                    <td>Is there a violation of courses prerequisites?</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.violations}</td>
                                </tr>
                                <tr>
                                    <td>No. of Special Terms Attended</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.specialAttend}</td>
                                    <td>Normal Load (No. of Units) for the current Term</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.normalLoad}</td>
                                    <td>Total Number of Units to be Taken including Overload</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.totalUnits}</td>
                                </tr>
                                <tr>
                                    <td>Total Number of Overload Units Already Taken</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.totalOverloadUnits}</td>
                                    <td>Working Student</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.workingStudent}</td>
                                    <td>No. of "5s"</td>
                                    <td style={{ textAlign: 'center' }}>{studentInfo.totalFives}</td>
                                </tr>
                                <tr>
                                    <td>Average Rating</td>
                                    <td colspan="5" style={{ textAlign: 'center' }}></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <br />

                    <div className="loadrow">
                        <div>LOAD REQUESTED FOR APPROVAL:</div>
                    </div>

                    <div className="inforow">
                        <table>
                            <tbody>
                                <tr style={{ textAlign: 'center' }}>
                                    <td>COURSES</td>
                                    <td>UNITS</td>
                                    <td>TIME</td>
                                    <td>DAYS</td>
                                </tr>
                                {studentInfo.overload && studentInfo.overload.map(x => {
                                    const total = Number(x.lecUnits) + Number(x.labUnits)

                                    return (
                                        <tr>
                                            <td>{x.courseName}</td>
                                            <td>{total}</td>
                                            <td>{x.startTime} - {x.endTime}</td>
                                            <td>{x.days}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="specialrow">
                        <div>SPECIAL TERM LOAD (If special term graduate):</div>
                    </div>

                    <div className="specialinfo">
                        <table>
                            <tbody>
                                <tr>
                                    <td>COURSES</td>
                                    <td>UNITS</td>
                                </tr>
                                {studentInfo.specialTerm && studentInfo.specialTerm.map(x => {
                                    const total = Number(x.lecUnits) + Number(x.labUnits)
                                    return (
                                        <tr>
                                            <td>{x.courseName}</td>
                                            <td>{total}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="tentativerow">
                        TENTATIVE DATE OF GRADUATION: {studentInfo.tentative}
                    </div>


                    <div className="reccomendrow">
                        RECOMMENDING APPROVAL:
                    </div>

                    <div className="deanrow">
                        <div>____________________________________________________</div>
                        <div></div>
                        <div>Approved<input type="checkbox" disabled="true" style={{ marginLeft: "10px", height: "15px", width: "15px" }}></input></div>
                        <div>Disapproved<input type="checkbox" disabled="true" style={{ marginLeft: "10px", height: "15px", width: "15px" }}></input></div>
                    </div>

                    <div className="deanrow">
                        <div style={{ textAlign: 'center' }}>Dean</div>
                        <div></div>
                        <div>Total Units</div>
                        <div></div>
                    </div>

                    <div className="daterow">
                        <div>Date:</div>
                        <div>Registrar</div>

                    </div>
                    <div className="ustrow">
                        <div></div>
                        <div>UST:S033-00-F019</div>

                    </div>

                </div>

                <Pdf targetRef={ref} filename="overloadForm.pdf" options={options}>
                    {({ toPdf }) =>
                        <center>
                            <Button onClick={toPdf} style={{ margin: '10px' }}>Save as PDF</Button>
                            <Button onClick={goBack} style={{ margin: '10px' }}>Back</Button>
                        </center>
                    }
                </Pdf>
            </div>
        </>
    );
}

export default OVERLOADPDF