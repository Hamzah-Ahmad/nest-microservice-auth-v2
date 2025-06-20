import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@app/common/interfaces/token-payload.interface';
import { CreateUserDto, UserDto } from '@app/common/dtos/user';
import { firstValueFrom } from 'rxjs';
import { USER_PATTERNS, USER_SERVICE } from '@app/common/constants';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    @Inject(USER_SERVICE) private userClient: ClientProxy,
  ) {}
  async login(user: UserDto, response: Response) {
    const tokenPayload: TokenPayload = {
      userId: user.id,
    };

    // Matching the cookie expiration seconds with the JWT_EXPIRATION seconds
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get('JWT_EXPIRATION'),
    );

    const token = this.jwtService.sign(tokenPayload);

    response.cookie('Authentication', token, {
      httpOnly: true,
      expires,
    });
  }

  async register(body: CreateUserDto, response: Response) {
    try {
      const user = await firstValueFrom(
        this.userClient.send<any, CreateUserDto>(USER_PATTERNS.CREATE, body),
      );

      await this.login(user, response);
      return user;
    } catch (error) {
      // Pass error to the client with correct status
      if (error?.message === 'Username already taken') {
        throw new ConflictException(error.message);
      }

      throw new InternalServerErrorException('User creation failed');
    }
  }
}

// constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}
//   async login() {
//     const resposne = await firstValueFrom(
//       this.userClient.send<any, GetUserDto>(USER_PATTERNS.GET, {id: '1'}),
//     );

//     return resposne;
//   }
