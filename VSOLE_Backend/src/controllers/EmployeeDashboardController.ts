import { Response } from "express";

import EmployeeDashboardService
from "../services/EmployeeDashboardService";

class EmployeeDashboardController {

    async dashboard(req: any, res: Response) {
    try {

        console.log("Params ID:", req.params.id);
        

        const result =
            await EmployeeDashboardService.dashboard(
                Number(req.params.id)
            );
            console.log(result);

        return res.status(200).json(result);

    } catch (error: any) {

        return res.status(400).json({
            message: error.message
        });
    }
}
}

export default new EmployeeDashboardController();