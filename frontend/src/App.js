import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from './store'
import { useEffect } from 'react'

import Header from './components/Header'
import Login from './components/Login'
import Register from './components/Register'
import ForgotPassword from './components/ForgotPassword'
import UpdatePassword from './components/UpdatePassword'
import Messenger from './components/chat/chatbox/Messenger'

import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/userActions'


function Home() {
    return(
        <>
            <div>Cant access this</div>
        </>
    )
}
function App() {

    const { loading } = useSelector(state => state.auth)
    
    useEffect(() => {
        store.dispatch(loadUser())
    }, [])

  return (
        <Router>
            <div className="App">
                <Header/>
                <div className='container container-fluid'>
                    <Route path='/' component={Home} exact/>      
                    <Route path='/login' component={Login} exact/>
                    <Route path='/forgotpassword' component={ForgotPassword} exact/>
                    <Route path='/updatepassword' component={UpdatePassword} exact/>
                    <Route path='/register' component={Register} exact/>
                    <ProtectedRoute path='/messenger' loggedIn={true} component={Messenger} exact/>
                </div>
            </div>
        </Router>
  );
}

export default App;
