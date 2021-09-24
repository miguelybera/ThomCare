import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import store from './store'
import { Fragment, useEffect } from 'react'
import './App.css';

//layout folder
import Header from './components/layout/Header'
import ScrollToTop from './components/layout/ScrollToTop'
import Footer from './components/layout/Footer'

//user folder
import Login from './components/home/auth/Login'
import Register from './components/home/auth/Register'
import ConfirmRegister from './components/home/auth/ConfirmRegister'
import ForgotPassword from './components/home/auth/ForgotPassword'
import UpdatePassword from './components/home/auth/UpdatePassword'
import NewPassword from './components/home/auth/NewPassword'
import VerifyRegistration from './components/home/auth/VerifyRegistration'

//chat folder
import Messenger from './components/dashboard/chat/chatbox/Messenger'

//announcement folder
import Announcements from './components/home/announcement/Announcements'
import AnnouncementDetails from './components/home/announcement/AnnouncementDetails'

//request folder
import TrackingPage from './components/home/requests/TrackingPage'
import TrackingPageProgress from './components/home/requests/TrackingPageProgress'
import SubmitRequest from './components/home/requests/SubmitRequest'

//forms
import Form6A from './components/home/requests/forms/Form6A'
import Form6B from './components/home/requests/forms/Form6B'
import OverloadForm from './components/home/requests/forms/OverloadForm'
import PetitionClass from './components/home/requests/forms/PetitionClass'
import FormsList from './components/home/requests/forms/FormsList'
import DownloadList from './components/home/requests/forms/DownloadList'

//dashboard folder
import ControlPanel from './components/dashboard/controlpanel/ControlPanel'
import ListAnnouncements from './components/dashboard/announcements/ListAnnouncements'
import ListAnnouncementType from './components/dashboard/announcements/ListAnnouncementType'
import ListMyAnnouncements from './components/dashboard/announcements/ListMyAnnouncements'
import CreateAnnouncement from './components/dashboard/announcements/CreateAnnouncement'
import UpdateAnnouncement from './components/dashboard/announcements/UpdateAnnouncement'
import ListArchivedAnnouncements from './components/dashboard/announcements/ListArchivedAnnouncements'

import ListUsers from './components/dashboard/users/ListUsers'
import UpdateUser from './components/dashboard/users/UpdateUser'
import RegisterAdmin from './components/dashboard/users/RegisterAdmin'
import Profile from './components/dashboard/users/Profile'

import UpdateRequest from './components/dashboard/requests/UpdateRequest'
import ViewRequest from './components/dashboard/requests/ViewRequest'
import ListCICSRequests from './components/dashboard/requests/ListCICSRequests'
import ListDeptChairRequests from './components/dashboard/requests/ListDeptChairRequests'
import ListAllRequests from './components/dashboard/requests/ListAllRequests'
import ListStudentRequests from './components/dashboard/requests/ListStudentRequests'
import ListAvailableRequests from './components/dashboard/requests/ListAvailableRequests'
import ListMyRequests from './components/dashboard/requests/ListMyRequests'
import ListTrash from './components/dashboard/requests/ListTrash'

import ListAuditLog from './components/dashboard/audit/ListAuditLog'
import ListForms from './components/dashboard/forms/ListForms'
import ManageForms from './components/dashboard/forms/ManageForms'
import CreateForm from './components/dashboard/forms/CreateForm'
import UpdateForm from './components/dashboard/forms/UpdateForm'

//route folder
import ProtectedRoute from './components/route/ProtectedRoute'

import { loadUser } from './actions/userActions'


function App() {
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
                            <Route path='/confirm/register' component={ConfirmRegister} exact />

                            <Route path='/track' component={TrackingPage} exact />
                            <Route path='/track/:trackingNumber/:lastName' component={TrackingPageProgress} exact />

                            {/**needs to be logged in */}
                            <ProtectedRoute path='/forms/list' component={FormsList} exact />
                            <ProtectedRoute path='/download/forms/list' component={DownloadList} exact />
                            <ProtectedRoute path='/forms/form-6a' component={Form6A} exact />
                            <ProtectedRoute path='/forms/form-6b' component={Form6B} exact />
                            <ProtectedRoute path='/forms/petition-classes' component={PetitionClass} exact />
                            <ProtectedRoute path='/forms/overload-form' component={OverloadForm} exact />
                            <ProtectedRoute path='/submit/request' component={SubmitRequest} exact />

                            <ProtectedRoute path='/messenger' component={Messenger} exact />
                            <ProtectedRoute path='/profile' component={Profile} exact />
                            <ProtectedRoute path='/password/update' component={UpdatePassword} exact />

                            {/*control panel*/}
                            <ProtectedRoute path='/controlpanel' component={ControlPanel} exact />
                            <ProtectedRoute path='/admin/announcements' component={ListAnnouncements} exact />
                            <ProtectedRoute path='/admin/announcementTypes' component={ListAnnouncementType} exact />
                            <ProtectedRoute path='/admin/me/announcements' component={ListMyAnnouncements} exact />
                            <ProtectedRoute path='/admin/new/announcement' component={CreateAnnouncement} exact />
                            <ProtectedRoute path='/admin/announcement/:id' component={UpdateAnnouncement} exact />
                            <ProtectedRoute path='/admin/archives/announcements' component={ListArchivedAnnouncements} exact />
                            <ProtectedRoute path='/admin/users' component={ListUsers} exact />
                            <ProtectedRoute path='/admin/user/:id' component={UpdateUser} exact />
                            <ProtectedRoute path='/admin/register' component={RegisterAdmin} exact />
                            <ProtectedRoute path='/admin/cics/requests' component={ListCICSRequests} exact />
                            <ProtectedRoute path='/admin/request/:id' component={UpdateRequest} exact />
                            <ProtectedRoute path='/view/request/:id' component={ViewRequest} exact />
                            <ProtectedRoute path='/admin/deptchair/requests' component={ListDeptChairRequests} exact />
                            <ProtectedRoute path='/admin/all/requests' component={ListAllRequests} exact />
                            <ProtectedRoute path='/me/requests' component={ListStudentRequests} exact />
                            <ProtectedRoute path='/admin/requests/trash' component={ListTrash} exact />
                            <ProtectedRoute path='/admin/cics/available/requests' component={ListAvailableRequests} exact />
                            <ProtectedRoute path='/admin/me/requests' component={ListMyRequests} exact />
                            <ProtectedRoute path='/audit' component={ListAuditLog} exact />
                            <ProtectedRoute path='/admin/manageforms' component={ManageForms} exact />
                            <ProtectedRoute path='/downloadable-forms' component={ListForms} exact />
                            <ProtectedRoute path='/admin/new/form' component={CreateForm} exact />
                            <ProtectedRoute path='/admin/form/:id' component={UpdateForm} exact />
                        </div>
                        {
                            dashboard ? <></> : <Footer />
                        }
                    </Fragment>
                    {/*})}*/}
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
