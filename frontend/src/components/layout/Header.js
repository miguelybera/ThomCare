import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useAlert } from 'react-alert'
import { Link } from 'react-router-dom'
import { Nav, NavDropdown, Navbar, Container, Button } from 'react-bootstrap'
import { logout } from '../../actions/userActions'

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
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand><Link to='/' style={{ textDecoration: 'none', color: 'black' }}>ThomCare</Link></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {user ? (
                                <>
                                    <Nav.Link><Link to='/'>Announcements</Link></Nav.Link>
                                    <Nav.Link><Link to='/request'>Request</Link></Nav.Link>
                                    <Nav.Link><Link to='/track'>Track my request</Link></Nav.Link>
                                    <NavDropdown title={userName} id="basic-nav-dropdown">
                                        <NavDropdown.Item><Link to='/controlpanel'>Control Panel</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/profile'>My Profile</Link></NavDropdown.Item>
                                        <NavDropdown.Item><Link to='/messenger'>Messenger</Link></NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item style={{ color: 'red' }}><span onClick={() => logoutHandler()}>Log out</span></NavDropdown.Item>
                                    </NavDropdown>
                                </>) : (
                                <>
                                    <Nav.Link><Link to='/'>Announcements</Link></Nav.Link>
                                    <Nav.Link><Link to='/request'>Request</Link></Nav.Link>
                                    <Nav.Link><Link to='/track'>Track my request</Link></Nav.Link>
                                    <Nav.Link><Link to='/login'>
                                        <Button variant='danger'>Login</Button>    
                                    </Link></Nav.Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Header