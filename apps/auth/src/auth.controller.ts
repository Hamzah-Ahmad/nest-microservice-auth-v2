import { Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from '@app/common/decorators';
import { UserDto } from '@app/common/dtos/user';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @CurrentUser() user: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    await this.authService.login(user, response);
    response.send(user);
  }

  // Using guard here will ensure that the JWT received in the request will be checked verified.
  // The JWTAuthGuard will add the user property to the Payload, similar to how it adds to the request object
  @UseGuards(JwtAuthGuard)
  @MessagePattern('auth.authenticate')
  async authenticate(@Payload() data: any) {
    return data.user;
  }
}
