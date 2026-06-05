import bcrypt from "bcrypt";
import { AppDataSource }from "../config/database";
import Tenant from "../entity/Tenant";
import User from "../entity/Users";

const tenantRepository = AppDataSource.getRepository( Tenant );
const userRepository = AppDataSource.getRepository( User);
 
class TenantService {

    
    async create(data: any) {
        let tenantCode =
            "T" +
            Math.floor(
                1000 +
                Math.random() * 9000
            );

        let tenant =
            tenantRepository.create({
                company_name: data.company_name,
                email: data.email,
                phone:data.phone,
                tenant_id: tenantCode
            });

        let savedTenant =
            await tenantRepository.save(
                tenant
            );

        let hashedPassword =
            await bcrypt.hash(
                data.admin_password, 10
            );

        let admin =
            userRepository.create({
                name:data.admin_name,
                email:data.admin_email,
                password:hashedPassword,
                role:"Admin",
                tenant_id: tenantCode
            });
        await userRepository.save(admin);
        return {
            message:"Company & Admin Created",
            tenant_id: tenantCode
        };
    }
}
export default new TenantService();