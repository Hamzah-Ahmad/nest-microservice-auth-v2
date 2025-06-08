import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { USER_PATTERNS } from '@app/common/constants';
import { GetUserDto } from '@app/common/dtos/user/GetUser.dto';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @MessagePattern(USER_PATTERNS.GET)
  async getUser(@Payload() payload: GetUserDto) {
    return await this.userService.getUser(payload.id);
  }
}
