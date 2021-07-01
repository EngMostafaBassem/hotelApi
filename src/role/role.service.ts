import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm'
import {Role} from './role.entity'
import {roleDto} from './Dto/role.dto'
@Injectable()
export class RoleService {
    constructor(@InjectRepository(Role) private roleRepos:Repository<Role>){}

    async createRole(role:roleDto):Promise<Role>{
     
      return await this.roleRepos.save({...role})
    }
    async GetRoles():Promise<Role[]>{
     
     return await this.roleRepos.find()
    
    }

  


}
