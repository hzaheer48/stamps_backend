import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import * as bcrypt from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/typeorm/entities/User";
import { UserRole } from "src/typeorm/entities/UserRole";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(UserRole)
    private userRolesRepository: Repository<UserRole>,
    private jwtService: JwtService
  ) {}

  async signUp(signUpDto: any): Promise<{ token: string }> {
    const { fullName, username, email, password } = signUpDto;

    const validationErrors = await this.validateInput(signUpDto);
    if (validationErrors.length > 0) {
      throw new BadRequestException(validationErrors);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userRoles = await this.userRolesRepository.findOne({
      where: { id: 2 },
    });
    const user = this.usersRepository.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: userRoles,
    });

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async login(loginDto: any): Promise<{ token: string }> {
    const { usernameOrEmail, password } = loginDto;

    if (!usernameOrEmail) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const user = await this.usersRepository.findOne({
      where: [{ email: usernameOrEmail }, { username: usernameOrEmail }],
    });

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException("Invalid email or password");
    }

    user.lastLogin = new Date();

    await this.usersRepository.save(user);

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }

  async validateInput(signUpDto: any): Promise<string[]> {
    const errors: string[] = [];

    if (!signUpDto.fullName || signUpDto.fullName.trim() === "") {
      errors.push("Full name cannot be empty");
    }

    if (!signUpDto.username || signUpDto.username.trim() === "") {
      errors.push("Username cannot be empty");
    }

    if (!signUpDto.email || signUpDto.email.trim() === "") {
      errors.push("Email cannot be empty");
    } else if (!this.isValidEmail(signUpDto.email)) {
      errors.push("Invalid email format");
    }

    if (!signUpDto.password || signUpDto.password.trim() === "") {
      errors.push("Password cannot be empty");
    } else if (signUpDto.password.length < 8) {
      errors.push("Password must be at least 8 characters long");
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(
        signUpDto.password
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
