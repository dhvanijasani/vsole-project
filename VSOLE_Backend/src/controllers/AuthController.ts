import { Request, Response }from "express";

import AuthService from "../services/AuthService";

class AuthController {

    async login(req: Request, res: Response ) {

        try {
            const result =
                await AuthService.login(
                    req.body
                );

            res.status(200).json(
                result
            );

        }
        catch (error: any) {

            res.status(500).json({

                message:
                    error.message

            });

        }

    }

}

export default new AuthController();