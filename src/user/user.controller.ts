import { Body, Controller, Get, Post } from '@nestjs/common';
import { regDto } from './DTO/reg.dto';
import {UserService} from './user.service'
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
}
