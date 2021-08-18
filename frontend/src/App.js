import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from './store'
import { useEffect } from 'react'

//layout folder
import Header from './components/layout/Header'
import ScrollToTop from './components/layout/ScrollToTop'

//user folder
import Login from './components/user/Login'
import Register from './components/user/Register'
import ConfirmRegister from './components/user/ConfirmRegister'
import ForgotPassword from './components/user/ForgotPassword'
import Profile from './components/user/Profile'
import NewPassword from './components/user/NewPassword'
import VerifyRegistration from './components/user/VerifyRegistration'

//chat folder
import Messenger from './components/chat/chatbox/Messenger'

//announcement folder
import Announcements from './components/announcement/Announcements'
import AnnouncementDetails from './components/announcement/AnnouncementDetails'

//request folder
import TrackingPage from './components/request/TrackingPage'

//route folder
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
                <ScrollToTop>
                    <Header/>
                    <div className='container container-fluid'>
                        <Route path='/' component={Announcements} exact/>    
                        <Route path='/announcement/:id' component={AnnouncementDetails} exact/>    
                        <Route path='/login' component={Login} exact/>
                        <Route path='/forgotpassword' component={ForgotPassword} exact/>
                        <Route path='/password/reset/:token' component={NewPassword} exact/>
                        <Route path='/verify/account/:token' component={VerifyRegistration} exact/>
                        <Route path='/register' component={Register} exact/>
                        <Route path='/confirmregister' component={ConfirmRegister} exact/>

                        <Route path='/track' component={TrackingPage} exact/>
                        {/**needs to be logged in */}
                        <ProtectedRoute path='/messenger' loggedIn={true} component={Messenger} exact/>
                        <ProtectedRoute path='/profile' loggedIn={true} component={Profile} exact/>
                    </div>
                </ScrollToTop>
            </div>
        </Router>
  );
}

export default App;
