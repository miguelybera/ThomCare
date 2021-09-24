import React, { Fragment } from 'react'
import './styles.css'

const ReportCard = ({ requestType, length, icon, color }) => {
    return (
    <Fragment >
        <div class={`card bg-c-${color} order-card`}>
            <div class="card-block">
                <h6 class="m-b-20">{requestType}</h6>
                <h2 class="text-right">
                    <i class={`fa fa-${icon}`}></i>
                    <span> {length} </span>
                    <span style={{fontSize: '16px'}}>request(s)</span>
                </h2>
            </div>
        </div>
    </Fragment>
    )
}

export default ReportCard
