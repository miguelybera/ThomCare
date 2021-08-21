import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, deleteUser, clearErrors } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'
import Sidebar from '../layout/Sidebar'
import MetaData from '../layout/MetaData'
import Loader from '../layout/Loader'
import { Container } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'

const ListUsers = ({history}) => {

    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, users, error } = useSelector(state => state.users)
    const { error: deleteError, isDeleted } = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getUsers())

        if(error){
            alert.error(error)
            dispatch(clearErrors())
        }

        if(deleteError){
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if(isDeleted){
            alert.success('Announcement has been deleted successfully.')
            history.push('/admin/users')

            dispatch({
                type: DELETE_USER_RESET
            })
        }
        
    }, [dispatch, alert, error, isDeleted, deleteError])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
    }

    const setUsers = () => {

        const data = {
            columns: [
                {
                    label: 'Role',
                    field: 'role',
                    width: 100
                },
                {
                    label: 'Name',
                    field: 'name',
                    width: 150
                },
                {
                    label: 'Email',
                    field: 'email',
                    width: 300
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    width: 100
                }
            ],
            rows: []
        }

        users.forEach(user => {
            data.rows.push({
                role: user.role,
                name: `${user.firstName} ${user.lastName}`,
                email: user.email,
                actions: <Fragment>
                    <button><Link to={`/admin/user/${user._id}`}>Update</Link></button>
                    <button onClick={() => deleteUserHandler(user._id)}>Delete</button>
                </Fragment>
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            {loading ? <Loader /> : (
                <div className="row">
                    <div className="col-12 col-md-2">
                        <Sidebar />
                    </div>

                    <div className="col-12 col-md-10">
                        <h1 className="my-4">Control Panel</h1>

                        <Container className="space_inside"></Container>

                        <Container>
                            <h3>Users</h3>
                            
                            <MDBDataTableV5
                                data={setUsers()}
                                hover
                                searchTop
                                pagingTop
                                scrollX
                                entriesOptions={[5, 20, 25]}
                                entries={5}
                            />
                        </Container>
                    </div>
                </div>
            )}
        </Fragment>
    )
}

export default ListUsers
