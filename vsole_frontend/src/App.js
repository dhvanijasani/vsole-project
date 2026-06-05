import { BrowserRouter, Routes, Route } from "react-router-dom";
import CompanyRegister from "./pages/Auth/CompanyRegister";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Admin/Dashboard";
import AddEmployee from "./pages/Admin/AddEmployee";
import EmployeeList from "./pages/Admin/EmployeeList";
import AttendanceMonitor from "./pages/Admin/AttendanceMonitor";
import VisitorLog from "./pages/Admin/VisitorLog";
import EmployeeDashboard from "./pages/Employee/EmployeeDashboard";
import Attendance from "./pages/Employee/Attendance";
import ProtectedRoute from "./components/ProtectedRoute";
import VisitorDashboard from "./pages/Visitor/VisitorDashboard";

function App() {

  return (

    <BrowserRouter>
      <Routes>      
        <Route path="/" element={<Login />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/company-register" element={<CompanyRegister />}/>
        
       
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}/>
        <Route path="/add-employee" element={<ProtectedRoute><AddEmployee /> </ProtectedRoute> }/>
        <Route path="/employee-list" element={<ProtectedRoute> <EmployeeList /> </ProtectedRoute>}/>
        <Route path="/attendance-monitor" element={<ProtectedRoute> <AttendanceMonitor /> </ProtectedRoute>} />
        <Route path="/visitor-log" element={<ProtectedRoute> <VisitorLog /> </ProtectedRoute> } />
        <Route path="/employee-dashboard"element={  <ProtectedRoute> <EmployeeDashboard /> </ProtectedRoute>}/>
        <Route path="/attendance" element={ <ProtectedRoute> <Attendance /></ProtectedRoute> }/>
        <Route path="/visitor-dashboard" element={<VisitorDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;