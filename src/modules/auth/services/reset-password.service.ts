import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailService } from "../../notifications/services/email.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../entities/signup.entity";
import { HashService } from "./hashing.service";
import { PasswordResetEntity } from "../entities/password_reset_otps.entity";
import * as crypto from 'crypto';
import { ApiResponse } from "../../../common/helpers/api-response.helper";

@Injectable()
export class ResetPasswordService {
    constructor(
        @InjectRepository(UsersEntity)
        private userRepository: Repository<UsersEntity>,

        @InjectRepository(PasswordResetEntity)
        private resetPassRepo: Repository<PasswordResetEntity>,
        // Email Sending Service:
        private readonly sendEmail: EmailService,
        // Hash Serice:
        private readonly hashService: HashService
    ) { }

    private readonly OTP_EXPIRY_MINUTES: number = 5;

    /**
    * ✅ Generate random OTP
    */
    private generateOtp(): string {
        // Generate 6-digit OTP
        return Math.floor(100000 + Math.random() * 900000).toString();
    }
    /**
    * ✅ Hash OTP for secure storage
    */
    private hashOtp(otp: string) {
        return this.hashService.hashPassword(otp);
    }

    private generateToken():string{
    const token = crypto.randomBytes(28).toString('hex'); // 56 characters

    // Or exactly 55 characters:
    const token55 = crypto.randomBytes(30).toString('base64').slice(0, 55).replace(/[+/=]/g, '');
    return token55;
    }

    async forgotPassword(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'User does not exit, Please registered first',
                error: 'Bad Request'
            });
        }

        const otp = this.generateOtp();
        const hashOtp = await this.hashOtp(otp);
        
        const expiresAt = new Date(Date.now() + this.OTP_EXPIRY_MINUTES * 60 * 1000);
        // Saved this HashOTP in DB;
        const otpEntity = this.resetPassRepo.create({
            user_id: user.user_id,
            user_email: user.email,
            otp_hash: hashOtp,
            expires_at: expiresAt
        })

        try {
            // Send this OTP Number to Client Email:
           return { token:this.generateToken(),hash: hashOtp, otp: otp, data: otpEntity }
            await this.resetPassRepo.save(otpEntity);
            // Send OTP to Client
            return this.sendEmail.sendOTPEmail(email, otp)
        } catch (error: any) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }

    async verifyOTP(user_email: string,otp:string) {
        // Get OTP from ResetPasswordEntity:
        const otp_avaliable = await this.resetPassRepo.findOne({where:{user_email}});
         if(!otp_avaliable){
            throw new BadRequestException({
                statusCode: 400,
                message: 'OTP not found',
            })
        }
        // Compare User OTP is campred is correct:
        const isCompare = await this.hashService.isCompare(otp,otp_avaliable?.otp_hash);
        if(!isCompare){
            throw new BadRequestException({
                statusCode: 400,
                message: 'OTP incorrect or invalid',
            })
        }
        return ApiResponse.success("OTP verifyed successfully",{token:this.generateToken()})
    }

    resetPassword(email: string,token:string) {
        return {
            msg: "email recieved"
        }
    }
}