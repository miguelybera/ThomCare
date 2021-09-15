import React, { Fragment } from 'react'
import { Button, Card } from 'react-bootstrap'


const ReportCard = ({requestType, length}) => {
    return (
        <Fragment>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Total {requestType}</Card.Title>
                    <Card.Text>
                        {length}
                    </Card.Text>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default ReportCard