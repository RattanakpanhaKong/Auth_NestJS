import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
import { LocalStrategy } from './auth/local.strategy';
import { SessionSerializer } from './auth/session.serializer';

@Module({
  imports: [
    UsersModule, 
    AuthModule, 
    PassportModule.register({session:true})
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    AuthService, 
    LocalStrategy, 
    SessionSerializer
  ],
})
export class AppModule {}
