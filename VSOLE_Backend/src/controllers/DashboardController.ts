import { Response }from "express";
import DashboardService from "../services/DashboardService";

class DashboardController {

    async stats(req: any,res: Response) {
        try {
            const result =
                await DashboardService.stats(
                    req.user
                );
            res.json(result);
        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new DashboardController();