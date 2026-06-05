import {
    Entity,
    PrimaryGeneratedColumn,
    Column
} from "typeorm";

@Entity()
class Users {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column({
        unique: true
    })
    email!: string;

    @Column()
    password!: string;

    @Column()
    role!: string;

    @Column()
    tenant_id!: string;

    @Column({
        default: true
    })
    is_active!: boolean;

}

export default Users;