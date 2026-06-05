import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import "../../css/Visitor.css";
import { toast } from "react-toastify";
import { getVisitors, checkoutVisitor, createVisitor, updateVisitor, deleteVisitor, toggleVisitorStatus } from "../../services/api";
import { MdEditDocument, MdDeleteForever } from "react-icons/md";
import { FaLock, FaLockOpen } from "react-icons/fa";

function VisitorLog() {
    const [visitors, setVisitors] = useState([]);
    const [search, setSearch] = useState("");
    const [editId, setEditId] = useState(null);
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({
        visitor_name: "",
        visitor_email: "",
        contact_no: "",
        visitor_password: "",
        purpose: "",
    });

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
    };

    const loadVisitors = async () => {
        try {
            const response = await getVisitors();
            setVisitors(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        loadVisitors();
    }, []);

    const submit = async () => {
        try {
            if (isEdit) {
                await updateVisitor(editId, data);
                toast.success("Visitor Updated");
                setIsEdit(false);
                setEditId(null);
            }
            else {
                await createVisitor(data);
                toast.success("Visitor Added");
            }
            setData({
                visitor_name: "",
                visitor_email: "",
                contact_no: "",
                visitor_password: "",
                purpose: "",
            });
            loadVisitors();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    };
    const checkout = async (id) => {
        try {
            await checkoutVisitor(id);
            loadVisitors();
        } catch (error) {
            console.log(error);
        }
    };

    const removeVisitor = async (id) => {

        try {
            await deleteVisitor(id);
            toast.success("Visitor Deleted");
            loadVisitors();
        }
        catch (error) {
            toast.error(error.response?.data?.message || "Delete failed");
        }
    };

    const editVisitor = (item) => {
        setData({
            visitor_name: item.visitor_name,
            visitor_email: item.visitor_email,
            contact_no: item.contact_no,
            visitor_password: item.visitor_password,
            purpose: item.purpose
        });
        setEditId(item.id);
        setIsEdit(true);
    };

    const activeVisitor = async(id) =>{
        try{
            await toggleVisitorStatus(id);
            toast.success("Visitor status updated");
            loadVisitors();
        }
        catch(error){
            toast.error(error.response?.data?.message || "visitor status failed")
        }
    }

    const filteredVisitors = visitors.filter((item) =>
        item.visitor_name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="dashboard">
            <Sidebar />
            <div className="main-content">
                <Topbar />
                <div className="visitor-card">
                    <h2>Visitor Management</h2>
                    <input name="visitor_name" placeholder="Visitor Name" value={data.visitor_name} onChange={handleChange} />
                    <input name="visitor_email" placeholder="Visitor Email" value={data.visitor_email} onChange={handleChange} />
                    <input name="contact_no" placeholder="Contact Number" value={data.contact_no} onChange={handleChange} />
                    <input name="visitor_password" placeholder="Visitor Password" value={data.visitor_password} onChange={handleChange} />
                    <input name="purpose" placeholder="Purpose" value={data.purpose} onChange={handleChange} />
                    <button onClick={submit}>
                        {isEdit ? "Update Visitor" : "Add Visitor"}
                    </button>
                </div>

                <div className="employee-table-card">
                    <input className="search-box" placeholder="Search Visitor" onChange={(e) => setSearch(e.target.value)} />
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Purpose</th>
                                <th>Check In</th>
                                <th>Check Out</th>
                                <th></th>
                                <th>Active</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredVisitors.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.visitor_name}</td>
                                    <td>{item.contact_no}</td>
                                    <td>{item.purpose}</td>
                                    <td>{new Date(item.check_in).toLocaleTimeString()}</td>
                                    <td>{item.check_out ? new Date(item.check_out).toLocaleTimeString() : "-"}</td>
                                    <td>
                                        <button onClick={() => checkout(item.id)}>Checkout</button>
                                    </td>
                                    <td>
                                        <div className="active-button">
                                            <button className={item.is_active ? "active-btn" : "inactive-btn"}
                                                onClick={()=>activeVisitor(item.id)}>
                                                 {item.is_active ?<FaLockOpen /> : <FaLock />}
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="action-buttons">
                                            <button onClick={() => editVisitor(item)}><MdEditDocument /></button>
                                            <button className="delete-btn" onClick={() => removeVisitor(item.id)} ><MdDeleteForever /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default VisitorLog;
