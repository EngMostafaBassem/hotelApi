import { User } from 'src/user/user.entity'
import {Column,PrimaryGeneratedColumn,Entity, ManyToOne} from 'typeorm'
@Entity()
export class Reservation{
    @PrimaryGeneratedColumn()
    id:number
    @Column()
    reservationNum:number
    @Column()
    paymentWay:string
    @Column()
    from:Date
    @Column()
    to:Date
    @ManyToOne(()=>User,user=>user.reservations)
    user:User

}