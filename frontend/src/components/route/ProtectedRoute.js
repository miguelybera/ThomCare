import React, { Fragment } from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ forStudents, forAdmins, forCICS, forDeptChairs, component: Component, ...rest }) => {
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

                        if (forStudents === true && user.role !== 'Student') {
                            return <Redirect to='/'/>
                        }

                        if (forAdmins === true && user.role === 'Student') {
                            return <Redirect to='/controlpanel'/>
                        }

                        if (forCICS === true && user.role !== 'CICS Staff') {
                            return <Redirect to='/controlpanel'/>
                        }

                        if (forDeptChairs === true && (user.role === 'CICS Staff' || user.role === 'Student')) {
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
