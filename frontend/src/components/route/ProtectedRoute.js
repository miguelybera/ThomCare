import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ forAdmins, forCICS, forDeptChairs, component: Component, ...rest }) => {
    const { isAuthenticated, loading, user } = useSelector(state => state.auth)

    return (
        <Fragment>
            {loading === false && (
                <Route
                    {...rest}
                    render={props => {

                        if (isAuthenticated === false) {
                            return <Redirect to='/login' />
                        }

                        if (forAdmins === true && user.role === 'Student') {
                            return <Redirect to='/controlpanel'/>
                        }

                        if (forCICS === true && user.role !== 'CICS Office') {
                            return <Redirect to='/controlpanel'/>
                        }

                        if (forDeptChairs === true && (user.role === 'CICS Office' || user.role === 'Student')) {
                            return <Redirect to='/controlpanel'/>
                        }

                        return <Component {...props} />
                    }}
                />
            )}
        </Fragment>
    )
}

export default ProtectedRoute
