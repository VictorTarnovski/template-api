import { Entity, PrimaryGeneratedColumn, Column, PrimaryColumn } from "typeorm"

@Entity("Users")
export class UserModel {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column()
    username: string

    @PrimaryColumn()
    @Column()
    email: string

    @Column()
    password: string

    @Column({nullable: true})
    token?: string
}