import { User } from 'src/user/user.entity'
import {Entity,Column,PrimaryGeneratedColumn, ManyToMany} from 'typeorm'

@Entity()
export class Role{
    @PrimaryGeneratedColumn()
    roleId:number
    @Column()
    name:string
    @Column()
    description:string
    @ManyToMany(()=>User,user=>user.roles)
    users:User[]
}