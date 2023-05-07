import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { LoginDTO } from './login.dto';
import { RegisterDTO } from './register.dto';
import { Token } from 'src/tokens/token.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('userlogin')
  login(@Body() loginDto: LoginDTO): Promise<Token> {
    return this.authService.loginUser(loginDto.email, loginDto.password);
  }

  @HttpCode(HttpStatus.CREATED)
  @Post('useradd')
  register(@Body() registerDto: RegisterDTO): Promise<Token> {
    return this.authService.registerUser(
      registerDto.firstName,
      registerDto.lastName,
      registerDto.email,
      registerDto.password,
    );
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Get('userlogout')
  logout(@Request() req) {
    return this.authService.logoutUser(req.payload, req.token);
  }
}
