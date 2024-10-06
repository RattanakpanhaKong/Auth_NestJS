import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Request } from "express";
import { Injectable } from "@nestjs/common";

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh'){
    constructor(){
        super({
            //specifies that JWTs should be extracted from the "Authorization" header as a Bearer token.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 

            //The secret key used to verify the signature of the JWT. This key must match the one used during JWT signing.
            secretOrKey: 'refreshToken-secret',

            passReqToCallback: true,

        })
    }

    validate(req: Request, payload: any){
        const refreshToken = req.get('authorization').replace('Bearer', '').trim();
        return {
            ...payload,
            refreshToken
        }
    }

}