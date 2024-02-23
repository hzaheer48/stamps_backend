// users.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/typeorm/entities/User';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async getAllUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async getUserById(id: number): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where :{
                id:id
            },
        })
        if (user){
            return user;
        }
        throw new NotFoundException('Could not find user')
    }

    async createUser(userData: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(userData);
        return this.userRepository.save(newUser);
    }

    async deleteUser(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }

    // Add other methods as needed
}
