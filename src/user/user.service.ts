import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {Role} from '../role/role.entity'
import {regDto} from './DTO/reg.dto'
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepos:Repository<User>,
                @InjectRepository(Role) private roleRepos:Repository<Role>){}

    async createUser(user:regDto):Promise<User>{
      const {roles,...rest}=user
   
      let userDB= this.userRepos.create({...rest})
      let rolesDb=[]
      for(let i=0;i<roles.length;i++){
        let roleDb=await this.roleRepos.findOne({name:roles[i]})
        rolesDb.push(roleDb)
      }
      userDB.roles= [...rolesDb]
      await  this.userRepos.save(userDB)
      return userDB
    }

    async getUsers():Promise<User[]>{
        return await this.userRepos.find({relations:['roles']})

    }

    



}
