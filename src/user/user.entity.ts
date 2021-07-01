import { Reservation } from 'src/reservation/reservation.entity'
import { Role } from 'src/role/role.entity'
import {Column, Entity,ManyToMany,PrimaryGeneratedColumn,JoinTable, OneToMany} from 'typeorm'

@Entity()
export class User{
  @PrimaryGeneratedColumn()
  id:number
  @Column()
  name:string
  @Column()
  phone:string
  @Column()
  address:string
  @Column()
  email:string
  @Column()
  password:string
  @ManyToMany(()=>Role,role=>role.users)
  @JoinTable()
  roles:Role[]

  @OneToMany(()=>Reservation,reservation=>reservation.user)
  reservations:Reservation[]

}