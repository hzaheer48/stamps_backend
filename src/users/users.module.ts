import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports : [TypeOrmModule.forFeature([User]),NestjsFormDataModule],
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
