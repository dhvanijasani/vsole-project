import {
Entity,
PrimaryGeneratedColumn,
Column
} from "typeorm";

@Entity()
class Tenant{

    @PrimaryGeneratedColumn()
    id!:number;

    @Column()
    company_name!:string;

    @Column()
    email!:string;

    @Column()
    phone!:string;

    @Column({
        unique:true
    })
    tenant_id!:string;
}

export default Tenant;