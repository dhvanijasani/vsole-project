import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../css/EmployeeList.css";
import "../../css/Attendance.css"
import { MdOutlineLockClock } from "react-icons/md";
import { HiMiniClock } from "react-icons/hi2";
import { toast } from "react-toastify";
import { attendanceList, inClock , outClock} from "../../services/api";

function Attendance() {

    const [data, setData] = useState([]);

    const token = localStorage.getItem("token");
    const loadData = async () => {
        try {
            const response = await attendanceList(token);
               
            if (Array.isArray(response.data)) {
                setData(response.data);
            }
            else {
                setData([]);
            }
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const clockIn = async () => {
        try {
            await inClock(data, token);
            loadData();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Clock In Error");
        }
    };

    const clockOut = async () => {
        try {
            await outClock(token);
            toast.success("Clocked Out Successfully");
            loadData();
        } catch (error) {
            toast.error(error.response?.data?.message || "Clock Out Error");
        }
    };

    return (

        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="employee-table-card">
                    <h2> Attendance System</h2><br />
                    <div className="clock-icons">

                        <HiMiniClock
                            className="clock-btn"
                            onClick={clockIn}
                        />
                        <MdOutlineLockClock
                            className="clock-btn"
                            onClick={clockOut}
                        />
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Clock In</th>
                                <th>Clock Out</th>
                                <th>Hours</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.length > 0 ?
                                    data.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.date} </td>
                                            <td>{
                                                item.clock_in
                                                    ?
                                                    new Date(
                                                        item.clock_in
                                                    )
                                                        .toLocaleTimeString()
                                                    :
                                                    "-"
                                            }
                                            </td>
                                            <td>
                                                {
                                                    item.clock_out
                                                        ?
                                                        new Date(
                                                            item.clock_out
                                                        )
                                                            .toLocaleTimeString()
                                                        :
                                                        "-"
                                                }
                                            </td>
                                            <td>{item.total_hours || "-"}</td>
                                            <td>{item.status} </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td colSpan="5"> No Attendance Found</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Attendance;