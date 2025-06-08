import {
  AUTH_PATTERNS,
  AUTH_SERVICE,
  USER_PATTERNS,
} from '@app/common/constants';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AuthService {
  constructor(@Inject(AUTH_SERVICE) private authClient: ClientProxy) {}

  // async login(): Promise<any> {
  //   return this.authClient.send(USER_PATTERNS.GET, { id: 200 });
  // }
}
