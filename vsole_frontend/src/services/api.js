import axios from "axios";

const baseURL = "http://localhost:5000";

const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
};

export const Register = (formData) => 
    axios.post(`${baseURL}/tenant/create`, formData).then(res => res.data);

export const visitorLogin = (data) => {
    return axios.post(`${baseURL}/visitor/login`, data);
};

export const addEmp = (data, token) => 
    axios.post(`${baseURL}/user/create`, data, getAuthHeaders());

export const listattendance =  async () =>{
    return axios.get(`${baseURL}/attendance/all`, getAuthHeaders());   
}

export const adminDashboard = () =>{
    return axios.get(`${baseURL}/dashboard/stats`, getAuthHeaders());
}

export const fetchEmployees = () => {
    return axios.get(`${baseURL}/user/find`, getAuthHeaders());
};

export const getVisitors = () => {
    return axios.get(`${baseURL}/visitor/find`, getAuthHeaders());
};

export const createVisitor = (data) => {
    return axios.post(`${baseURL}/visitor/create`, data, getAuthHeaders());
};

export const checkoutVisitor = (id) => {
    return axios.patch(`${baseURL}/visitor/checkout/${id}`, {}, getAuthHeaders());
};

export const attendanceList = () =>{
    return axios.get(`${baseURL}/attendance/history`, getAuthHeaders());
}

export const inClock = (data) =>{
    return axios.post(`${baseURL}/attendance/clockin`, data, getAuthHeaders());
}

export const outClock = (token) => 
    axios.patch(`${baseURL}/attendance/clockout`, {},getAuthHeaders());

export const updateVisitor = (id, data) => {
    return axios.put(`${baseURL}/visitor/${id}`,data);
};

export const deleteVisitor = (id) => {
    return axios.delete(`${baseURL}/visitor/${id}`);
};

export const deleteEmployee = (id) =>{
    return axios.delete(`${baseURL}/user/${id}`);
};

export const updateUser = (id, data) => {
    return axios.put(`${baseURL}/user/${id}`,data);
};

export const toggleEmployeeStatus = (id) => {
    return axios.patch(`${baseURL}/user/active/${id}`);
};

export const toggleVisitorStatus = (id) =>{
    return axios.patch(`${baseURL}/visitor/active/${id}`);
};

export const empDashboard = async (id) => {
    return axios.get(`${baseURL}/employee-dashboard/dashboard/${id}`,getAuthHeaders());
};
