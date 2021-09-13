import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import Pdf from "react-to-pdf";
import {
    INSIDE_DASHBOARD_FALSE
} from '../../../constants/dashboardConstants'
import './css/form6a.css'

const ref = React.createRef();

const FORM6APDF = (props) => {
    const dispatch = useDispatch();

    const { formData } = useSelector(state => state.form)

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_FALSE
        })
    }, [dispatch])

    const studentNumber = formData.studentNumber.split('')
    const firstName = formData.firstName.split('')
    const middleName = formData.middleName.split('')[0]
    const lastName = formData.lastName.split('')

    const options = {
        number: 0.5
    }
    return (
        <>
            <div className="Post" ref={ref}>
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
                        <img src="" alt="UST LOGO" width="100" height="100" />
                    </div>
                </div>

                <div className="namesabove">
                    <div>Place a comma (,) between last and first names</div>
                    <div style={{ textAlign: 'right' }}>_________ Term / Special, Academic Year 20 ___ - 20 ___</div>
                </div>

                <div className="namesform">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    {lastName.map(letter => (
                                        <td>{letter}</td>
                                    ))}
                                    <td>,</td>
                                    
                                    {firstName.map(letter => (
                                        <td>{letter}</td>
                                    ))}
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    
                                    <td>{middleName}</td>
                                    <td>.</td>
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
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div>
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
                                    <tr>
                                        <td>{formData.firstName} {formData.middleName}</td>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>

                <center>NEW TOTAL UNITS</center>

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
                            </tbody>
                        </table>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <span style={{ fontWeight: 'bold' }}>UNIVERSITY OF SANTO TOMAS</span><br />
                        España St., Manila, Philippines

                    </div>
                    <div>
                        <img src="ust seal.png" alt="UST LOGO" width="100" height="100" />
                    </div>
                </div>

                <div className="namesabove">
                    <div>Place a comma (,) between last and first names</div>
                    <div style={{ textAlign: 'right' }}>_________ Term / Special, Academic Year 20 ___ - 20 ___</div>
                </div>

                <div className="namesform">
                    <div>
                        <table>
                            <tbody>
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
                            </tbody>
                        </table>
                    </div>
                    <div>
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
                                </tbody>
                            </table>
                        </div>
                    </div>
                </center>

                <center>NEW TOTAL UNITS</center>

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
                {({ toPdf }) => <button onClick={toPdf}>Capture as PDF</button>}
            </Pdf>
        </>
    );
}

export default FORM6APDF