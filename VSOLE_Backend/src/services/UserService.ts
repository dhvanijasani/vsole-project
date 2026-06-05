import bcrypt from "bcrypt";
import { AppDataSource } from "../config/database";
import User from "../entity/Users";

const userRepository = AppDataSource.getRepository(User);

class UserService {
    async create(data: any, currentUser: any) {

        let hashedPassword =
            await bcrypt.hash(
                data.password,
                10
            );

        let employee =
            userRepository.create({
                name: data.name,
                email: data.email,
                password: hashedPassword,
                role: "Employee",
                tenant_id:
                    currentUser.tenant_id
            });
        return await userRepository.save(employee);
    }

    async find(currentUser: any) {
        return await userRepository.find({
            where: {
                tenant_id:currentUser.tenant_id
            },
            select: [
                "id",
                "name",
                "email",
                "role"
            ]
        });
    }

    async delete(id: number) {
        const employee = await userRepository.findOne({
            where: { id }
        });

        if (!employee) {
            throw new Error("User Not Found");
        }
        await userRepository.remove(employee);
        return {
            message: "User Deleted Successfully"
        };
    }

    async update(id: number, data: any) {
        const employee =
            await userRepository.findOne({
                where: { id }
            });

        if (!employee) {
            throw new Error("Employee not found");
        }
        employee.name = data.name;
        employee.email = data.email;
        employee.role = data.role;
        return await userRepository.save(employee);
    }

    async toggleActive(id: number) {
        const employee =
            await userRepository.findOne({
                where: { id }
            });
        if (!employee) {
            throw new Error("Employee not found");
        }

        employee.is_active = !employee.is_active;
        return await userRepository.save(employee);
    }

}

export default new UserService();