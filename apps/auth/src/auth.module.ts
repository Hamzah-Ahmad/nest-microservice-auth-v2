import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_SERVICE } from '@app/common/constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),

    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow<string>('USER_SERVICE_HOST'), // NOTE: make sure to use the service name in the docker compose file as the host name. So if the service name is user, hostname should be user as well
              port: configService.getOrThrow<number>('USER_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
        // imports: [ConfigModule] // We would need to do this if isGlobal was not set to true in ConfigModule.forRoot
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
