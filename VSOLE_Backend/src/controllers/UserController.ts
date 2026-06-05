import { Request, Response } from "express";
import UserService from "../services/UserService";

class UserController {

    async create(req: any, res: Response) {

        try {
            const result = await UserService.create(req.body, req.user);
            res.json({
                message: "Employee Added",
                data: result
            });
        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async find(req: any, res: Response) {
        try {
            const result =
                await UserService.find(
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

    async delete(req: Request, res: Response) {
        try {
            const result =
                await UserService.delete(
                    Number(req.params.id)
                )
            return res.status(200).json(result);
        }
        catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result =
                await UserService.update(
                    Number(req.params.id),
                    req.body
                );
            return res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async toggleActive(req: Request, res: Response) {
        try {
            const result =
                await UserService.toggleActive(
                    Number(req.params.id)
                );

            return res.status(200).json({
                success: true,
                data: result
            });
        }
        catch (error: any) {
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    

}

export default new UserController();