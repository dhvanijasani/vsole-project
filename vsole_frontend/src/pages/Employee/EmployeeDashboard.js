import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../css/EmployeeDashboard.css";
import { FaCalendarCheck, FaUserCheck } from "react-icons/fa";
import { empDashboard } from "../../services/api";

function EmployeeDashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const [dashboard, setDashboard] = useState({
        attendance: 0,
        status: "",
        clock_in: "",
        clock_out: "",
        progress: 0
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        try {
            const response = await empDashboard(user.id);
            console.log("Dashboard Response =>", response.data);
            setDashboard(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="employee-dashboard">
                    <div className="dashboard-cards">
                        <div className="dashboard-card">
                            <FaCalendarCheck className="card-icon" />
                            <h3>Attendance</h3>
                            <h2>{dashboard.attendance}</h2>
                        </div>
                        <div className="dashboard-card">
                            <FaUserCheck className="card-icon" />
                            <h3>Status</h3>
                            <h2>{dashboard.status}</h2>
                        </div>
                    </div>

                    <div className="attendance-card">
                        <h2>Today's Attendance</h2>
                        <div className="attendance-row">
                            <span>Clock In</span>
                            <strong>{dashboard.clock_in ? new Date(dashboard.clock_in).toLocaleTimeString(): "-"}</strong>
                        </div>
                        <div className="attendance-row">
                            <span>Clock Out</span>
                            <strong>{dashboard.clock_out ? new Date(dashboard.clock_out).toLocaleTimeString(): "-"}</strong>
                        </div>
                        <div className="attendance-row">
                            <span>Status</span>
                            <strong>{dashboard.status}</strong>
                        </div>
                    </div>

                    <div className="progress-card">
                        <h2>Daily Progress</h2>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${dashboard.progress}%` }} ></div>
                        </div>
                        <p>{dashboard.progress}% Completed</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeDashboard;