import {

    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn

} from "typeorm";

import User from "./Users";

@Entity()

class Attendance {

    @PrimaryGeneratedColumn()

    id!: number;

    @Column()

    user_id!: number;

    @Column()

    tenant_id!: string;

    @Column()

    date!: string;

    @Column()

    clock_in!: Date;

    @Column({

        nullable: true

    })

    clock_out!: Date;

    @Column()

    status!: string;

    @Column({

        nullable: true

    })

    total_hours!: string;


    @ManyToOne(
        () => User
    )

    @JoinColumn({

        name: "user_id"

    })

    user!: User;

    @Column({
    default: 0
})
work_seconds!: number;

@Column({
    default: 0
})
break_seconds!: number;

@Column({
    default: false
})
is_working!: boolean;

@Column({
    default: false
})
is_break!: boolean;

}

export default Attendance;