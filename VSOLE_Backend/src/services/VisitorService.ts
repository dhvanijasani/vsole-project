import { error } from "node:console";
import { AppDataSource } from "../config/database";
import Visitor from "../entity/Visitor";

const visitorRepository = AppDataSource.getRepository(Visitor);

class VisitorService {

    async create(data: any, user: any) {

        const visitor = visitorRepository.create({
            visitor_name: data.visitor_name,
            visitor_email: data.visitor_email,
            visitor_password: data.visitor_password,
            contact_no: data.contact_no,
            purpose: data.purpose,
            tenant_id: user.tenant_id,
            check_in: new Date()
        });

        return await visitorRepository.save(visitor);
    }

    async visitorLogin(data: any) {

        const visitor = await visitorRepository.findOne({
            where: {
                visitor_email: data.visitor_email
            }
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }
        if (visitor.visitor_password !== data.visitor_password) {
            throw new Error("Invalid password");
        }
        return visitor;
    }

    async find(user: any) {

        return await visitorRepository.find({
            where: {
                tenant_id: user.tenant_id
            },
            order: { id: "DESC" }
        });
    }

    async checkout(id: number) {
        const visitor =
            await visitorRepository.findOne({
                where: { id }
            });
        if (!visitor) {
            throw new Error(
                "Visitor not found"
            );
        }

        visitor.check_out = new Date();
        return await visitorRepository.save(
            visitor
        );
    }

    async update(id: number, data: any) {

        const visitor = await visitorRepository.findOne({
            where: { id }
        });

        if (!visitor) {
            throw new Error("Visitor not found");
        }

        visitor.visitor_name = data.visitor_name;
        visitor.visitor_email = data.visitor_email;
        visitor.contact_no = data.contact_no;
        visitor.visitor_password = data.visitor_password;
        visitor.purpose = data.purpose;
        return await visitorRepository.save(visitor);
    }


    async delete(id: number) {
        const visitor = await visitorRepository.findOne({
                where: { id }
            });

        if (!visitor) {
            throw new Error("Visitor not found");
        }
        await visitorRepository.remove(visitor);
        return {
            message: "Visitor deleted successfully"
        };
    }

    async toggleActive(id: number) {
        const visitor =
            await visitorRepository.findOne({
                where: { id }
            });
        if (!visitor) {
            throw new Error("Employee not found");
        }
        visitor.is_active = !visitor.is_active;
        return await visitorRepository.save(visitor);
    }

}
export default new VisitorService();