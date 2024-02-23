import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './typeorm/entities/User';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Product } from './typeorm/entities/Product';
import { ShoppingCart } from './typeorm/entities/ShoppingCart';
import { CartItem } from './typeorm/entities/CartItem';

@Module({
  imports: [TypeOrmModule.forRoot({
    type:'mysql',
    host:'primary.stamps--7bwdbvpvpfsm.addon.code.run',
    port:3306,
    username:'ef36d5b002cc240e',
    password:'282ff37c4335f51cf1b7d96aca1059',
    database:'stamps',
    entities:[User,Product,ShoppingCart,CartItem],
    synchronize:true,
  }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
