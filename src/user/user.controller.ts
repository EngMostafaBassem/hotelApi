import { Body, Controller, Get, Post,Res, UseGuards } from '@nestjs/common';
import { loginDto } from './DTO/login.dto';
import { regDto } from './DTO/reg.dto';
import {UserService} from './user.service'
import {Response} from 'express'
import { AuthGuard } from 'src/guards/auth.guard';
@Controller('user')
export class UserController {

  constructor(private readonly userService:UserService){}
  @Get()
  GetAllUsers(){
      return this.userService.getUsers()
  }
  @Post()
  CreateUser(@Body() user:regDto){
      return this.userService.createUser(user)
  }
  @Post('login')
  async loginUser(@Body() user:loginDto,@Res({passthrough:true}) res:Response):Promise<any>{
      let token= await this.userService.login(user)
    
      res.cookie('token',token)

  }

  @Get('test')
  test(){
      return "this is test"
  }
}
