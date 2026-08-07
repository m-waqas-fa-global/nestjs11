import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { BehaviorSubject } from "rxjs";

interface JWT_Token_Validate  {
    user_id:number
    jti:string
}

@Injectable()
export class JwtAuthService{

    private JWT_Token_Validate = new BehaviorSubject<JWT_Token_Validate | null>(null);

    constructor(
        private readonly jwtService: JwtService,
    ){}

    async generateJwtToken(payload:Object){
       return await this.jwtService.sign(payload)
    }
}