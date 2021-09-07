import React from 'react'
import '../../App'

const Loader = () => {
    return (
        <div class="d-flex justify-content-center" style={{ height: '100vh', width: '100%', alignContent: 'center', margin: 'auto' }}>
            <div class="text-primary" role="status" style={{ margin: 'auto' }}>
                <i class="fa fa-circle-o-notch fa-spin fa-3x fa-fw"></i>
            </div>
        </div>
    )
}

export default Loader