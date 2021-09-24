import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import { Button } from 'react-bootstrap'
import './css/form6a.css'

const ref = React.createRef();

const FORM6APDF = (props) => {
    const dispatch = useDispatch();

    const { formData } = useSelector(state => state.saveForm)
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const studentNumber = formData.studentNumber.split('')
    const middleInitial = formData.middleName ? formData.middleName[0] + '.' : ''
    const name = formData.lastName + ', ' + formData.firstName + ' ' + middleInitial
    const course = user.course

    let toAdd = [], toDrop = []

    let newTotalUnits = 0

    formData.addDrop.forEach(x => {
        if (x.status === 'Add') {
            toAdd.push(x)
            newTotalUnits += (Number(x.lecUnits) + Number(x.labUnits))
        } else {
            toDrop.push(x)
            newTotalUnits -= (Number(x.lecUnits) + Number(x.labUnits))
        }

    })

    const options = {
        format: 'legal'
    }

    return (
        <>
            <span style={{ margin: '10px' }}>
                <h4>Preview of accomplished form.</h4>
                <h6>Click 'Save as PDF' button below to download the form.</h6>
            </span>
            <div className="Post" ref={ref} style={{ border: '1px solid black ' }}>
                <div className="headerform">
                    <div>
                        UST FORM No. 6A<br />
                        <span style={{ fontWeight: 'bold' }}>CHANGE / DROP COURSE </span>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={10} style={{ textAlign: 'center' }}>STUDENT NO.</td>
                                </tr>
                                <tr>
                                    {studentNumber.map(num => (
                                        <td>{num}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>UNIVERSITY OF SANTO TOMAS</span><br />
                        España St., Manila, Philippines
                    </div>
                    <div>
                        <img src="/images/UST_SEAL.png" alt="UST LOGO" width="60" height="60" />
                    </div>
                </div>

                <div className="namesabove">
                    <div>Place a comma (,) between last and first names</div>
                    <div style={{ textAlign: 'right' }}> <b>{formData.term}</b> Term / Special, Academic Year 20<b>{formData.year1}</b> - 20<b>{formData.year2}</b></div>
                </div>

                <div className="namesform">
                    <div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>{name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>{course}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="namesbelow" style={{ fontWeight: 'bold' }}>
                    <div>LAST</div>
                    <div>FIRST</div>
                    <div>M.I.</div>
                    <div style={{ textAlign: 'right' }}>COLLEGE/PROGRAM</div>
                </div>

                <div style={{ fontWeight: 'bold' }}>TO BE DISCONTINUED:</div>
                <center>
                    <div className="dropform">
                        <div>
                            <table style={{ width: '95%' }}>
                                <tbody>
                                    <tr style={{ fontWeight: 'bold' }}>
                                        <td colSpan={15} style={{ textAlign: 'center' }}>C O U R S E S</td>
                                        <td>Units</td>
                                        <td>Days</td>
                                        <td>Time</td>
                                        <td>Room</td>
                                        <td>Section</td>
                                    </tr>
                                    {toDrop.length === 0 ? (
                                        <Fragment>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {
                                                toDrop.map(x => (
                                                    <Fragment>
                                                        <tr>
                                                            <td colSpan={15}>{x.courseCode} - {x.courseName}</td>
                                                            <td>{Number(x.lecUnits) + Number(x.labUnits)}</td>{/** units*/}
                                                            <td>{x.days}</td>{/** days */}
                                                            <td>{x.time}</td>{/** time*/}
                                                            <td>{x.room}</td>{/** room*/}
                                                            <td>{x.section}</td>{/** section*/}
                                                        </tr>
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>
                <br />
                <div style={{ fontWeight: 'bold' }}>TO BE ADDED:</div>
                <center>
                    <div className="addform">
                        <div>
                            <table style={{ width: '95%' }}>
                                <tbody>
                                    <tr style={{ fontWeight: 'bold' }}>
                                        <td colSpan={15} style={{ textAlign: 'center' }}>C O U R S E S</td>
                                        <td>Units</td>
                                        <td>Days</td>
                                        <td>Time</td>
                                        <td>Room</td>
                                        <td>Section</td>
                                    </tr>
                                    {toAdd.length === 0 ? (
                                        <Fragment>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {
                                                toAdd.map(x => (
                                                    <Fragment>
                                                        <tr>
                                                            <td colSpan={15}>{x.courseCode} - {x.courseName}</td>
                                                            <td>{Number(x.lecUnits) + Number(x.labUnits)}</td>{/** units*/}
                                                            <td>{x.days}</td>{/** days */}
                                                            <td>{x.time}</td>{/** time*/}
                                                            <td>{x.room}</td>{/** room*/}
                                                            <td>{x.section}</td>{/** section*/}
                                                        </tr>
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>

                <center>NEW TOTAL UNITS: {newTotalUnits}</center>

                <div className="signatories" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <div>Dean or Representative</div>
                    <div></div>
                    <div>Student's Signature</div>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    UST:S033-00-FO-04
                </div>
                <center>
                    <div style={{ fontWeight: 'bold' }}>
                        COPY FOR THE STUDENT
                    </div>
                </center>

                <div className="headerform">
                    <div>
                        UST FORM No. 6A<br />
                        <span style={{ fontWeight: 'bold' }}>CHANGE /DROP COURSE </span>
                    </div>
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td colSpan={10} style={{ textAlign: 'center' }}>STUDENT NO.</td>
                                </tr>
                                <tr>
                                    {studentNumber.map(num => (
                                        <td>{num}</td>
                                    ))}
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>UNIVERSITY OF SANTO TOMAS</span><br />
                        España St., Manila, Philippines

                    </div>
                    <div>
                        <img src="/images/UST_SEAL.png" alt="UST LOGO" width="60" height="60" />
                    </div>
                </div>

                <div className="namesabove">
                    <div>Place a comma (,) between last and first names</div>
                    <div style={{ textAlign: 'right' }}> <b>{formData.term}</b> Term / Special, Academic Year 20<b>{formData.year1}</b> - 20<b>{formData.year2}</b></div>
                </div>


                <div className="namesform">
                    <div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>{name}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
                        <table style={{ width: '100%' }}>
                            <tbody>
                                <tr>
                                    <td>{course}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="namesbelow" style={{ fontWeight: 'bold' }}>
                    <div>LAST</div>
                    <div>FIRST</div>
                    <div>M.I.</div>
                    <div style={{ textAlign: 'right' }}>COLLEGE/PROGRAM</div>
                </div>

                <div style={{ fontWeight: 'bold' }}>TO BE DISCONTINUED:</div>
                <center>
                    <div className="dropform">

                        <div>

                            <table style={{ width: '95%' }}>
                                <tbody>
                                    <tr style={{ fontWeight: 'bold' }}>
                                        <td colSpan={15} style={{ textAlign: 'center' }}>C O U R S E S</td>
                                        <td>Units</td>
                                        <td>Days</td>
                                        <td>Time</td>
                                        <td>Room</td>
                                        <td>Section</td>
                                    </tr>
                                    {toDrop.length === 0 ? (
                                        <Fragment>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {
                                                toDrop.map(x => (
                                                    <Fragment>
                                                        <tr>
                                                            <td colSpan={15}>{x.courseCode} - {x.courseName}</td>
                                                            <td>{Number(x.lecUnits) + Number(x.labUnits)}</td>{/** units*/}
                                                            <td>{x.days}</td>{/** days */}
                                                            <td>{x.time}</td>{/** time*/}
                                                            <td>{x.room}</td>{/** room*/}
                                                            <td>{x.section}</td>{/** section*/}
                                                        </tr>
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>

                <br />
                <div style={{ fontWeight: 'bold' }}>TO BE ADDED:</div>
                <center>
                    <div className="addform">
                        <div>
                            <table style={{ width: '95%' }}>
                                <tbody>
                                    <tr style={{ fontWeight: 'bold' }}>
                                        <td colSpan={15} style={{ textAlign: 'center' }}>C O U R S E S</td>
                                        <td>Units</td>
                                        <td>Days</td>
                                        <td>Time</td>
                                        <td>Room</td>
                                        <td>Section</td>
                                    </tr>
                                    {toAdd.length === 0 ? (
                                        <Fragment>
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                            </tr>
                                        </Fragment>
                                    ) : (
                                        <Fragment>
                                            {
                                                toAdd.map(x => (
                                                    <Fragment>
                                                        <tr>
                                                            <td colSpan={15}>{x.courseCode} - {x.courseName}</td>
                                                            <td>{Number(x.lecUnits) + Number(x.labUnits)}</td>{/** units*/}
                                                            <td>{x.days}</td>{/** days */}
                                                            <td>{x.time}</td>{/** time*/}
                                                            <td>{x.room}</td>{/** room*/}
                                                            <td>{x.section}</td>{/** section*/}
                                                        </tr>
                                                    </Fragment>
                                                ))
                                            }
                                        </Fragment>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>

                <center>NEW TOTAL UNITS: {newTotalUnits}</center>

                <div className="signatories" style={{ textAlign: 'center', fontWeight: 'bold' }}>
                    <div>Dean or Representative</div>
                    <div></div>
                    <div>Student's Signature</div>
                </div>

                <div style={{ textAlign: 'right', fontWeight: 'bold' }}>
                    UST:S033-00-FO-04
                </div>
                <center>
                    <div style={{ fontWeight: 'bold' }}>
                        COPY FOR THE DEAN
                    </div>
                </center>
            </div>

            <Pdf targetRef={ref} filename="addDropForm.pdf" options={options}>
                {({ toPdf }) =>
                    <center>
                        <Button onClick={toPdf} style={{ margin: '10px' }}>Save as PDF</Button>
                    </center>
                }
            </Pdf>
        </>
    );
}

export default FORM6APDF