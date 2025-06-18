import { Injectable } from '@nestjs/common';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from '@app/common/interfaces/token-payload.interface';
import { UserDto } from '@app/common/dtos/user';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
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
}

// constructor(@Inject(USER_SERVICE) private userClient: ClientProxy) {}
//   async login() {
//     const resposne = await firstValueFrom(
//       this.userClient.send<any, GetUserDto>(USER_PATTERNS.GET, {id: '1'}),
//     );

//     return resposne;
//   }
