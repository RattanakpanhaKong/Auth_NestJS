import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt'){
    constructor(){
        super({
            //specifies that JWTs should be extracted from the "Authorization" header as a Bearer token.
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            
            //Indicates that the strategy should not ignore the expiration time of the JWT. If set to true, the strategy would still attempt to validate the token even if it has expired.
            ignoreExpiration: false, 

            //The secret key used to verify the signature of the JWT. This key must match the one used during JWT signing.
            secretOrKey: 'accessToken-secret',
        })
    }

    validate(payload: any){
        
        return payload
    }

}