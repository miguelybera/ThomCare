import { Fragment, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUser } from './actions/userActions'
import store from './store'
import './App.css';
import "@fortawesome/fontawesome-free/css/all.min.css"

//layout folder
import ScrollToTop from './components/layout/ScrollToTop'
import Loader from './components/layout/Loader'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

//route folder
import ProtectedRoute from './components/route/ProtectedRoute'

//home/announcement folder
import Announcements from './components/home/announcement/Announcements'
import AnnouncementDetails from './components/home/announcement/AnnouncementDetails'

//home/auth folder
import Login from './components/home/auth/Login'
import Register from './components/home/auth/Register'
import ConfirmRegister from './components/home/auth/ConfirmRegister'
import ForgotPassword from './components/home/auth/ForgotPassword'
import NewPassword from './components/home/auth/NewPassword'
import UpdatePassword from './components/home/auth/UpdatePassword'
import VerifyRegistration from './components/home/auth/VerifyRegistration'

//home/requests/forms folder
import FormsList from './components/home/requests/forms/FormsList'
import DownloadList from './components/home/requests/forms/DownloadList'
import Form6A from './components/home/requests/forms/Form6A'
import Form6B from './components/home/requests/forms/Form6B'
import OverloadForm from './components/home/requests/forms/OverloadForm'
import PetitionClass from './components/home/requests/forms/PetitionClass'

//home/requests folder
import SubmitRequest from './components/home/requests/SubmitRequest'
import TrackingPage from './components/home/requests/TrackingPage'
import TrackingPageProgress from './components/home/requests/TrackingPageProgress'


//dashboard/announcements folder
import ListAnnouncements from './components/dashboard/announcements/ListAnnouncements'
import ListAnnouncementType from './components/dashboard/announcements/ListAnnouncementType'
import ListMyAnnouncements from './components/dashboard/announcements/ListMyAnnouncements'
import ListArchivedAnnouncements from './components/dashboard/announcements/ListArchivedAnnouncements'
import CreateAnnouncement from './components/dashboard/announcements/CreateAnnouncement'
import UpdateAnnouncement from './components/dashboard/announcements/UpdateAnnouncement'

//dashboard/audit folder
import ListAuditLog from './components/dashboard/audit/ListAuditLog'

//dashboard/chat folder
import Messenger from './components/dashboard/chat/chatbox/Messenger'

//dashboard/courses folder
import ListCourses from './components/dashboard/courses/ListCourses'
import CreateCourse from './components/dashboard/courses/CreateCourse'
import UpdateCourse from './components/dashboard/courses/UpdateCourse'

//dashboard/controlpanel folder
import ControlPanel from './components/dashboard/controlpanel/ControlPanel'

//dashboard/forms folder
import ListForms from './components/dashboard/forms/ListForms'
import ManageForms from './components/dashboard/forms/ManageForms'
import CreateForm from './components/dashboard/forms/CreateForm'
import UpdateForm from './components/dashboard/forms/UpdateForm'

//dashboard/requests folder
import ListCICSRequests from './components/dashboard/requests/ListCICSRequests'
import ListDeptChairRequests from './components/dashboard/requests/ListDeptChairRequests'
import ListStudentRequests from './components/dashboard/requests/ListStudentRequests'
import ListMyRequests from './components/dashboard/requests/ListMyRequests'
import ListAllRequests from './components/dashboard/requests/ListAllRequests'
import ListAvailableRequests from './components/dashboard/requests/ListAvailableRequests'
import ListTrash from './components/dashboard/requests/ListTrash'
import ViewRequest from './components/dashboard/requests/ViewRequest'
import UpdateRequest from './components/dashboard/requests/UpdateRequest'

//dashboard/users folder
import ListUsers from './components/dashboard/users/ListUsers'
import ListStudents from './components/dashboard/users/ListStudents'
import Profile from './components/dashboard/users/Profile'
import RegisterAdmin from './components/dashboard/users/RegisterAdmin'
import UpdateUser from './components/dashboard/users/UpdateUser'


