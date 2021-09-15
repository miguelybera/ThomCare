import React, { Fragment } from 'react'

const ReportCard = ({ requestType, length, icon }) => {
    return (<Fragment >
        <div className="col-xl-3 col-sm-6 col-12" >
            <div className="card" >
                <div className="card-content" >
                    <div className="card-body" >
                        <div className="media d-flex" >
                            <div className="align-self-center" >
                                <i className={`icon-${icon} primary font-large-2 float-left`} > </i> </div>
                            <div className="media-body text-right" >
                                <h3 > {length} </h3>
                                <span > Total {requestType} </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}

export default ReportCard