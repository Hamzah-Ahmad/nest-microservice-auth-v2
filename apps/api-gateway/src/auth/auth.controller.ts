import { Body, Controller, Injectable, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(): Promise<string> {
    return  this.authService.login() ;
  }


  
}
