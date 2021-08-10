import React from 'react'
import '../../App'

const Loader = () => {
    return (
        <div class="d-flex justify-content-center" style={{height: '100vh', width: '100%', alignContent: 'center', margin: 'auto'}}>
            <div class="spinner-border text-primary loader" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    )
}

export default Loader
