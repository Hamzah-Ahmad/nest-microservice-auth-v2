import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: "./apps/api-gateway/.env"
    }),
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
