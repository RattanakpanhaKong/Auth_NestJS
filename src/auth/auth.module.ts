import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
// import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constant';
// import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { AccessTokenStrategy, RefreshTokenStrategy } from './strategies';

@Module({
    imports: [
        UsersModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s'},
        })
    ], 
    // providers: [AuthService, LocalStrategy, JwtStrategy],
    providers: [AuthService, AccessTokenStrategy, RefreshTokenStrategy],
    exports: [AuthService],
    controllers: [AuthController]
})
export class AuthModule {

}
