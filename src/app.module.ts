import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';
// import { LocalStrategy } from './auth/local.strategy';
// import { SessionSerializer } from './auth/session.serializer';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    UsersModule, 
    AuthModule,
    JwtModule, 
    PassportModule.register({session:true}), PrismaModule
  ],
  controllers: [
    AppController
  ],
  providers: [
    AppService, 
    AuthService, 
    // LocalStrategy, 
    // SessionSerializer
  ],
})
export class AppModule {}
