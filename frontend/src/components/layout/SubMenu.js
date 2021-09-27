import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/userActions'
import styled from 'styled-components'

const SidebarLink = styled(Link)`
    display:flex;
    color: #e1e9fc;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 0 20px;
    height: 50px;
    text-decoration: none;
    font-size: 15px;

    &:hover {
        background: #640606;
        border-left: 4px solid #ffffff;
        cursor: pointer;
        text-decoration: none;
        color: white;
    }`;

const SidebarLabel = styled.span`
    margin-left: 16px;`;

const DropdownLink = styled(Link)`
    background: #640606;
    height: 50px;
    padding-left: 3rem;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #f5f5f5;
    font-size: 15px;

    &:hover {
        background: #ffffff;
        border-left: 4px solid #ffffff;
        cursor: pointer;
        text-decoration: none;
    }`;

const SubMenu = ({ item }) => {
    const dispatch = useDispatch()
    const alert = useAlert()

    const [subnav, setSubnav] = useState(false);

    const showSubnav = () => setSubnav(!subnav);

    const logoutHandler = () => {
        dispatch(logout())
        alert.success('Logged out successfully.')
        // window.location.reload(true);
    }

    return (
        <>
            {item.title === 'Log out' ?
                <Fragment>
                    <SidebarLink to='/' onClick={logoutHandler}>
                        <div>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </div>
                    </SidebarLink>
                </Fragment> :
                <Fragment>
                    <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                        <div>
                            {item.icon}
                            <SidebarLabel>{item.title}</SidebarLabel>
                        </div>
                        <div>
                            {item.subNav && subnav
                                ? item.iconOpened
                                : item.subNav
                                    ? item.iconClosed
                                    : null}
                        </div>
                    </SidebarLink>
                </Fragment>
            }
            {subnav && item.subNav.map((item, index) => {
                return (
                    <DropdownLink to={item.path} key={index}>
                        {item.icon}
                        <SidebarLabel>{item.title}</SidebarLabel>
                    </DropdownLink>
                )
            })
            }
        </>
    )
}

export default SubMenu