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

import { loadUser } from './actions/userActions'

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
                    <Route path='/login' component={Login} exact/>
                    <Route path='/forgotpassword' component={ForgotPassword} exact/>
                    <Route path='/updatepassword' component={UpdatePassword} exact/>
                    <Route path='/register' component={Register} exact/>
                    <Route path='/messenger' component={Messenger} exact/>
                </div>
            </div>
        </Router>
  );
}

export default App;
