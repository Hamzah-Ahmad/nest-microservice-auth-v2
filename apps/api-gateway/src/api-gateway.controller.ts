import { Public } from '@app/common/decorators/is-public.decorator';
import { JwtAuthGuard } from '@app/common/guards';
import { Controller, Get, UseGuards } from '@nestjs/common';

@Controller()
export class ApiGatewayController {

  @Public()  
  @Get('/')
  async getHealth() {
    return `API gateway running`;
  }

  // Note: Only for testing purposes. Remove
  // @UseGuards(JwtAuthGuard) // NOTE: No need for individual guards on protected route as we are globally applying the JwtAuthGuard as an application-wide guard using the APP_GUARD token  in the module provders
  @Get('/protected')
  async getProtected() {
    return `Protected route`;
  }
}
