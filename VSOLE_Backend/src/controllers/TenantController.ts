import { Request, Response } from "express";
import TenantService from "../services/TenantService";

class TenantController {

    async create(req: Request, res: Response) {
        try {
            let result =
                await TenantService.create(
                    req.body
                );
            res.status(201).json({
                success: true,
                message: "Created successfully",
                tenant_id: result.tenant_id
            });

        }
        catch (error: any) {
            res.status(500).json({
                success: false,
                message: error.message
            });

        }

    }

}

export default new TenantController();