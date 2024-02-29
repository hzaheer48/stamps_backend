import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FormDataRequest } from 'nestjs-form-data';
import { AddressesService } from 'src/addresses/services/addresses/addresses.service';
import { Address } from 'src/typeorm/entities/Address';

@Controller('addresses')
export class AddressesController {

    constructor(private readonly addressService: AddressesService) {}


    @Get()
    @UseGuards(AuthGuard("jwt"))
    async getAllAddresses(
      @Req() req
    ): Promise<Address[]> {
      return this.addressService.getAllAddresses(req.user);
    }

    @Post()
    @FormDataRequest()
    @UseGuards(AuthGuard("jwt"))
    async createProduct(
      @Req() req,
      @Body() addressData: Partial<Address>
    ): Promise<Address> {
      return this.addressService.createAddress(addressData, req.user);
    }
  
}
