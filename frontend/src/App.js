import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from './store'
import { Fragment, useEffect } from 'react'
import './App.css';

//layout folder
import Header from './components/layout/Header'
import ScrollToTop from './components/layout/ScrollToTop'
import Loader from './components/layout/Loader'

//user folder
import Login from './components/user/Login'
import Register from './components/user/Register'
import ConfirmRegister from './components/user/ConfirmRegister'
import ForgotPassword from './components/user/ForgotPassword'
import Profile from './components/user/Profile'
import UpdatePassword from './components/user/UpdatePassword'
import NewPassword from './components/user/NewPassword'
import VerifyRegistration from './components/user/VerifyRegistration'

//chat folder
import Messenger from './components/chat/chatbox/Messenger'

//announcement folder
import Announcements from './components/announcement/Announcements'
import AnnouncementDetails from './components/announcement/AnnouncementDetails'

//request folder
import TrackingPage from './components/request/TrackingPage'
import TrackingPageProgress from './components/request/TrackingPageProgress'
import SubmitRequest from './components/request/SubmitRequest'

//forms
import Form6A from './components/request/forms/Form6A'

//dashboard folder
import ControlPanel from './components/dashboard/ControlPanel'
import ListAnnouncements from './components/dashboard/ListAnnouncements'
import CreateAnnouncement from './components/dashboard/CreateAnnouncement'
import UpdateAnnouncement from './components/dashboard/UpdateAnnouncement'
import ListArchivedAnnouncements from './components/dashboard/ListArchivedAnnouncements'
import ListUsers from './components/dashboard/ListUsers'
import UpdateUser from './components/dashboard/UpdateUser'
import RegisterAdmin from './components/dashboard/RegisterAdmin'
import ListCICSRequests from './components/dashboard/ListCICSRequests'
import UpdateRequest from './components/dashboard/UpdateRequest'

//route folder
import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/userActions'


function App() {

    const { loading } = useSelector(state => state.auth)
    const { dashboard } = useSelector(state => state.dashboard)

    useEffect(() => {
        store.dispatch(loadUser())

    }, [])

    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    {/*{loading ? <Loader /> : (*/}
                    <Fragment>
                        {
                            dashboard ? <></> : <Header />
                        }
                        <div className='container container-fluid'>
                            <Route path='/' component={Announcements} exact />
                            <Route path='/announcement/:id' component={AnnouncementDetails} exact />
                            <Route path='/login' component={Login} exact />
                            <Route path='/forgotpassword' component={ForgotPassword} exact />
                            <Route path='/password/reset/:token' component={NewPassword} exact />
                            <Route path='/verify/account/:token' component={VerifyRegistration} exact />
                            <Route path='/register' component={Register} exact />
                            <Route path='/confirmregister' component={ConfirmRegister} exact />

                            <Route path='/track' component={TrackingPage} exact />
                            <Route path='/track/:id' component={TrackingPageProgress} exact />

                            {/**needs to be logged in */}
                            <ProtectedRoute path='/form-6a' component={Form6A} exact />
                            <ProtectedRoute path='/submitrequest' component={SubmitRequest} exact />

                            <ProtectedRoute path='/messenger' component={Messenger} exact />
                            <ProtectedRoute path='/profile' component={Profile} exact />
                            <ProtectedRoute path='/password/update' component={UpdatePassword} exact />

                            {/*control panel*/}
                            <ProtectedRoute path='/controlpanel' component={ControlPanel} exact />
                            <ProtectedRoute path='/admin/announcements' component={ListAnnouncements} exact />
                            <ProtectedRoute path='/admin/new/announcement' component={CreateAnnouncement} exact />
                            <ProtectedRoute path='/admin/announcement/:id' component={UpdateAnnouncement} exact />
                            <ProtectedRoute path='/admin/archives/announcements' component={ListArchivedAnnouncements} exact />
                            <ProtectedRoute path='/admin/users' component={ListUsers} exact />
                            <ProtectedRoute path='/admin/user/:id' component={UpdateUser} exact />
                            <ProtectedRoute path='/admin/register' component={RegisterAdmin} exact />
                            <ProtectedRoute path='/admin/cics/requests' component={ListCICSRequests} exact />
                            <ProtectedRoute path='/admin/cics/request/:id' component={UpdateRequest} exact />
                        </div>
                    </Fragment>
                    {/*})}*/}
                </ScrollToTop>
            </div>
        </Router>
    );
}

export default App;
