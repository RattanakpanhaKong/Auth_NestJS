import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { jwtConstants } from './constant';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
        UsersModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60s'},
        })
    ], 
    providers: [AuthService, LocalStrategy, JwtStrategy],
    exports: [AuthService]
})
export class AuthModule {

}
