import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    fullname: string
    
    @Column()
    username: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({default: 0})
    tokenVersion: number

}
