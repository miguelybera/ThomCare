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
    width: fit-content;
    
    &:active{ 
      background-color:#294b32;
      color: white;
    }

    &:hover{
      text-align:center;
      display: inline-block;
      border-radius: 10px
    }
}`;

const Images = styled.div`
    margin-right: 5px;
`;
const Drop = styled.div` 
    a, .navbar-nav .nav-link  {
    border-radius: 105px;
    color: black;
    }
    
    &:hover{
        color: black;
    }`;

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
                        <Navbar.Collapse id="responsive-navbar-nav" style={{ float: "right", fontSize: "0.85rem", fontWeight: "bold" }}>
                            <Nav variant="pills" className="image">
                                <Nav.Link><Link to='/' activeStyle>Announcements</Link></Nav.Link>
                                <Nav.Link className={user ? "" : "d-none "}><Link to='/forms/list' activeStyle>Generate Form</Link></Nav.Link>
                                <Nav.Link><Link to='/download/forms/list' activeStyle>Downloadable Forms</Link></Nav.Link>
                                <Nav.Link className={user ? "" : "d-none "}><Link to='/submit/request' activeStyle onClick={() => { dispatch({ type: SUBMIT_REQUEST_RESET }) }}>Submit Request</Link></Nav.Link>
                                <Nav.Link><Link to='/track' activeStyle>Track my Request</Link></Nav.Link>
                                <Nav.Link className={user ? "d-none " : ""} href="/login">Login</Nav.Link>
                            </Nav>
                            {!loading && user &&
                                <Drop>
                                    <NavDropdown title={`${user.firstName}`} id="basic-nav-dropdown">
                                        <NavDropdown.Item><Link to='/controlpanel'>Control Panel</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/messenger'>Messenger</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item style={{ color: 'red' }}>
                                            <Link to='/' onClick={logoutHandler}>
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