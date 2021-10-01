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
        store.dispatch(loadUser())
    }, [])

    return (
        <Router>
            <div className="App">
                <ScrollToTop>
                    {!loading &&
                        <Fragment>     
                            {!dashboard && (<Header/>)}
                            <div className='container container-fluid'>
                                {/**HOME ROUTES */}
                                    {/**ANNOUNCEMENT ROUTES */}
                                        <Route path='/' component={Announcements} exact />
                                        <Route path='/announcement/:id' component={AnnouncementDetails} exact />

                                    {/**TRACK REQUEST ROUTES */}
                                        <Route path='/track' component={TrackingPage} exact />
                                        <Route path='/track/:trackingNumber/:lastName' component={TrackingPageProgress} exact />

                                    {/**AUTH ROUTES */}
                                        <Route path='/login' component={Login} exact />
                                        <Route path='/forgotpassword' component={ForgotPassword} exact />
                                        <Route path='/password/reset/:token' component={NewPassword} exact />
                                        <Route path='/register' component={Register} exact />
                                        <Route path='/verify/account/:token' component={VerifyRegistration} exact />

                                    {/**FORMS ROUTES */}
                                        <ProtectedRoute path='/submit/request' forStudents={true} component={SubmitRequest} exact />
                                        <ProtectedRoute path='/forms/list' forStudents={true} component={FormsList} exact />
                                        <Route path='/download/forms/list' component={DownloadList} exact />
                                        <ProtectedRoute path='/forms/form-6a' forStudents={true} component={Form6A} exact />
                                        <ProtectedRoute path='/forms/form-6b' forStudents={true} component={Form6B} exact />
                                        <ProtectedRoute path='/forms/overload-form' forStudents={true} component={OverloadForm} exact />
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
                                        <ProtectedRoute path='/admin/deptchair/requests' forDeptChairs={true} component={ListDeptChairRequests} exact />
                                        {/**USERS */}
                                        <ProtectedRoute path='/admin/deptchair/students' forDeptChairs={true} component={ListStudents} exact />
                                    {/**DEPT CHAIR ROUTES */}

                                    {/**STUDENT ROUTES */}
                                        {/**REQUESTS */}
                                            <ProtectedRoute path='/me/requests' forStudents={true} component={ListStudentRequests} exact />
                                        {/**FORMS */}
                                            <ProtectedRoute path='/downloadable-forms' forStudents={true} component={ListForms} exact />
                                    {/**STUDENT ROUTES */}

                                    {/**CICS STAFF ROUTES */}
                                        {/**REQUESTS */}
                                            <ProtectedRoute path='/admin/all/requests' forCICS={true} component={ListAllRequests} exact />
                                            <ProtectedRoute path='/admin/cics/requests' forCICS={true} component={ListCICSRequests} exact />
                                            <ProtectedRoute path='/admin/cics/available/requests' forCICS={true} component={ListAvailableRequests} exact />
                                            <ProtectedRoute path='/admin/me/requests' forCICS={true} component={ListMyRequests} exact />
                                        {/**USERS */}
                                            <ProtectedRoute path='/admin/users' forCICS={true} component={ListUsers} exact />
                                            <ProtectedRoute path='/admin/register' forCICS={true} component={RegisterAdmin} exact />
                                            <ProtectedRoute path='/admin/user/:id' forCICS={true} component={UpdateUser} exact />
                                        {/**AUDIT */}
                                            <ProtectedRoute path='/audit' forCICS={true} component={ListAuditLog} exact />
                                    {/**CICS STAFF ROUTES */}

                                    {/**DEPT CHAIR & CICS STAFF ROUTES */}
                                        {/**COURSES */}
                                            <ProtectedRoute path='/admin/courses' forAdmins={true} component={ListCourses} exact />
                                            <ProtectedRoute path='/admin/new/course' forAdmins={true} component={CreateCourse} exact />
                                            <ProtectedRoute path='/admin/course/:id' forAdmins={true} component={UpdateCourse} exact />
                                            
                                        {/*FORMS */}
                                            <ProtectedRoute path='/admin/manageforms' forAdmins={true} component={ManageForms} exact />
                                            <ProtectedRoute path='/admin/new/form' forAdmins={true} component={CreateForm} exact />
                                            <ProtectedRoute path='/admin/form/:id' forAdmins={true} component={UpdateForm} exact />
                                        {/**ANNOUNCEMENTS */}
                                            <ProtectedRoute path='/admin/announcements' forAdmins={true} component={ListAnnouncements} exact />
                                            <ProtectedRoute path='/admin/me/announcements' forAdmins={true} component={ListMyAnnouncements} exact />
                                            <ProtectedRoute path='/admin/archives/announcements' forAdmins={true} component={ListArchivedAnnouncements} exact />
                                            <ProtectedRoute path='/admin/announcementTypes' forAdmins={true} component={ListAnnouncementType} exact />
                                            <ProtectedRoute path='/admin/new/announcement' forAdmins={true} component={CreateAnnouncement} exact />
                                            <ProtectedRoute path='/admin/announcement/:id' forAdmins={true} component={UpdateAnnouncement} exact />
                                    {/**DEPT CHAIR & CICS STAFF ROUTES */}
                                {/**CONTROL PANEL ROUTES */}
                            </div>
                            {!dashboard && (<Footer/>)}
                    </Fragment>}
                </ScrollToTop>
            </div>
        </Router>
    )
}

export default App;
