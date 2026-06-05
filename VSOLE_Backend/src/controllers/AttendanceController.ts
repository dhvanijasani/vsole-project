import { Response } from "express";
import AttendanceService from "../services/AttendanceService";

class AttendanceController {
    async clockIn(req: any, res: Response) {
        try {
            const result = await AttendanceService.clockIn(
                req.user
            );
            res.json(result);
        }
        catch (error: any) {
            res.json({
                message: error.message
            });
        }
    }
    async clockOut(req: any, res: Response) {
        try {
            const result = await AttendanceService.clockOut(
                req.user
            );
            res.json(result);
        }
        catch (error: any) {
            res.json({
                message: error.message
            });
        }
    }

    async history(req: any, res: any) {
        try {
            const result =
                await AttendanceService.history(
                    req.user
                );
            res.json(result);
        }
        catch (error: any) {
            res.json({
                message: error.message
            });
        }
    }

    async findAll(req: any, res: any) {

        try {
            const result =
                await AttendanceService.findAll(
                    req.user.tenant_id
                );
            res.json(result);
        }
        catch (error: any) {
            res.json({
                message: error.message
            });
        }
    }

    async updateTimer(req: any, res: Response) {

        try {

            const result =
                await AttendanceService.updateTimer(
                    req.body
                );

            return res.json(result);

        }
        catch (error: any) {

            return res.status(500).json({
                message: error.message
            });
        }
    }

}

export default new AttendanceController();