// user.controller.ts

import { Controller, Get, Param, Post, Body, Delete, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { User } from 'src/typeorm/entities/User';
import { UsersService } from 'src/users/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get()
    async getAllUsers(): Promise<User[]> {
        return this.usersService.getAllUsers();
    }

    @Get(':id')
    async getUserById(@Param('id') id: number): Promise<User | undefined> {
        return this.usersService.getUserById(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createUser(@Req() req,@Body() userData: Partial<User>): Promise<User> {

        const user = req.user;

        console.log(user);

        return this.usersService.createUser(userData);
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: number): Promise<void> {
        return this.usersService.deleteUser(id);
    }
}
