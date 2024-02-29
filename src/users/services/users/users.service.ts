// users.service.ts
import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from "@nestjs/common";
  import { InjectRepository } from "@nestjs/typeorm";
  import { User } from "src/typeorm/entities/User";
  import { Repository } from "typeorm";
  import * as bcrypt from "bcryptjs";
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectRepository(User) private userRepository: Repository<User>
    ) {}
  
    async getAllUsers(): Promise<User[]> {
      return this.userRepository.find();
    }
  
    async getUserById(id: number): Promise<User | undefined> {
      const user = await this.userRepository.findOne({
        where: {
          id: id,
        },
      });
      if (user) {
        return user;
      }
      throw new NotFoundException("Could not find user");
    }
  
    async createUser(userData: Partial<User>): Promise<User> {
      const { fullName, username, email, password } = userData;
  
      const validationErrors = await this.validateInput(userData);
      if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors);
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const user = await this.userRepository.create({
        fullName,
        username,
        email,
        password: hashedPassword,
      });
      return this.userRepository.save(user);
    }
  
    async deleteUser(id: number): Promise<void> {
      await this.userRepository.delete(id);
    }
  
    async validateInput(userData: any): Promise<string[]> {
      const errors: string[] = [];
  
      if (!userData.fullName || userData.fullName.trim() === "") {
        errors.push("Full name cannot be empty");
      }
  
      if (!userData.username || userData.username.trim() === "") {
        errors.push("Username cannot be empty");
      }
  
      if (!userData.email || userData.email.trim() === "") {
        errors.push("Email cannot be empty");
      } else if (!this.isValidEmail(userData.email)) {
        errors.push("Invalid email format");
      }
  
      if (!userData.password || userData.password.trim() === "") {
        errors.push("Password cannot be empty");
      } else if (userData.password.length < 8) {
        errors.push("Password must be at least 8 characters long");
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
          userData.password
        )
      ) {
        errors.push(
          "Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character"
        );
      }
  
      return errors;
    }
  
    isValidEmail(email: string): boolean {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  }
  