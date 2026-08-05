import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class JwtAuthService{
    constructor(
        private readonly jwtService: JwtService,
    ){}

    async generateJwtToken(payload:Object){
        await this.jwtService.signAsync(payload)
    }
}