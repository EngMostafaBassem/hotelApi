import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RoleModule } from './role/role.module';
import { User } from './user/user.entity';
import { Role } from './role/role.entity';
import { RoomModule } from './room/room.module';
import { ReservationModule } from './reservation/reservation.module';
import { Reservation } from './reservation/reservation.entity';
@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'hotel',
    entities: [User,Role,Reservation],
    synchronize: true,
    autoLoadEntities:true
  }), UserModule, RoleModule, RoomModule, ReservationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