function App() {
    const { loading } = useSelector(state => state.auth)
    const { dashboard } = useSelector(state => state.dashboard)

    useEffect(() => {
        console.log('dispatching loadUser from App.js')
        store.dispatch(loadUser())
    }, [])

    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    {loading ? <Loader /> : (
                    <Fragment>
                        { dashboard ? <></> : <Header /> }
                        <div className='container container-fluid'>
                            {/**HOME ROUTES */}
                                {/**ANNOUNCEMENT ROUTES */}
                                    <Route path='/' component={Announcements} exact />
                                    <Route path='/announcement/:id' component={AnnouncementDetails} exact />

                                    <Route path='/track' component={TrackingPage} exact />
                                    <Route path='/track/:trackingNumber/:lastName' component={TrackingPageProgress} exact />

                                {/**AUTH ROUTES */}
                                    <Route path='/login' component={Login} exact />
                                    <Route path='/forgotpassword' component={ForgotPassword} exact />
                                    <Route path='/password/reset/:token' component={NewPassword} exact />
                                    <Route path='/register' component={Register} exact />
                                    <Route path='/confirm/register' component={ConfirmRegister} exact />
                                    <Route path='/verify/account/:token' component={VerifyRegistration} exact />

                                {/**FORMS ROUTES */}
                                    <ProtectedRoute path='/submit/request' component={SubmitRequest} exact />
                                    <ProtectedRoute path='/forms/list' component={FormsList} exact />
                                    <Route path='/download/forms/list' component={DownloadList} exact />
                                    <ProtectedRoute path='/forms/form-6a' component={Form6A} exact />
                                    <ProtectedRoute path='/forms/form-6b' component={Form6B} exact />
                                    <ProtectedRoute path='/forms/petition-classes' component={PetitionClass} exact />
                                    <ProtectedRoute path='/forms/overload-form' component={OverloadForm} exact />
                            {/**HOME ROUTES */}

                            {/**CONTROL PANEL ROUTES */}
                                {/**ALL USERS ROUTES */}
                                    {/**CONTROL PANEL */}
                                    <ProtectedRoute path='/controlpanel' component={ControlPanel} exact />

                                    {/**PROFILE */}
                                    <ProtectedRoute path='/profile' component={Profile} exact />
                                    <ProtectedRoute path='/password/update' component={UpdatePassword} exact />

                                    {/**MESSENGER */}
                                    <ProtectedRoute path='/messenger' component={Messenger} exact />

                                    {/**REQUESTS */}
                                    <ProtectedRoute path='/admin/requests/trash' component={ListTrash} exact />
                                    <ProtectedRoute path='/view/request/:id' component={ViewRequest} exact />
                                    <ProtectedRoute path='/admin/request/:id' component={UpdateRequest} exact />
                                {/**ALL USERS ROUTES */}

                                {/**DEPT CHAIR ROUTES */}
                                    {/**REQUESTS */}
                                    <ProtectedRoute path='/admin/deptchair/requests' component={ListDeptChairRequests} exact />
                                    {/**USERS */}
                                    <ProtectedRoute path='/admin/deptchair/students' component={ListStudents} exact />
                                {/**DEPT CHAIR ROUTES */}

                                {/**STUDENT ROUTES */}
                                    {/**REQUESTS */}
                                        <ProtectedRoute path='/me/requests' component={ListStudentRequests} exact />
                                    {/**FORMS */}
                                        <ProtectedRoute path='/downloadable-forms' component={ListForms} exact />
                                {/**STUDENT ROUTES */}

                                {/**CICS STAFF ROUTES */}
                                    {/**REQUESTS */}
                                        <ProtectedRoute path='/admin/all/requests' component={ListAllRequests} exact />
                                        <ProtectedRoute path='/admin/cics/requests' component={ListCICSRequests} exact />
                                        <ProtectedRoute path='/admin/cics/available/requests' component={ListAvailableRequests} exact />
                                        <ProtectedRoute path='/admin/me/requests' component={ListMyRequests} exact />
                                    {/**USERS */}
                                        <ProtectedRoute path='/admin/users' component={ListUsers} exact />
                                        <ProtectedRoute path='/admin/register' component={RegisterAdmin} exact />
                                        <ProtectedRoute path='/admin/user/:id' component={UpdateUser} exact />
                                {/**CICS STAFF ROUTES */}

                                {/**DEPT CHAIR & CICS STAFF ROUTES */}
                                    {/**COURSES */}
                                        <ProtectedRoute path='/admin/courses' component={ListCourses} exact />
                                        <ProtectedRoute path='/admin/new/course' component={CreateCourse} exact />
                                        <ProtectedRoute path='/admin/course/:id' component={UpdateCourse} exact />
                                        
                                    {/*FORMS */}
                                        <ProtectedRoute path='/admin/manageforms' component={ManageForms} exact />
                                        <ProtectedRoute path='/admin/new/form' component={CreateForm} exact />
                                        <ProtectedRoute path='/admin/form/:id' component={UpdateForm} exact />
                                    {/**ANNOUNCEMENTS */}
                                        <ProtectedRoute path='/admin/announcements' component={ListAnnouncements} exact />
                                        <ProtectedRoute path='/admin/me/announcements' component={ListMyAnnouncements} exact />
                                        <ProtectedRoute path='/admin/archives/announcements' component={ListArchivedAnnouncements} exact />
                                        <ProtectedRoute path='/admin/announcementTypes' component={ListAnnouncementType} exact />
                                        <ProtectedRoute path='/admin/new/announcement' component={CreateAnnouncement} exact />
                                        <ProtectedRoute path='/admin/announcement/:id' component={UpdateAnnouncement} exact />
                                    {/**AUDIT */}
                                        <ProtectedRoute path='/audit' component={ListAuditLog} exact />
                                {/**DEPT CHAIR & CICS STAFF ROUTES */}
                            {/**CONTROL PANEL ROUTES */}
                        </div>
                        { dashboard ? <></> : <Footer /> }
                    </Fragment>
                    )}
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
