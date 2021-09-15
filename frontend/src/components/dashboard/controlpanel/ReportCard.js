import React, { Fragment } from 'react'
import { Card } from 'react-bootstrap'


const ReportCard = ({ requestType, length }) => {
    return (
        <Fragment>
            <Card style={{ width: '10rem', margin: '10px auto' }}>
                <Card.Body style={{textAlign: 'center'}}>
                    <Card.Text style={{fontWeight: 'bold'}}>
                        Total {requestType}
                    </Card.Text>
                    <Card.Title>{length}</Card.Title>
                </Card.Body>
            </Card>
        </Fragment>
    )
}

export default ReportCard