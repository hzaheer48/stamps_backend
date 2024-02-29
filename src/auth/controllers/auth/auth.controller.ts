import {
  Body,
  Controller,
  Post,
} from "@nestjs/common";
import { FormDataRequest } from "nestjs-form-data";
import { AuthService } from "src/auth/services/auth/auth.service";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/signup")
  @FormDataRequest()
  signUp(@Body() signUpDto: any): Promise<{ token: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Post("/login")
  @FormDataRequest()
  login(@Body() loginDto: any): Promise<{ token: string }> {
    return this.authService.login(loginDto);
  }
}
