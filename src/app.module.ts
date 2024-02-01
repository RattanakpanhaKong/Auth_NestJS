import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';

@Module({
  imports: [UsersModule, AuthModule, PassportModule],
  controllers: [AppController],
  providers: [AppService, AuthService, LocalStrategy],
})
export class AppModule {}
