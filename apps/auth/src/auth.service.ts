import { USER_PATTERNS, USER_SERVICE } from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}
  async login() {
    const resposne = await firstValueFrom(
      this.userClient.send(USER_PATTERNS.GET, {}),
    );

    return resposne;
  }
}
