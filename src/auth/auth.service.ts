import { ForbiddenException, Injectable, Res } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
// import { jwtConstants } from './constant';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { Tokens } from './types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(username: string, password: string): Promise<any> {
  //   const user = await this.usersService.findOne(username);

  //   if (user && user.password === password) {
  //     const { password, ...rest } = user;
  //     return rest;
  //   }

  //   return null;
  // }

  // async login(user: any) {
  //   const payload = { username: user.username, sub: user.userId };
  //   return {
  //     access_token: this.jwtService.sign(payload, {
  //       secret: jwtConstants.secret,
  //       expiresIn: '60s',
  //     }),
  //   };
  // }



  async signInLocal(dto: AuthDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({
      where: {
        email: dto.email
      }
    })

    if(!user){
      throw new ForbiddenException("Access Denied !")
  }
    
    const passportMatches = await bcrypt.compare(dto.password, user.hash)

    if(!passportMatches){
      throw new ForbiddenException("Access Denied !")
    }

    const passwordMatches = await bcrypt.compare(user.hash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
  
  async signUpLocal(dto: AuthDto): Promise<Tokens> {
    const hash = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token)
    return tokens;
  }

  logout() {}

  refreshToken() {}

  async updateRtHash(userId: number, refreshToken: string) {
    const hash = await this.hashData(refreshToken);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

}