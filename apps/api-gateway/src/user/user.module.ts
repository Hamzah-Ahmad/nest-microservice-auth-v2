import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { USER_SERVICE } from '@app/common/constants';


@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: USER_SERVICE,
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.TCP,
            options: {
              host: configService.getOrThrow<string>('USER_SERVICE_HOST'),
              port: configService.getOrThrow<number>('USER_SERVICE_PORT'),
            },
          };
        },
        inject: [ConfigService],
        // imports: [ConfigModule] // We would need to do this if isGlobal was not set to true in ConfigModule.forRoot
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class UserModule {}
