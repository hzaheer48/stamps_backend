// user.controller.ts

import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    UseGuards,
    Req,
    ForbiddenException,
  } from "@nestjs/common";
  import { AuthGuard } from "@nestjs/passport";
  import { FormDataRequest } from "nestjs-form-data";
  import { User } from "src/typeorm/entities/User";
  import { UsersService } from "src/users/services/users/users.service";
  
  @Controller("users")
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    async getAllUsers(): Promise<User[]> {
      return this.usersService.getAllUsers();
    }
  
    @Get(":id")
    async getUserById(@Param("id") id: number): Promise<User | undefined> {
      return this.usersService.getUserById(id);
    }
  
    @Post()
    @FormDataRequest()
    @UseGuards(AuthGuard("jwt"))
    async createUser(@Req() req, @Body() userData: Partial<User>): Promise<User> {
      if (req.user.role.name !== 'admin') {
        throw new ForbiddenException('You do not have permission to perform this action.');
      }
      return this.usersService.createUser(userData);
    }
  
    @Delete(":id")
    @UseGuards(AuthGuard("jwt"))
    async deleteUser(@Req() req,@Param("id") id: number): Promise<void> {
      if (req.user.role.name !== 'admin') {
        throw new ForbiddenException('You do not have permission to perform this action.');
      }
      return this.usersService.deleteUser(id);
    }
  }
  