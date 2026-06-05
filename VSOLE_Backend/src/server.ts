import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { AppDataSource } from "./config/database";

import tenantRoutes from "./routes/tenantRoutes";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes"; 
import attendanceRoutes from "./routes/attendanceRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import employeeDashboardRoutes from "./routes/employeeDashboardRoutes";
import visitorRoutes from "./routes/visitorRoutes";
dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/tenant", tenantRoutes);
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/attendance",attendanceRoutes);
app.use("/dashboard",dashboardRoutes);
app.use("/employee-dashboard",employeeDashboardRoutes);
app.use("/visitor",visitorRoutes);

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {
        console.log("Database Connected");
        app.listen(PORT, () => {
            console.log(`Server running on ${PORT}` );
        });
    })
    .catch((error) => {
        console.log(error);
    });