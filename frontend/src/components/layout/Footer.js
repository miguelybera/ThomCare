import React, { Fragment } from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'
import '../../App.css'

const Style = styled.div`
    z-index: 1;
    margin-top: auto;
    width: 100%;
    background-color: #9c0b0b;
    color: white;
    bottom: 0;
    right: 0;
    left:0;
    position: relative;`;

const Footer = () => {
    return (
        <Fragment>
            <Style>
                <Row xs={15}>
                    <Col style={{ bottom: "0px", paddingTop: "20px", display: "flex", paddingBottom: "0px", paddingLeft: "130px" }}>
                        <img
                            src="/images/UST_SEAL.png"
                            width="84px"
                            height="80px"
                            float="right"

                            alt="CICS Seal"
                        />
                    </Col>
                    <Col xs={9}>
                        <p style={{ paddingTop: "20px", paddingBottom: "0px", paddingLeft: "0px", fontSize: "80%" }}>
                            University of Santo Tomas - College of Information and Computing Sciences <br />
                            <i class="fa fa-map-marker" aria-hidden="true"></i> Blessed Pier Giorgio Frassati Building <br />
                            <i class="fa fa-location-arrow" aria-hidden="true"></i> Espana Blvd., Sampaloc, Manila, Philippines 1008 <br />
                            <i class="fa fa-phone" aria-hidden="true"></i> Local: +632-4061611 local 8241 <br />
                            <i class="fa fa-fax" aria-hidden="true"></i> Telefax: +632-7315738
                        </p>
                    </Col>
                    <Col>
                    </Col>
                </Row>
                <Row>
                    <p style={{ textAlign: "center", fontSize: "70%" }}>© COPYRIGHT 2021. ALL RIGHTS RESERVED.</p>
                </Row>
            </Style>
        </Fragment>
    )
}

export default Footer