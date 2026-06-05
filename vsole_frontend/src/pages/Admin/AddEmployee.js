import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/Dashboard.css";
import "../../css/AddEmployee.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { toast } from "react-toastify";
import { addEmp } from "../../services/api";

function AddEmployee() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = async () => {
        try {
            const token = localStorage.getItem("token");
            await addEmp(data, token);
            toast.success("Employee Added");
            navigate("/dashboard");
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };

    return (

        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="card" style={{ width: "600px", marginTop: "30px" }}>
                    <h2> Add Employee </h2><br />
                    <input className="form-input" name="name" placeholder="Employee Name" onChange={handleChange} />
                    <input className="form-input" name="email" placeholder="Employee Email" onChange={handleChange} />
                    <input className="form-input" type="password" name="password" placeholder="Password" onChange={handleChange} />
                    <button className="employee-btn" onClick={submit} >Add Employee</button>
                </div>
            </div>
        </div>
    )
}

export default AddEmployee;