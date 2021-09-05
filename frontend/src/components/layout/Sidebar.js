import React, { Fragment, useState } from 'react'
import styled from 'styled-components'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import { SidebarData } from './SidebarData'
import SubMenu from './SubMenu'
import { IconContext } from 'react-icons/lib'

const Nav = styled.div`
    background: #640606;
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
   
    
`;

const NavBottom = styled.div`

`;

const NavIcon = styled(Link)`
    margin-left: 2rem;
    font-size: 2rem;
    height 80px;
    display: flex;
    justify-contents: flex-start;
    align-items: center;
    color: white;

    &:hover {
        color: yellow;
    }
    
`;

const SidebarNav = styled.nav`
    background: #9C0B0A;
    width: 250px;
    height: 100vh;
    display: flex;
    justify-content: center;
    position: fixed;
    top: 0; 
    left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
    transition: 130ms;
    z-index:1000;
    overflow-y: auto;
`;

const SidebarText = styled.div`
    font-size: 20px;
`;


const SidebarWrap = styled.div`
    width: 100%;
    
`;

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
                    <p style={{ paddingTop: "13px", fontSize: "20px", color: "white", paddingLeft: "20px", paddingRight: "22px" }}>ThomCare</p>
                </Nav>

                <SidebarNav sidebar={sidebar} >
                    <SidebarWrap>
                        <NavIcon to="#">
                            <AiIcons.AiOutlineClose onClick={showSidebar} />
                        </NavIcon>
                        {
                            user.role === 'Student' ? (
                                <Fragment>
                                    {SidebarData[0].map((item, index) => {
                                        return <SubMenu item={item} key={index} />;
                                    })}
                                </Fragment>
                            ) : (
                                user.role === 'Dept Chair' ? (
                                    <Fragment>
                                        {SidebarData[1].map((item, index) => {
                                            return <SubMenu item={item} key={index} />;
                                        })}
                                    </Fragment>
                                ) : (
                                    <Fragment>
                                        {SidebarData[2].map((item, index) => {
                                            return <SubMenu item={item} key={index} />;
                                        })}
                                    </Fragment>
                                )
                            )
                        }

                    </SidebarWrap>
                </SidebarNav>
                <NavBottom></NavBottom>
            </IconContext.Provider>
        </>
    );
};

export default Sidebar