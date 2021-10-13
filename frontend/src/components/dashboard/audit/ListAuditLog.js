import React, { Fragment, useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Form, Row, Col, Button, FormControl } from 'react-bootstrap'
import { MDBDataTableV5 } from 'mdbreact'
import { getAuditLog, clearErrors } from '../../../actions/auditActions'
import { INSIDE_DASHBOARD_TRUE } from '../../../constants/dashboardConstants'
import Sidebar from '../../layout/Sidebar'
import MetaData from '../../layout/MetaData'
import Loader from '../../layout/Loader'
import dateformat from 'dateformat'

const dropdown = {
    border: "2px solid black",
    borderRadius: "20px",
    margin: '5px 0'
}

const ListAllRequests = ({ history }) => {
    const alert = useAlert()
    const dispatch = useDispatch()

    const { loading, audits, error } = useSelector(state => state.audits)

    const [searchButton, setSearchButton] = useState(1)
    const [filter, setFilter] = useState({
        searchType: '',
        searchItem: ''
    })

    const { searchType, searchItem } = filter


    const changeDateFormat = (date) => dateformat(date, "yyyy-mm-dd h:MMtt")

    useEffect(() => {
        dispatch(getAuditLog(filter))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')

            setFilter({
                searchItem: '',
                searchType: ''
            })
        }

        dispatch({
            type: INSIDE_DASHBOARD_TRUE
        })
    }, [dispatch, history, alert, error])

    useEffect(() => {
        dispatch(getAuditLog(filter))

        if (error) {
            alert.error(error)
            dispatch(clearErrors())

            history.push('/error')

            setFilter({
                searchItem: '',
                searchType: ''
            })
        }
    }, [dispatch, history, alert, error, searchButton])

    const setAudits = () => {
        const data = {
            columns: [
                {
                    label: 'Date',
                    field: 'dateAudit',
                    width: 150
                },
                {
                    label: 'Event Name',
                    field: 'name',
                    width: 200
                },
                {
                    label: 'Event Info',
                    field: 'eventInfo',
                    width: 450
                },
                {
                    label: 'User',
                    field: 'user',
                    width: 200
                }
            ],
            rows: []
        }

        audits.forEach(audit => {
            data.rows.push({
                dateAudit: changeDateFormat(audit.dateAudit),
                eventInfo: audit.eventInfo,
                user: audit.user,
                name: audit.name
            })
        })

        return data
    }

    const searchHandler = e => {
        e.preventDefault()

        setSearchButton(searchButton + 1)
    }

    const onChange = e => {
        setFilter({
            ...filter,
            [e.target.name]: e.target.value
        })
    }
    return (
        <Fragment>
            <MetaData title={'Audit Log'} />
            <Sidebar />
            <div className="row">
                <div className="">
                    <Container className="space_inside"></Container>
                    <Container>
                        <h3>Audit Log</h3>

                        <Form onSubmit={searchHandler}>
                            <Row >
                                <Col xs={12} md={4} lg={2}>
                                    <Form.Group>
                                        <Form.Select
                                            aria-label="SearchType"
                                            size="sm"
                                            style={dropdown}
                                            name="searchType"
                                            value={searchType}
                                            onChange={onChange}
                                        >
                                            <option value=''>Type</option>
                                            <option value="user">User</option>
                                            <option value="name">Event Name</option>
                                            <option value="keyword">Event Info</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>

                                <Col xs={12} md={4} lg={2}>
                                    <Form.Group sm>
                                        <FormControl
                                            type="search"
                                            placeholder="Search"
                                            className="mr-2"
                                            aria-label="Search"
                                            size="sm"
                                            name="searchItem"
                                            value={searchItem}
                                            onChange={onChange}
                                            width="170px"
                                            right="0px"
                                            style={dropdown}
                                            disabled={searchType === '' ? true : false}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col xs={12} md={4} lg={2}>
                                    <Form.Group sm>
                                        <center>
                                            <Button type='submit' style={{ margin: '5px' }} disabled={searchType === '' ? true : false}>Submit</Button>
                                            <Button
                                                type='submit'
                                                onClick={() => {
                                                    setFilter({
                                                        searchType: '',
                                                        searchItem: ''
                                                    })
                                                }}
                                                style={{ margin: '5px' }}
                                            >Reset</Button>
                                        </center>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </Form>

                        {loading ? <Loader /> : (
                            <>
                                <MDBDataTableV5
                                    data={setAudits()}
                                    searchTop
                                    pagingTop
                                    scrollX
                                    entriesOptions={[5, 20, 25]}
                                    entries={10}
                                />
                            </>
                        )}
                    </Container>
                </div>
            </div>
        </Fragment>
    )
}

export default ListAllRequests