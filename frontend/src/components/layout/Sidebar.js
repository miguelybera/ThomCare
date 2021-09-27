import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { IconContext } from 'react-icons/lib'
import styled from 'styled-components'
import SubMenu from './SubMenu'
import { SidebarData } from './SidebarData'

const Nav = styled.div`
    background: #9C0B0A;
    height: 50px;
    right:0px;
    left:0px;
    width: 100%;
    display: flex;
    justify-contents: flex-start;
    align-items: center;
    padding: 0px;
    margin: 0px;
    position: absolute;
    top: 0px;
    z-index:10;
    border-bottom: 7px #750908 solid;`;

const NavIcon = styled(Link)`
    margin-left: 1rem;
    font-size: 2rem;
    height 80px;
    display: flex;
    justify-contents: flex-start;
    align-items: center;
    color:  white;
    padding-top: 0px;
    margin-top: 0px;
    margin-right: 0px;

    &:hover {
        color: yellow;
    }`;

const NavTitle = styled.div`
    margin-left: 10px;
    display:flex;
    align-items: center;
    justify-content: center;
    z-index: -2;`;

const NavUser = styled.div`
    width: 100%;
    padding-right: 20px; 
    justify-content: flex-end;
    color: white;
    display: flex;
    padding-top: 14px;
    font-weight: bold;
    margin-right: 2rem;
    height: 50px;
    position: absolute;
    z-index: -1;`;

const SidebarNav = styled.nav`
    background: #750908;
    width: 240px;
    top: 50px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 130ms;
    z-index:1000;
    overflow-y: auto;`;

const SidebarWrap = styled.div`
    width: 100%;`;

const Sidebar = () => {
    const { user } = useSelector(state => state.auth)

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
            <IconContext.Provider value={{ color: '#red' }}>
                <Nav>
                    <NavIcon to="#">
                        <FaIcons.FaBars onClick={showSidebar} />
                    </NavIcon>
                    <NavTitle>

                        <img
                            src="/images/CICS_SEAL.png"
                            width="26"
                            height="29"
                            paddingRight="0px"
                            alt="CICS Seal" />

                        <p style={{
                            color: "white",
                            fontFamily: "AveriaBold",
                            paddingTop: "17px",

                            fontSize: "20px",
                            textAlign: "center",

                            paddingLeft: "6px",
                        }}>ThomCare Control Panel</p>
                    </NavTitle>
                    <NavUser>
                        <p > {user.role}:</p>
                        <p style={{ color: "#9C0B0A" }}>_ </p>
                        <p > {user.firstName}</p>
                    </NavUser>
                </Nav>
                <SidebarNav sidebar={sidebar} >
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {user.role === 'Student' ? (
                            <Fragment>
                                {SidebarData[0].map((item, index) => {
                                    return <SubMenu item={item} key={index} />;
                                })}
                            </Fragment>
                        ) : (
                            user.role === 'CICS Staff' ? (
                                <Fragment>
                                    {SidebarData[2].map((item, index) => {
                                        return <SubMenu item={item} key={index} />;
                                    })}
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {SidebarData[1].map((item, index) => {
                                        return <SubMenu item={item} key={index} />;
                                    })}
                                </Fragment>
                            )
                        )}
                    </SidebarWrap>
                </SidebarNav>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar