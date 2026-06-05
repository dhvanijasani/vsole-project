import { AppDataSource } from "../config/database";
import Attendance from "../entity/Attendance";
const attendanceRepository = AppDataSource.getRepository(Attendance);

class AttendanceService {
    async clockIn(user: any) {
        const today =
            new Date()
                .toISOString()
                .split("T")[0];
        const attendance =
            await attendanceRepository.findOne({
                where: {
                    user_id: user.id,
                    date: today
                }
            });
        if (attendance && !attendance.clock_out) {
            throw new Error(
                "You are already Clocked In"
            );
        }

        if (attendance && attendance.clock_out) {
            throw new Error(
                "Today's attendance already completed"
            );
        }

        const newAttendance =
            attendanceRepository.create({
                user_id: user.id,
                tenant_id: user.tenant_id,
                date: today,
                clock_in: new Date(),
                status: "Present"
            });

        return await attendanceRepository.save(
            newAttendance
        );

    }

    async clockOut(user: any) {

        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        const attendance =

            await attendanceRepository.findOne({
                where: {
                    user_id: user.id,
                    date: today
                }
            });

        if (!attendance) {
            throw new Error(
                "No Clock In Found"
            );
        }

        if (attendance.clock_out) {
            throw new Error(
                "Already Clocked Out"
            );
        }

        attendance.clock_out =
            new Date();
        const totalHours =
            (
                attendance.clock_out.getTime() - attendance.clock_in.getTime()
            )
            / 1000 / 60 / 60;

        attendance.total_hours =

            totalHours.toFixed(2);

        return await attendanceRepository.save(
            attendance);

    }

    async history(user: any) {

        return await attendanceRepository.find({

            where: {
                user_id: user.id

            },

            order: {

                id: "DESC"

            }

        });

    }


    async findAll(tenant_id: string) {

        return await attendanceRepository
            .createQueryBuilder("attendance")
            .leftJoinAndSelect("attendance.user", "user")
            .where(
                "attendance.tenant_id=:tenant_id",
                {
                    tenant_id
                }
            )
            .orderBy(
                "attendance.id",
                "DESC"
            )

            .getMany();

    }

    async updateTimer(data: any) {

    const attendance =
        await attendanceRepository.findOne({
            where: {
                user_id: data.user_id
            }
        });

    if (!attendance) {

        throw new Error(
            "Attendance not found"
        );
    }

    attendance.work_seconds =
        data.work_seconds;

    attendance.break_seconds =
        data.break_seconds;

    attendance.is_working =
        data.is_working;

    attendance.is_break =
        data.is_break;

    return await attendanceRepository.save(
        attendance
    );
}

}

export default new AttendanceService();