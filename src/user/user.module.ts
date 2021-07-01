import { Module } from '@nestjs/common';
import {UserService} from './user.service'
import {UserController} from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from './user.entity'
import {Role} from '../role/role.entity'
import { JwtModule } from '@nestjs/jwt';
@Module({
    imports: [TypeOrmModule.forFeature([User,Role]), JwtModule.register({
        secret: 'secrect',
        signOptions: { expiresIn: '160s' },
      }),],
    providers:[UserService],
    controllers:[UserController]
})
export class UserModule {}
