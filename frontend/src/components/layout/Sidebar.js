import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="sidebar-wrapper" style={{marginTop: "160px", padding: "10px", border: "#9c0b0b"}}>
            <nav id="sidebar">
                <ul className="list-unstyled components">
                    <li>
                        <Link to="/controlpanel"><i className="fa fa-tachometer"></i> Control Panel</Link>
                    </li>

                    <li>
                        <Link to='/admin/announcements'><i></i> Announcements</Link>
                    </li>

                    <li>
                        <Link to="/admin/archives/announcements"><i className="fa fa-tachometer"></i> Archived Announcements</Link>
                    </li>

                    <hr/>
                    
                    <li>
                    <Link to='/manageforms'><i className="fa fa-tachometer"></i> Downloadable Forms *</Link>
                    </li>


                    <li>
                    <Link to='/studentrequestslist'><i className="fa fa-tachometer"></i> Requests *</Link>
                    </li>

                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Trash</Link>
                    </li>

                    <hr/>
                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Audit Log</Link>
                    </li>

                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Register</Link>
                    </li>


                                

                    <li>
                        <Link to="/admin/users"><i className="fa fa-users"></i> Users *</Link>
                    </li>

                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Messages</Link>
                    </li>

                    <li>
                        <Link to="/admin/reviews"><i className="fa fa-star"></i> Settings</Link>
                    </li>

                    <li>
                        <Link to="/dashboard"><i className="fa fa-tachometer"></i> Log out</Link>
                    </li>

                </ul>
            </nav>
        </div>
    )
}

export default Sidebar