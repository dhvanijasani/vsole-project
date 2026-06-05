import { AppDataSource } from "../config/database";
import Attendance from "../entity/Attendance";
import Users from "../entity/Users";

const attendanceRepository = AppDataSource.getRepository(Attendance);
const userRepository = AppDataSource.getRepository(Users);

class EmployeeDashboardService {

   async dashboard(id: number) {
    const employee = await userRepository.findOne({
        where: { id }
    });

    const today = new Date().toISOString().split("T")[0];

    const attendance =
        await attendanceRepository.findOne({
            where: {
                user_id: id,
                date: today
            }
        });

    const attendanceCount =
        await attendanceRepository.count({
            where: {
                user_id: id
            }
        });

        console.log("User ID:", id);
        console.log("Today:", today);
        console.log("Attendance:", attendance);

    return {
        attendance: attendanceCount,
        status:
            attendance?.clock_out
                ? "Clock Out"
                : attendance?.clock_in
                ? "Clock In"
                : "Absent",

        clock_in: attendance?.clock_in || null,
        clock_out: attendance?.clock_out || null,
        progress: attendance?.clock_out? 100 : attendance?.clock_in? 50 : 0  
    };
}
}

export default new EmployeeDashboardService();