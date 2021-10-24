import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { INSIDE_DASHBOARD_TRUE } from './../../constants/dashboardConstants'
import './error.css'

const Error = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [])

    return (
        <div id="notfound">
            <div class="notfound">
                <div class="notfound-404">
                    <h1>:(</h1>
                </div>
                <h2>We encountered an error!</h2>
                <p>The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.</p>
                <p>Go back home to continue.</p>
                <a href="/">home page</a>
            </div>
        </div>
    )
}

export default Error