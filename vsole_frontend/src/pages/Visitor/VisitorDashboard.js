import {FaUserCheck, FaEnvelope, FaPhoneAlt} from "react-icons/fa";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../css/VisitorDashboard.css";

function VisitorDashboard() {

    const visitor =
    JSON.parse(
        localStorage.getItem("visitor")
    );
    
    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="visitor-dashboard">
                    <h1>Visitor Management Dashboard</h1>
                   
                    <div className="visitor-cards">
                        <div className="visitor-card">
                            <FaUserCheck className="card-icon" />
                            <h3>Purpose</h3>
                            <p>{visitor?.purpose}</p>
                        </div>

                        <div className="visitor-card">
                            <FaEnvelope className="card-icon" />
                            <h3>Email</h3>
                            <p>{visitor?.visitor_email} </p>
                        </div>

                        <div className="visitor-card">
                            <FaPhoneAlt className="card-icon" />
                            <h3>Contact</h3>
                            <p>{visitor?.contact_no}</p>
                        </div>
                    </div>

                    <div className="visitor-info-box">
                        <h2>Visitor Information</h2>
                        <div className="info-grid">
                            <div>
                                <label>Name</label>
                                <p>{visitor?.visitor_name}</p>
                            </div>
                            <div>
                                <label>Email</label>
                                <p>{visitor?.visitor_email}</p>
                            </div>
                            <div>
                                <label>Contact</label>
                                <p>{visitor?.contact_no}</p>
                            </div>
                            <div>
                                <label>Purpose</label>
                                <p>{visitor?.purpose}</p>
                            </div>
                            <div>
                                <label>Check In</label>
                                <p>{ visitor?.check_in ?new Date(visitor.check_in).toLocaleString() :"-"}</p>
                            </div>
                            <div>
                                <label>Check Out</label>
                                <p>{visitor?.check_out ? new Date(visitor.check_out).toLocaleString : "-"}</p>
                            </div>
                            <div>
                                <label>Status</label>
                                <p className="active-status">Active</p>
                            </div>
                        </div>
                    </div>

                    <div className="instruction-box">
                        <h2>Visitor Instructions</h2>
                        <ul>
                            <li>Carry visitor ID card at all times.</li>
                            <li>Follow office security rules.</li>
                            <li> Contact reception for support.</li>
                            <li>Complete checkout before leaving.</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VisitorDashboard;