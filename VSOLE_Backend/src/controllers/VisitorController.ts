import { Request, response, Response } from "express";
import VisitorService from "../services/VisitorService";

class VisitorController {
    async create(req: any, res: Response) {

        try {
            const result =
                await VisitorService.create(req.body, req.user);

            res.status(201).json({
                message: "Visitor Added",
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
                await VisitorService.find(req.user);
            res.json(result);
        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async checkout(req: any, res: Response) {
        try {
            const result =
                await VisitorService.checkout(
                    Number(req.params.id)
                );

            res.json({
                message: "Checkout Success",
                data: result
            });
        }
        catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    async visitorLogin(req: Request, res: Response) {
        try {

            const result = await VisitorService.visitorLogin(req.body);

            return res.status(200).json({
                success: true,
                visitor: result
            });

        } catch (error: any) {

            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const result =
                await VisitorService.update(
                    Number(req.params.id),
                    req.body
                );
            return res.status(200).json(result);
        }
        catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const result =
                await VisitorService.delete(
                    Number(req.params.id)
                );
            return res.status(200).json(result);
        }
        catch (error: any) {
            return res.status(400).json({
                message: error.message
            });
        }
    }

    async toggleActive(req: Request, res: Response){
        try{
            const result = await VisitorService.toggleActive(
                Number(req.params.id)
            );
            return res.status(200).json(result);
        }
        catch(error: any){
            return res.status(400).json({
                message: error.message
            })
        }
    }
}

export default new VisitorController();