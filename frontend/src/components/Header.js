import React from 'react'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'

const Header = () => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home">ThomCare</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link><Link to='/login'>Login</Link></Nav.Link>
                        <Nav.Link><Link to='/register'>Register</Link></Nav.Link>
                        <Nav.Link><Link to='/updatepassword'>Update Password</Link></Nav.Link>
                        <Nav.Link><Link to='/newpassword'>New Password</Link></Nav.Link>
                        <NavDropdown title="User Name" id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" style={{color: 'red'}}>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header