import { useEffect, useState } from "react";
import "../../css/EmployeeList.css";
import "../../css/Dashboard.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { listattendance } from "../../services/api";

function AttendanceMonitor() {
    const [attendance, setAttendance] = useState([]);
    const [search, setSearch] = useState("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {
            const token = localStorage.getItem("token");
            const response = await listattendance(token) ;
            console.log(response.data);

            if (Array.isArray(response.data)) {
                setAttendance(response.data);
            }
            else if (Array.isArray(response.data.data)) {
                setAttendance(response.data.data);
            }
            else {
                setAttendance([]);
            }
        }
        catch (error) {
            console.log(error);
            setAttendance([]);
        }
    };

    const filteredAttendance =
        attendance.filter(
            (item) =>
                item.user?.name?.toLowerCase().includes(search.toLowerCase())
                ||
                item.status?.toLowerCase().includes(search.toLowerCase())
                ||
                item.date?.toLowerCase().includes(search.toLowerCase())
        );

    return (

        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="employee-table-card">
                    <h2> Employee Attendance </h2>
                    <input className="search-box" placeholder="Search Name / Status / Date" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredAttendance.length > 0?
                                    filteredAttendance.map((item) => (
                                        <tr key={item.id}>
                                            <td> {item.user?.name || "-"}</td>
                                            <td>{item.date || "-"}</td>
                                            <td> { item.clock_in?new Date(item.clock_in).toLocaleTimeString(): "-"}</td>
                                            <td> {item.clock_out?new Date(item.clock_out).toLocaleTimeString():"-" }</td>
                                            <td>{ item.total_hours || "-"} </td>
                                            <td> {item.status|| "-" }</td>
                                        </tr>
                                    )):
                                    <tr>
                                        <td colSpan="6" style={{ textAlign: "center" }} > No Attendance Found</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default AttendanceMonitor;