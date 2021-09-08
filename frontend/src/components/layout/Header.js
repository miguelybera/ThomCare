import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container, Button } from 'react-bootstrap'
import { logout } from '../../actions/userActions'
import '../../App.css'
import styled from 'styled-components'

const Styles = styled.div`
    background-color: white;

  a, .navbar-nav .nav-link {
    color: white;
    
    text-decoration: none;
    font-weight: bold;
    text-align:center;
    paddingTop: 0px;
    paddingBottom: 0px;
    width:fit-content;
    
    &:active{ 
      background-color:#294b32;
      color: black;
    }

    &:hover{
      
      text-align:center;
      display: inline-block;
      border-radius: 10px;
      
    }
   
  }`;

const Drop = styled.div` 
  a, .navbar-nav .nav-link  {
  border-radius: 105px;
  color: black;
  
}`;

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)

    let userName = ''

    if (user && user.firstName) {
        userName = user.firstName
    }

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }

    return (
        <>
            <Fragment>
                <Styles fixed="top">
                    <Navbar expand="lg" >
                        <Container>
                            <img
                                src="/images/CICS_SEAL.png"
                                width="50"
                                height="60"
                                float="right"
                                margin="1150px"
                                alt="CICS Seal" />
                            <Navbar.Brand style={{
                                fontFamily: "AveriaBold",
                                color: "#9c0b0b",
                                paddingBottom: "0px",
                                paddingLeft: "10px"
                            }}>
                                <p style={{ fontFamily: "MuktaMalar", fontWeight: "bold", fontSize: "70%", paddingTop: "5px", marginBottom: "0px" }}>College of Information and Computing Sciences</p>
                                <h1 style={{ fontSize: "150%", marginTop: "0px", paddingTop: "0px", borderTop: "10px" }}>ThomCare</h1></Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            {user ? (
                                <>
                                    <Navbar.Collapse id="responsive-navbar-nav"
                                        style={{
                                            float: "right",
                                            fontSize: "85%",
                                            fontWeight: "bold",
                                        }}>
                                        <Nav variant="pills"
                                            style={{
                                                marginLeft: "auto",
                                                paddingRight: "15px",
                                                paddingLeft: "15px",
                                                border: "2px solid #294b32",
                                                borderRadius: "105px",
                                                backgroundColor: "#294b32"
                                            }}>
                                            <Nav.Link><Link to='/' activeStyle>Announcements</Link></Nav.Link>
                                            <Nav.Link><Link to='/forms-list' activeStyle>Generate Form</Link></Nav.Link>
                                            <Nav.Link><Link to='/submitrequest' activeStyle>Submit Request</Link></Nav.Link>
                                            <Nav.Link><Link to='/track' activeStyle>Track my Request</Link></Nav.Link>
                                        </Nav>

                                        <Drop>
                                            <NavDropdown title={`${user.firstName}`} id="basic-nav-dropdown">
                                                <NavDropdown.Item><Link to='/controlpanel'>Control Panel</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
                                                <NavDropdown.Item><Link to='/messenger'>Messenger</Link></NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item style={{ color: 'red' }}><span onClick={() => logoutHandler()}>Log out</span></NavDropdown.Item>
                                            </NavDropdown>
                                        </Drop>
                                    </Navbar.Collapse>
                                </>) : (
                                <>
                                    <Navbar.Collapse id="responsive-navbar-nav"
                                        style={{
                                            float: "right",
                                            fontSize: "85%",
                                            fontWeight: "bold",
                                        }}>
                                        <Nav variant="pills"
                                            style={{
                                                marginLeft: "auto",
                                                paddingRight: "15px",
                                                paddingLeft: "15px",
                                                border: "2px solid #294b32",
                                                borderRadius: "105px",
                                                backgroundColor: "#294b32"
                                            }}>
                                            <Nav.Link><Link to='/' activeStyle>Announcements</Link></Nav.Link>
                                            <Nav.Link><Link to='/forms-list' activeStyle>Generate Form</Link></Nav.Link>
                                            <Nav.Link><Link to='/submitrequest' activeStyle>Submit Request</Link></Nav.Link>
                                            <Nav.Link><Link to='/track' activeStyle>Track my Request</Link></Nav.Link>
                                            <Nav.Link><Link to='/login' activeStyle>Login</Link></Nav.Link>
                                        </Nav>
                                    </Navbar.Collapse>
                                </>
                            )}
                        </Container>
                    </Navbar>
                </Styles>
            </Fragment>
        </>
    )
}

export default Header