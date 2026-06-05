import { AppDataSource } from "../config/database";
import User from "../entity/Users";
import Visitor from "../entity/Visitor";

const userRepository = AppDataSource.getRepository(User);
const visitorRepository =  AppDataSource.getRepository(Visitor);

class DashboardService {

    async stats(currentUser: any) {
        const employeeCount =
            await userRepository.count({
                where: {
                    tenant_id: currentUser.tenant_id
                }
            });

        const visitorCount =
            await visitorRepository.count({

                where: {
                    tenant_id: currentUser.tenant_id
                }

            });

        return {
            employees: employeeCount,
            visitors: visitorCount,
        };
    }
}

export default new DashboardService();