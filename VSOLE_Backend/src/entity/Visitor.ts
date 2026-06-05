import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
class Visitor {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    visitor_name!: string;

    @Column({
        nullable: true
    })
    visitor_email!: string;

    @Column({
        nullable: true
    })
    visitor_password!: string;

    @Column()
    contact_no!: string;

    @Column()
    purpose!: string;

    @Column()
    tenant_id!: string;

    @Column()
    check_in!: Date;

    @Column({
        nullable: true
    })
    check_out!: Date;

     @Column({
        default: true
    })
    is_active!: boolean;
}

export default Visitor;