import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Pdf from "react-to-pdf"
import { INSIDE_DASHBOARD_FALSE } from '../../../../constants/dashboardConstants'
import { Button, Row } from 'react-bootstrap'
import './css/form6a.css'
import '../../../../App.css'

const ref = React.createRef()

const FORM6APDF = ({ studentInfo, submitted, setSubmitted }) => {
    const dispatch = useDispatch()

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

    let toAdd = [], toDrop = [], newTotalUnits = 0

    studentInfo.addDrop.forEach(x => {
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

    const goBack = () => setSubmitted(!submitted)

    return (
        <>
            <div style={{ fontFamily: 'MuktaMalar' }}>
                <span style={{ margin: '10px' }}>
                    <h4>Preview of accomplished form.</h4>
                    <h6>Click the 'Save as PDF' button below to download the form. After downloading, attach your signature to the document. Submit document along with other requirements <Link to='/submit/request'>here</Link> to complete your request.</h6>
                </span>
                <div className="Post" ref={ref} style={{ border: '1px solid black' }}>
                    <div className="headerform">
                        <div style={{ fontSize: '10px' }}>
                            UST Form No. 6A<br />
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
                            <span style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'AveriaBold' }}>UNIVERSITY OF SANTO TOMAS</span><br />
                        España St., Manila, Philippines
                    </div>
                        <div>
                            <img src="/images/UST_LOGO.png" alt="UST LOGO" width="80" height="80" />
                        </div>
                    </div>

                    <div className="namesabove">
                        <div>Place a comma (,) between last and first names</div>
                        <div style={{ textAlign: 'right' }}> <b>{studentInfo.term}</b> Term / Special, Academic Year 20<b>{studentInfo.year1}</b> - 20<b>{studentInfo.year2}</b></div>
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
                        <div>LAST NAME</div>
                        <div>FIRST NAME</div>
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
                                            <td style={{ width: '120px' }}>Time</td>
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
                                                                <td style={{ width: '120px' }}  >{x.startTime} - {x.endTime}</td>{/** time*/}
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
                                            <td colSpan={15} style={{ textAlign: 'center', marginRight: '170px' }}>C O U R S E S</td>
                                            <td>Units</td>
                                            <td >Days</td>
                                            <td style={{ width: '120px' }}>Time</td>
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
                                                                <td colSpan={15} style={{ marginRight: '100px' }}>{x.courseCode} - {x.courseName}</td>
                                                                <td >{Number(x.lecUnits) + Number(x.labUnits)}</td>{/** units*/}
                                                                <td >{x.days}</td>{/** days */}
                                                                <td style={{ width: '120px' }}  >{x.startTime} - {x.endTime}</td>{/** time*/}
                                                                <td >{x.room}</td>{/** room*/}
                                                                <td >{x.section}</td>{/** section*/}
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
                        <Row>
                            <div>____________________________</div>
                            <div></div>
                            <div>Dean or Representative</div>
                        </Row>
                        <div></div>
                        <Row>
                            <div>____________________________</div>
                            <div></div>
                            <div>Student's Signature</div>
                        </Row>
                    </div>

                    <div style={{ textAlign: 'right', fontWeight: 'bold', }}>
                        UST:S033-00-FO-04
                </div>
                    <center>
                        <div style={{ fontWeight: 'bold' }}>
                            COPY FOR THE STUDENT
                    </div>
                    </center>

                    <div className="headerform">
                        <div style={{ fontSize: '10px' }}>
                            UST Form No. 6A<br />
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
                            <span style={{ fontWeight: 'bold', fontSize: '18px', fontFamily: 'AveriaBold' }}>UNIVERSITY OF SANTO TOMAS</span><br />
                        España St., Manila, Philippines
                    </div>
                        <div>
                            <img src="/images/UST_LOGO.png" alt="UST LOGO" width="80" height="80" />
                        </div>
                    </div>

                    <div className="namesabove">
                        <div>Place a comma (,) between last and first names</div>
                        <div style={{ textAlign: 'right' }}> <b>{studentInfo.term}</b> Term / Special, Academic Year 20<b>{studentInfo.year1}</b> - 20<b>{studentInfo.year2}</b></div>
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
                        <div>LAST NAME</div>
                        <div>FIRST NAME</div>
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
                                            <td style={{ width: '120px' }}>Time</td>
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
                                                                <td style={{ width: '120px' }}  >{x.startTime} - {x.endTime}</td>{/** time*/}
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
                                            <td style={{ width: '120px' }}>Time</td>
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
                                                                <td style={{ width: '120px' }}  >{x.startTime} - {x.endTime}</td>{/** time*/}
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
                        <Row>
                            <div>____________________________</div>
                            <div></div>
                            <div>Dean or Representative</div>
                        </Row>
                        <div></div>
                        <Row>
                            <div>____________________________</div>
                            <div></div>
                            <div>Student's Signature</div>
                        </Row>
                    </div>

                    <div style={{ textAlign: 'right', fontWeight: 'bold', fontStyle: 'italic' }}>
                        UST:S033-00-FO-04
                </div>
                    <center>
                        <div style={{ fontWeight: 'bold' }}>
                            COPY FOR THE DEAN
                    </div>
                    </center>
                </div>

                <Pdf targetRef={ref} filename={`${studentInfo.studentNumber}-add-drop-form.pdf`} options={options}>
                    {({ toPdf }) =>
                        <span style={{ margin: '5px' }}>
                            <center>
                                <Button onClick={goBack} variant='outline-danger' style={{ margin: '10px' }}>Back</Button>
                                <Button onClick={toPdf} style={{ margin: '10px' }}>Save as PDF</Button>
                            </center>
                        </span>
                    }
                </Pdf>
            </div>
        </>
    )
}

export default FORM6APDF