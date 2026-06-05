import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import User from "../entity/Users";

const userRepository = AppDataSource.getRepository(User);

class AuthService {

    async login(data: any) {
        console.log("Incoming Data:", data);
        const user =
            await userRepository.findOne({
                where: {
                    email: data.email
                }
            });
        console.log("Found User:", user);

        if (!user) {
            return {
                success: false,
                message: "User not found"
            };
        }

        if (!user.is_active) {
            throw new Error(
                "Your account is inactive"
            );
        }
        

        const checkPassword =
            await bcrypt.compare(
                data.password,
                user.password
            );

        if (!checkPassword) {
            return {
                success: false,
                message: "Invalid Password"
            };
        }

        const token = jwt.sign(
            {
                id: user.id,
                tenant_id: user.tenant_id,
                role: user.role
            },
            process.env.JWT_SECRET || "secretkey",
            {
                expiresIn: "1d"
            }
        );

        return {
            success: true,
            token,
            user
        };
    }
}

export default new AuthService();