import { BadGatewayException, BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { EmailService } from "../../notifications/services/email.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UsersEntity } from "../entities/signup.entity";
import { HashService } from "./hashing.service";
import { PasswordResetEntity } from "../entities/password_reset_otps.entity";
import * as crypto from 'crypto';
import { ApiResponse } from "../../../common/helpers/api-response.helper";
import { JwtAuthService } from "./jwt.service";

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
        private readonly hashService: HashService,
        // JWT Service:
        private readonly JwtService: JwtAuthService
    ) { }

    private readonly OTP_EXPIRY_MINUTES: number = 2;

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

    async forgotPassword(email: string) {
        // Check User Exit in Database or not:
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'User does not exit, Please registered first',
                error: 'Bad Request'
            });
        }

        const otp = this.generateOtp();              // Generate 6 digit OTP:
        const hashOtp = await this.hashOtp(otp);     // Hash OTP:

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
            // return { token: this.generateToken(), hash: hashOtp, otp: otp, data: otpEntity }
            await this.resetPassRepo.save(otpEntity);
            // Send OTP to Client
            await this.sendEmail.sendOTPEmail(email, otp);
            return ApiResponse.success(`OTP sent to ${email}`)
        } catch (error: any) {
            throw new InternalServerErrorException({
                statusCode: 500,
                message: 'Internal Server Error',
                error: error.message
            })
        }
    }

    async verifyOTP(user_email: string, otp: string) {
        // Get OTP from ResetPasswordEntity:
        const otp_avaliable = await this.resetPassRepo.findOne({ 
            where: { 
                user_email,
                is_used:false
            } 
        });
        if (!otp_avaliable) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'OTP not found againt this user',
            })
        }

        // First Check Its OTP Expiry Time if exceed return Time out error resent OTP Again:
        // Afterward Add this Expiry Time of Token as Well:

        // Compare User OTP is campred is correct:
        const isCompare = await this.hashService.isCompare(otp, otp_avaliable?.otp_hash);
        if (!isCompare) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'OTP incorrect or invalid',
            })
        }

        const payload = {
            sub: otp_avaliable.user_id,
            type: 'password_reset',
        }
        // After Verification generate JWT Token:
        const token = await this.JwtService.generateJwtResetToken(payload);
        return ApiResponse.success("OTP verified successfully", { token })
    }

    async resetPassword(newPassword: string, token: string) {
        let verifiedPayload;
        try {
            verifiedPayload = await this.JwtService.verifyJwtToken(token);
            // Validate token type
            if (verifiedPayload.type !== "password_reset") {
                throw new BadRequestException({
                    message: "Invalid token type"
                });
            }
        } catch (error: any) {
            // Token verification failed
            throw new BadRequestException({
                message: error?.message === "jwt expired"
                    ? "Reset token has expired, please verify OTP again"
                    : "Invalid reset token, please verify OTP again"
            });
        }

        // Find user
        const user = await this.userRepository.findOne({
            where: { user_id: verifiedPayload?.sub }
        });
        if (!user) {
            throw new BadRequestException({
                message: "User not found"
            });
        }
        // Hash new password
        const hashedPassword = await this.hashService.hashPassword(newPassword);

        try {
            // Reset user password
            await this.userRepository.update(user.user_id, {
                password: hashedPassword,
                password_reset_at: new Date().toISOString()
            });
            // Mark all OTPs as used for this user
            await this.resetPassRepo.update(
                { user_email: user.email },
                { is_used: true }
            );
            return ApiResponse.success("Password reset successfully");
        } catch (error) {
            throw new InternalServerErrorException({
                message: "Failed to reset password, please try again later"
            });
        }
    }
}