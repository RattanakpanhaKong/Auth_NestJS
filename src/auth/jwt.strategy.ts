// import { Injectable } from "@nestjs/common";
// import { PassportStrategy } from "@nestjs/passport";
// import { ExtractJwt, Strategy } from "passport-jwt";
// import { jwtConstants } from "./constant";

// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy){
//     constructor(){
//         super({
//             //specifies that JWTs should be extracted from the "Authorization" header as a Bearer token.
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), 
            
//             //Indicates that the strategy should not ignore the expiration time of the JWT. If set to true, the strategy would still attempt to validate the token even if it has expired.
//             ignoreExpiration: false, 

//             //The secret key used to verify the signature of the JWT. This key must match the one used during JWT signing.
//             secretOrKey: jwtConstants.secret, 
//         })
//     }

//     async validate(payload: any){
//         return {
//             userId: payload.sub,
//             username: payload.username
//         }
//     }
// }