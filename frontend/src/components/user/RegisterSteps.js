import React from 'react'
import { Link } from 'react-router-dom'


const RegisterSteps = ({ register, confirm }) => {




    return (
        <Fragment>
            <div class="progress">
                <div
                    class="progress-bar" 
                    role="progressbar" 
                    style={register ? {width: '25'}}
                    style="width: 25%;" 
                    aria-valuenow="25" 
                    aria-valuemin="0" 
                    aria-valuemax="100"
                >
                </div>
            </div>
        </Fragment>
    )
}

export default RegisterSteps
