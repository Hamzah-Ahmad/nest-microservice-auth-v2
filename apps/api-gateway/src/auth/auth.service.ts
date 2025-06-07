import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
@Injectable()
export class AuthService {
  constructor(@Inject('AUTH-SERVICE') private authClient: ClientProxy) {}

  async register(): Promise<any> {
    return this.authClient.send('auth.register', { a: 'test' });
  }
}
