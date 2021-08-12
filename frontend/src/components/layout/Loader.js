import React from 'react'
import '../../App'

const Loader = () => {
    return (
        <div class="d-flex justify-content-center" style={{height: '100vh', width: '100%', alignContent: 'center', margin: 'auto'}}>
            <div class="spinner-border text-primary loader" role="status">
                
            </div>
        </div>
    )
}

export default Loader
