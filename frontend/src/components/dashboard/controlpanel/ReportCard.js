import React, { Fragment } from 'react'
import './styles.css'

const ReportCard = ({ requestType, length, icon }) => {
    return (<Fragment >
        <div class="card bg-c-blue order-card">
                <div class="card-block">
                    <h6 class="m-b-20">{requestType}</h6>
                    <h2 class="text-right"><i class="fa fa-cart-plus f-right"></i><span>{length}</span></h2>
                    <p class="m-b-0"> Total {requestType}</p>
                </div>
            </div>
    </Fragment>
    )
}

export default ReportCard