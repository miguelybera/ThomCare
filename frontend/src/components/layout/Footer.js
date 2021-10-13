import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { logout } from '../../actions/userActions'
import { SUBMIT_REQUEST_RESET } from './../../constants/requestConstants'
import './footer.css'

const Footer = () => {

    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            {/* <Style>
                <Row xs={15}>
                    <Col style={{ bottom: "0px", paddingTop: "20px", display: "flex", paddingBottom: "0px", paddingLeft: "130px" }}>
                        <img src="/images/UST_SEAL.png" width="84px" height="80px" float="right" alt="CICS Seal"/>
                    </Col>
                    <Col xs={9}>
                        <p style={{ paddingTop: "20px", paddingBottom: "0px", paddingLeft: "0px", fontSize: "80%" }}>
                            University of Santo Tomas - College of Information and Computing Sciences <br />
                            <i class="fa fa-map-marker" aria-hidden="true"></i> Blessed Pier Giorgio Frassati Building <br />
                            <i class="fa fa-location-arrow" aria-hidden="true"></i> Espana Blvd., Sampaloc, Manila, Philippines 1008 <br />
                            <i class="fa fa-phone" aria-hidden="true"></i> Local: +632-4061611 local 8241 <br />
                            <i class="fa fa-fax" aria-hidden="true"></i> Telefax: +632-7315738
                        </p>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <p style={{ textAlign: "center", fontSize: "70%" }}>© COPYRIGHT 2021. ALL RIGHTS RESERVED.</p>
                </Row>
            </Style> */}
            {/* <footer className="footer-dark">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6 item text">
                            <img src="/images/UST_SEAL.png" height="40%" float="right" alt="CICS Seal" />
                        </div>
                        <div className="col-sm-12 col-md-6 item">
                            <h3>Contact Info</h3>
                            <ul>
                                <i class="fa fa-map-marker" aria-hidden="true"></i> Blessed Pier Giorgio Frassati Building <br />
                                <i class="fa fa-location-arrow" aria-hidden="true"></i> Espana Blvd., Sampaloc, Manila, Philippines 1008 <br />
                                <i class="fa fa-phone" aria-hidden="true"></i> Local: +632-4061611 local 8241 <br />
                                <i class="fa fa-fax" aria-hidden="true"></i> Telefax: +632-7315738
                            </ul>
                        </div>
                    </div>
                    <p className="copyright">© COPYRIGHT 2021. ALL RIGHTS RESERVED.</p>
                </div>
            </footer> */}
            <div class="footer-dark">
                <footer>
                    <div class="container">
                        <div class="row">
                            <div class="col-md-6 item text">
                                <img src="/images/UST_WHITE.png" alt="Seal of the University of Santo Tomas" className="ust-seal" />
                                {/* <img src="/images/CICS_SEAL.png" alt="CICS Seal" className="cics-seal" /> */}
                            </div>
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Contact Info</h3>
                                <ul>
                                    <i class="fa fa-map-marker" aria-hidden="true"></i> Blessed Pier Giorgio Frassati Building <br />
                                    <i class="fa fa-location-arrow" aria-hidden="true"></i> Espana Blvd., Sampaloc, Manila, Philippines 1008 <br />
                                    <i class="fa fa-phone" aria-hidden="true"></i> Local: +632-4061611 local 8241 <br />
                                    <i class="fa fa-envelope" aria-hidden="true"></i> Email: cics@ust.edu.ph <br />
                                    <i class="fa fa-fax" aria-hidden="true"></i> Telefax: +632-7315738
                                </ul>
                            </div>
                            <div class="col-sm-6 col-md-3 item">
                                <h3>Quick links</h3>
                                <ul>
                                    <li><Link to='/' activeStyle>Announcements</Link></li>
                                    <li className={user ? "" : "d-none "}><Link to='/forms/list' activeStyle>Generate Form</Link></li>
                                    <li><Link to='/download/forms/list' activeStyle>Downloadable Forms</Link></li>
                                    <li className={user ? "" : "d-none "}><Link to='/submit/request' activeStyle onClick={() => { dispatch({ type: SUBMIT_REQUEST_RESET }) }}>Submit Request</Link></li>
                                    <li><Link to='/track' activeStyle>Track my Request</Link></li>
                                    <li className={user ? "d-none" : "mt-3"}><a style={{ backgroundColor: '#f0f9ff', color: '#9c0b0b', border: 'solid 1px #9c0b0b', borderRadius: '10px', padding: '2px 10px'}} href="/login">Login</a></li>
                                    <li className={user ? "mt-3" : "d-none"}><Link onClick={logoutHandler} style={{ backgroundColor: '#f0f9ff', color: '#9c0b0b', border: 'solid 1px #9c0b0b', borderRadius: '10px', padding: '2px 10px'}}>Log out</Link></li>
                                </ul>
                            </div>
                        </div>
                        <p class="copyright">© COPYRIGHT 2021. THOMCARE. ALL RIGHTS RESERVED.</p>
                    </div>
                </footer>
            </div>
        </Fragment>
    )
}

export default Footer