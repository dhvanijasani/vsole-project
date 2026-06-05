import { Link, useNavigate } from "react-router-dom";
import { MdDashboard, MdPeople, MdAccessTime, MdLogout, MdPersonAdd} from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import "../css/Sidebar.css";

function Sidebar() {
    const navigate = useNavigate();

    const user =
    JSON.parse(localStorage.getItem("user"));

    const visitor =
    JSON.parse(localStorage.getItem("visitor"));

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("visitor");
        navigate("/");
    };

    return (

        <div className="sidebar">
            <h1 className="logo">VSOLE</h1>
            {
                user?.role === "Admin" ? <>
                        <Link to="/dashboard" className="menu-item"><MdDashboard /><span>Dashboard</span></Link>
                        <Link to="/add-employee" className="menu-item"><MdPersonAdd /> <span> Add Employee </span> </Link>
                        <Link to="/employee-list" className="menu-item"><MdPeople /><span>Employee List </span> </Link>
                        <Link to="/attendance-monitor"className="menu-item" ><MdAccessTime /> <span> Attendance</span> </Link>
                        <Link to="/visitor-log" className="menu-item" ><FaUserFriends /><span>Visitors </span></Link>
                    </> :visitor ?<>
                       <Link to="/visitor-dashboard" className="menu-item"><MdDashboard /><span>Dashboard</span></Link>
                    </> : <>
                        <Link to="/employee-dashboard" className="menu-item"><MdDashboard /> <span> Dashboard</span> </Link>
                        <Link to="/attendance" className="menu-item" ><MdAccessTime /><span>Attendance </span> </Link>
                    </>
                
            }
            <button className="logout-btn" onClick={logout}><MdLogout />  Logout </button>
        </div>
    )
}

export default Sidebar;