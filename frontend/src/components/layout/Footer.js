import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import '../../App.css'
import styled from 'styled-components'

const Cards = styled.div`
    background-color: yellow;
    
    
  text-align: center;
  color: white;
  
  clear: both;
    position: relative;
    height: 200px;
    margin-top: -200px;
  bottom: 0px;
  margin: 0px;
  padding: 0px;
  
  z-index: 1;
  
`;

const Style = styled.div`
z-index: 1;
  width: 100%;
background-color: #9c0b0b;
color: white;
bottom: 0;
right: 0;
left:0;
  position: relative;
`;

const Left = styled.div`
    position: relative;
    margin-left: 10px
    paddingto
`;
const Footer = () => {
    return (
        <Fragment>
            <Style>
                <Row xs={15}>
                    <Col style={{bottom: "0px",paddingTop: "20px", display: "flex", paddingBottom: "0px", paddingLeft: "130px"}}>
                <img
                        src="/images/UST_SEAL.png"
                        width="84px"
                        height="80px" 
                        float="right"
                        
                        alt="CICS Seal"
                    />
                    </Col>
                    <Col xs={9}>
                <p style={{paddingTop: "20px", paddingBottom: "0px", paddingLeft: "0px", fontSize: "80%"}}>
                    UST-College of Information and Computing Sciences <br/>
                    Blessed Pier Giorgio Frassati Building <br/>
                    
                    Espana Blvd., Sampaloc, Manila, Philippines 1008 <br/>
                    +632-4061611 local 8241 or +632-7315738 for telefax 
                    
                </p>
                </Col>
                <Col>
                </Col>
                </Row>
                <Row>
                    <p style={{textAlign:"center" ,fontSize: "70%"}}>© COPYRIGHT 2021.ALL RIGHTS RESERVED.</p>
                </Row>
            </Style>
        </Fragment>
    )
}

export default Footer