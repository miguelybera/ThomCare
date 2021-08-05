import React from 'react'
import { useDispatch, useSelector } from  'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container } from 'react-bootstrap'
import { logout } from '../actions/userActions'

const Header = () => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const { user } = useSelector(state => state.auth)
    
    let userName = ''

    if(user && user.firstName) {
        userName = user.firstName
    }

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully')
    }
    
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
                        <Nav.Link><Link to='/messenger'>Messenger</Link></Nav.Link>
                        <NavDropdown title={userName ? userName : 'None'} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Dashboard</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">My Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4" style={{color: 'red'}}><span onClick={() => logoutHandler()}>Log out</span></NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header