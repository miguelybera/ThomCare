import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import styled from 'styled-components'
import { logout } from '../../actions/userActions'
import { SUBMIT_REQUEST_RESET } from './../../constants/requestConstants'
import '../../App.css'

const Styles = styled.div`
    background-color: white;

    a, .navbar-nav .nav-link {
    color: black;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
    paddingTop: 0px;
    paddingBottom: 0px;
    border-radius: 105px;
    width: fit-content;
}`;

const Images = styled.div`
    margin-right: 5px;
`;

const Drop = styled.div` 
    a, .navbar-nav .nav-link  {
    border-radius: 105px;
    color: black;
    font-size: 0.85rem;
    }`;

const navBrandStyle = {
    fontSize: '0.85rem',
    margin: '0px auto',
    padding: '2px'
}

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { loading, user } = useSelector(state => state.auth)

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully.')
    }

    return (
        <Fragment>
            <Styles>
                <Navbar style={{ backgroundColor: 'white', borderBottom: "7px solid #9c0b0b" }} expand="lg">
                    <Container >
                        {/* <Images><img src="/images/UST_LOGO.png" width="60" height="60" className="mr-2" alt="CICS Seal" /></Images> */}
                        <Images><img src="/images/CICS_SEAL.png" width="50" height="60" className="mr-2" alt="CICS Seal" /></Images>
                        <Navbar.Brand style={{ fontFamily: "AveriaBold", color: "#9c0b0b", paddingBottom: "0px", paddingLeft: "10px" }}>
                            <p style={{ fontFamily: "MuktaMalar", fontWeight: "bold", fontSize: "70%", paddingTop: "5px", marginBottom: "0px" }}>
                                College of Information and Computing Sciences
                                </p>
                            <h1 style={{ fontSize: "150%", marginTop: "0px", paddingTop: "0px", borderTop: "10px" }}>
                                ThomCare
                                </h1>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav" style={{ float: "right", fontSize: "0.85rem", fontWeight: "bold", color: 'black' }}>
                            <Nav variant="pills" className="green-button">
                                <Link to='/' className="green-button-children"><Navbar.Brand style={navBrandStyle}>Announcements</Navbar.Brand></Link>
                                <Link to='/forms/list' className={user ? "green-button-children" : "d-none "}><Navbar.Brand style={navBrandStyle}>Generate Form</Navbar.Brand></Link>
                                <Link to='/download/forms/list' className="green-button-children"><Navbar.Brand style={navBrandStyle}>Downloadable Forms</Navbar.Brand></Link>
                                <Link to='/submit/request' onClick={() => { dispatch({ type: SUBMIT_REQUEST_RESET }) }} className={user ? "green-button-children" : "d-none "}><Navbar.Brand style={navBrandStyle}>Submit Request</Navbar.Brand></Link>
                                <Link to='/track' className="green-button-children"><Navbar.Brand style={navBrandStyle}>Track my Request</Navbar.Brand></Link>

                                <Nav.Link href='/login' className={user ? "d-none" : "green-button-children"} style={{ marginLeft: '6px'}}><Navbar.Brand style={navBrandStyle}>Login</Navbar.Brand></Nav.Link>
                            </Nav>
                            {!loading && user &&
                                <Drop>
                                    <NavDropdown title={`${user.firstName}`} id="basic-nav-dropdown" style={{ marginLeft: '-8px'}}>
                                        <NavDropdown.Item><Link to='/controlpanel'>Control Panel</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/messenger'>Messenger</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item>
                                            <Link to='/' onClick={logoutHandler} style={{ color: 'red'}}>
                                                Log out
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Drop>
                            }
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </Styles>
        </Fragment>
    )
}

export default Header