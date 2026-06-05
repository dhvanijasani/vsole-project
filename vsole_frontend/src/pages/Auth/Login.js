import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../../css/Login.css";
import { toast } from "react-toastify";
import { visitorLogin } from "../../services/api";

function Login() {

    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
        role: ""
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        try {
            if (data.role === "visitor") {
                const response = await visitorLogin({
                    visitor_email: data.email,
                    visitor_password: data.password
                });
                localStorage.setItem(
                    "visitor",
                    JSON.stringify(response.data.visitor)
                );
                toast.success("Visitor Login Success");
                navigate("/visitor-dashboard");
                return;
            }

            const response = await axios.post(
                "http://localhost:5000/auth/login",
                data
            );
            if (!response.data.success) {
                toast.error(response.data.message);
                return;
            }
            localStorage.setItem(
                "token",
                response.data.token
            );
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            );
            toast.success("Login Success");
           
                if (response.data.user.role === "Admin") {
                    navigate("/dashboard");
                }
                else {
                    navigate("/employee-dashboard");
                }
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Invalid Login");
        }
    };

    return (

        <div className="login-container">
            <div className="left-panel">
                <div className="overlay">
                    <h1>ADVANCED<br /> TECHNOLOGY</h1>
                    <p>
                        Advanced Employee
                        Management System
                    </p>
                </div>
            </div>
            <div className="right-panel">
                <div className="login-box">
                    <h1 className="logo"> VSOLE </h1>
                    <h2> Welcome Back </h2>
                    <p>Please login to your account</p>
                    <form onSubmit={submit}>
                        <input type="email" name="email" placeholder="Email Address" onChange={handleChange} />
                        <input type="password" name="password" placeholder="Password" onChange={handleChange} />
                        <select
                            name="role"
                            value={data.role}
                            onChange={handleChange}
                        >
                            <option value="admin">Admin</option>
                            <option value="visitor">Visitor</option>
                            <option value="user">User</option>
                        </select>
                        <button> CONFIRM & LOG IN </button>
                    </form>

                    <div className="register-link" >
                        <p>Company not registered?
                            <Link to="/company-register"> Register </Link>
                        </p>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default Login;