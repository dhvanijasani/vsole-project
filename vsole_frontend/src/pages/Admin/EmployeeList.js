import { useEffect, useState } from "react";
import "../../css/EmployeeList.css";
import "../../css/Dashboard.css";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { deleteEmployee, fetchEmployees, toggleEmployeeStatus, updateUser } from "../../services/api";
import { toast } from "react-toastify";
import { MdEditDocument, MdDeleteForever } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa";

function EmployeeList() {

    const [employees, setEmployees] = useState([]);
    const [editId, setEditId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        email: "",
        role: ""
    });
    const [search, setSearch] = useState("");
    useEffect(() => {
        loadEmployees();
    }, []);


    const handleEditChange = (e) => {
        setEditData({
            ...editData,
            [e.target.name]: e.target.value
        });
    };

    const loadEmployees = async () => {
        try {
            const token = localStorage.getItem("user_token");
            const response = await fetchEmployees(token);
            setEmployees(response.data);
        } catch (error) {
            console.error("Error loading employees:", error);
            toast.error(error.response?.data?.message || "Failed to load employees");
        }
    };

    const removeEmployee = async (id) => {
        try {
            await deleteEmployee(id);
            toast.success("Deleteed employee");
            loadEmployees();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "deleted Falied")
        }
    }

    const activeEmployee = async (id) => {
        try {
            await toggleEmployeeStatus(id);
            toast.success("Employee status updated");
            loadEmployees();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Status update failed");
        }
    };

    const editEmployee = (item) => {
        setEditId(item.id);
        setEditData({
            name: item.name,
            email: item.email,
            role: item.role
        });
        setShowModal(true);
    };

    const updateEmployeeData = async () => {
        try {
            await updateUser(editId, editData);
            toast.success("Employee Updated");
            setShowModal(false);
            loadEmployees();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Update Failed");
        }
    };

    const filteredEmployees = employees.filter((item) =>
        (item.name?.toLowerCase().includes(search.toLowerCase())) ||
        (item.email?.toLowerCase().includes(search.toLowerCase())) ||
        (item.role?.toLowerCase().includes(search.toLowerCase()))
    );

    return (

        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="employee-table-card">
                    <h2> Employee List</h2>
                    <input className="search-box" placeholder="Search Name / Email / Role" value={search} onChange={(e) => { setSearch(e.target.value) }} />
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                filteredEmployees.length > 0 ?
                                    filteredEmployees.map((item) => (
                                        <tr key={item.id}>
                                            <td>{item.id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.role} </td>
                                            <td>
                                                <div className="active-button">
                                                    <button className={item.is_active?"active-btn":"inactive-btn"}
                                                        onClick={()=>activeEmployee(item.id)}>
                                                        {item.is_active ? <FaLockOpen /> : <FaLock/>}
                                                    </button>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="edit-btn"
                                                        onClick={() => editEmployee(item)}>
                                                        <MdEditDocument />
                                                    </button>
                                                    <button className="delete-btn" onClick={() => removeEmployee(item.id)} ><MdDeleteForever /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td colSpan="4" style={{ textAlign: "center" }} > No Employee Found</td>
                                    </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            {
                showModal && (
                    <div className="modal-overlay">
                        <div className="edit-modal">
                            <h2>Edit Employee</h2>
                            <input type="text" name="name" placeholder="Name" value={editData.name} onChange={handleEditChange} />
                            <input type="email" name="email" placeholder="Email" value={editData.email} onChange={handleEditChange} />
                            <select name="role" value={editData.role} onChange={handleEditChange}>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                            </select>
                            <div className="modal-buttons">
                                <button className="save-btn" onClick={updateEmployeeData}>Update</button>
                                <button className="cancel-btn" onClick={() => setShowModal(false)} > Cancel</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default EmployeeList;