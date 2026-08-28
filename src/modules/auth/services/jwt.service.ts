import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { BehaviorSubject } from "rxjs";

interface JWT_Token_Validate  {
    user_id:number
    jti:string
}
interface Expiry{
    expiresIn: string
}

@Injectable()
export class JwtAuthService{

    private JWT_Token_Validate = new BehaviorSubject<JWT_Token_Validate | null>(null);

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService:ConfigService
    ){}

    async generateJwtToken(payload:object){
       return await this.jwtService.sign(payload)
    }

    async generateJwtResetToken(payload:object,expiry:JwtSignOptions = { expiresIn:'3m' }){
       // eslint-disable-next-line @typescript-eslint/await-thenable
       return await this.jwtService.sign(payload,expiry)
    }
    
    async verifyJwtToken(token:string){
        return await this.jwtService.verify(token,{
            secret:this.configService.get("JWT_SECRET")
        })
    }


}