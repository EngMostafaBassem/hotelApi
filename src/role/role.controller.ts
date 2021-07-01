import { Body, Controller,Get, Post } from '@nestjs/common';
import {RoleService} from './role.service'
import {Role} from './role.entity'
import {roleDto} from './Dto/role.dto'
@Controller('role')
export class RoleController {
    constructor(private readonly roleService:RoleService){}
    @Post()
    async createRole(@Body() role:roleDto ):Promise<Role>{
        return this.roleService.createRole(role)
    }
    @Get()
    async GetRoles():Promise<Role[]>{
        return this.roleService.GetRoles()
    }
}
