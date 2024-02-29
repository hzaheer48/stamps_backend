// addresses.service.ts

import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from 'src/typeorm/entities/Address';
import { Repository } from 'typeorm';

@Injectable()
export class AddressesService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
  ) {}

  async getAllAddresses(
    user : any
  ): Promise<Address[]> {
    return this.addressRepository.find(
        {where : { user : { id : user.id } }}
    );
  }

  async createAddress(
    addressData: Partial<Address>,
    user: any,
  ): Promise<Address> {
    if (user.role.name !== 'customer') {
      throw new ForbiddenException(
        'You do not have permission to perform this action.',
      );
    }

    const { addressType, country, city, state, postalCode, address, phone, fax, aptOrSuite, company } = addressData;

    const addressEntity = this.addressRepository.create({
      user : user,
      addressType,
      country,
      city,
      state,
      postalCode,
      address,
      phone,
      fax,
      aptOrSuite,
      company,
    });

    return await this.addressRepository.save(addressEntity);
  }
}
