import createHistory from 'history/createBrowserHistory'

import { useDispatch } from 'react-redux'
import { REQUEST_DETAILS_RESET } from './../../constants/requestConstants'

const History = () => {
    const myHistory = createHistory()

    const dispatch = useDispatch()
    
    myHistory.listen(location => {
        console.log(location)
        dispatch({
            type: REQUEST_DETAILS_RESET
        })
    })
}

export default History