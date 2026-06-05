import { useState } from "react";
import "../../css/CompanyRegister.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Register } from "../../services/api";

function CompanyRegister() {


    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        company_name: "",
        email: "",
        phone: "",
        admin_name: "",
        admin_email: "",
        admin_password: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await Register(formData);
            toast.success(`Company Registered Successfully\nTenant ID : ${result.tenant_id}`);
            navigate("/");
        } catch (error) {
            console.error("Registration failed:", error);
            const errorMsg = error.response?.data?.message || "Something went wrong";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="company-container">
            <div className="left-company">
                <div className="overlay">
                    <h1>SMART<br />SOLUTIONS</h1>
                    <p>
                        Build and manage your company
                        with VSOLE's enterprise system.
                    </p>
                </div>
            </div>
            <div className="right-company">
                <div className="company-card">
                    <h1 className="logo">
                        VSOLE
                    </h1>
                    <h2>Register Company</h2>
                    <p> Create your company and admin account</p>
                    <form onSubmit={handleSubmit}>
                        <input
                            name="company_name"
                            placeholder="Company Name"
                            onChange={handleChange}
                        />
                        <input
                            name="email"
                            placeholder="Company Email"
                            onChange={handleChange}
                        />
                        <input
                            name="phone"
                            placeholder="Phone Number"
                            onChange={handleChange}
                        />
                        <input
                            name="admin_name"
                            placeholder="Admin Name"
                            onChange={handleChange}
                        />
                        <input
                            name="admin_email"
                            placeholder="Admin Email"
                            onChange={handleChange}
                        />
                        <input
                            type="password"
                            name="admin_password"
                            placeholder="Admin Password"
                            onChange={handleChange}
                        />
                        <button type="submit">
                            REGISTER COMPANY
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CompanyRegister;