import { Injectable,HttpException,HttpStatus} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import {Role} from '../role/role.entity'
import {regDto} from './DTO/reg.dto'
import { loginDto } from './DTO/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepos:Repository<User>,
                @InjectRepository(Role) private roleRepos:Repository<Role>,private readonly jwt:JwtService){}

    async createUser(user:regDto):Promise<User>{
      const {roles,...rest}=user
      let userExist=await this.userRepos.findOne({email:rest.email})
      if(userExist){
        throw new HttpException({
            status:HttpStatus.CONFLICT,
            error:'Email is not valid'
        },HttpStatus.CONFLICT)
      } 
      let hasedPassword=await bcrypt.hash(rest.password,4)
      let userDB= this.userRepos.create({...rest,password:hasedPassword})
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

    async login(user:loginDto):Promise<string>{
        let userDb=await this.userRepos.findOne({email:user.email})
        if(userDb){
          
           let checkPassword=await bcrypt.compare(user.password,userDb.password)
           if(checkPassword){
             
               try{
                let token=await this.jwt.signAsync({id:userDb.id})
              
                return token
               }
               catch(ex){
                throw new HttpException({
                    status:HttpStatus.UNAUTHORIZED,
                    error:ex.message
                },HttpStatus.UNAUTHORIZED)
               }
           
           }
           else{
            throw new HttpException({
                status:HttpStatus.UNAUTHORIZED,
                error:'UNAUTHORIZED'
            },HttpStatus.UNAUTHORIZED)
           }
        }
        else{
            throw new HttpException({
                status:HttpStatus.UNAUTHORIZED,
                error:'UNAUTHORIZED'
            },HttpStatus.UNAUTHORIZED)
        }
    }

    async  validToken(token:string):Promise<boolean>{
        let result=await this.jwt.verifyAsync(token)
        return result
    }



}
