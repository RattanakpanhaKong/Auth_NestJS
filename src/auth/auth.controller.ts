import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { Tokens } from './types';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/local/signup')
  signUpLocal(@Body() dto: AuthDto): Promise<Tokens> {
    return this.authService.signUpLocal(dto)
  }

  @Post('/local/signin')
  signInLocal(@Body() dto: AuthDto, @Res() response:Response) {
    return this.authService.signInLocal(dto)
  }

  @Post('/logout')
  logout() {
    return this.authService.logout()
  }

  @Post('/refresh')
  refreshToken() {
    return this.authService.refreshToken()
  }
}
