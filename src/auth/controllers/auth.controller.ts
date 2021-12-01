import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthDto } from '../dto/auth.dto';
import { AuthService } from '../services/auth.service';


@ApiTags('Authentication')
@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Authorization' })
  @ApiResponse({ status: 200, type: String  })
  @Post('/signin')
  signin(@Body() dto: AuthDto){
    return this.authService.signin(dto)
  }

  // @Post('/signup')
  // signup(@Body() dto: AuthDto){
  //   return this.authService.signup(dto)
  // }
}
