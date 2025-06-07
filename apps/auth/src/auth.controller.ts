import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register')
  register(@Payload() payload: any) {
    console.log("LOGGER  - payload: ", payload)
    return `Response from auth microservice`;
  }
}
