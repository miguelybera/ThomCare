import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Modal, Button } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getUsers, deleteUser, clearErrors } from '../../../actions/userActions'
import { DELETE_USER_RESET } from '../../../constants/userConstants'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'

const ListUsers = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { user: currentUser } = useSelector(state => state.auth)
    const { loading, users, error } = useSelector(state => state.users)
    const { error: deleteError, isDeleted } = useSelector(state => state.user)

    const [show, setShow] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState('');

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        dispatch(getUsers())

        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (deleteError) {
            alert.error(deleteError)
            dispatch(clearErrors())
        }

        if (isDeleted) {
            alert.success('User has been deleted successfully.')
            history.push('/admin/users')

            dispatch({
                type: DELETE_USER_RESET
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error, isDeleted, deleteError])

    const deleteUserHandler = (id) => {
        dispatch(deleteUser(id))
        handleClose()
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
                    width: 150
                }
            ],
            rows: []
        }

        users.forEach(user => {
            const middleName = user.middleName ? user.middleName.split(' ') : ''

            let middleInitial = ''

            middleName && middleName.forEach(x => {
                middleInitial += x[0]
            })
            
            data.rows.push({
                role: user.role,
                name: `${user.firstName} ${middleInitial} ${user.lastName}`,
                email: user.email,
                actions: <Fragment>
                    {(user._id === currentUser._id) ? (
                        <span>
                            <Link to={`/profile`}>
                                <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                                    <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                </Button>
                            </Link>
                        </span>
                    ) : (
                        <span>
                            <Link to={`/admin/user/${user._id}`}>
                                <Button variant="primary" className="mr-5" style={{ margin: '5px' }}>
                                    <i class="fa fa-pencil" aria-hidden="true" style={{ textDecoration: 'none', color: 'white' }} />
                                </Button>
                            </Link>
                        </span>
                    )
                    }
                    <Button variant="danger" className="mr-5" disabled={user._id === currentUser._id ? true : false} style={{ margin: '5px' }} onClick={() => {
                        handleShow()
                        setDeleteUserId(user._id)
                    }}>
                        <i class="fa fa-trash" aria-hidden="true" />
                    </Button>
                </Fragment >
            })

        })

        return data
    }

    return (
        <Fragment>
            <MetaData title={'All Users'} />
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Are you sure you want to delete this user?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    This change cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={() => deleteUserHandler(deleteUserId)}>Yes, I'm sure</Button>
                </Modal.Footer>
            </Modal>

            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>

                    <Container>
                        <h3>Users</h3>
                        {loading ? <Loader /> : (
                            <MDBDataTableV5
                                data={setUsers()}
                                searchTop
                                pagingTop
                                scrollX
                                entriesOptions={[5, 20, 25]}
                                entries={10}
                            />
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListUsers
