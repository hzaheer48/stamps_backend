import { Module } from '@nestjs/common';
import { AddressesController } from './controllers/addresses/addresses.controller';
import { AddressesService } from './services/addresses/addresses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { NestjsFormDataModule } from 'nestjs-form-data';

@Module({
  imports: [TypeOrmModule.forFeature([Address]), NestjsFormDataModule],
  controllers: [AddressesController],
  providers: [AddressesService]
})
export class AddressesModule {}
