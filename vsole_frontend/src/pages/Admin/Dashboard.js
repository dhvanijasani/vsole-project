import { useEffect, useState } from "react";
import "../../css/Dashboard.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { adminDashboard } from "../../services/api";

function Dashboard() {
    
    const [stats, setStats] = useState({
        employees: 0,
        visitors: 0,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const token = localStorage.getItem("token" );
            const response = await adminDashboard(token);
            console.log(response.data);
            setStats(response.data);
        }
        catch (error) {
            console.log(error);
        }
    };

    return (

        <div>
            <div className="dashboard">
                <Sidebar />
                <div className="main-content">
                    <Topbar />
                    <div>
                        <div className="cards">
                            <div className="card">
                                <h3>Employees </h3>
                                <h1>{stats.employees}</h1>
                            </div>

                            <div className="card">
                                <h3> Visitors </h3>
                                <h1>{stats.visitors} </h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;