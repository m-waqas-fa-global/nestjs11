// src/auth/auth.service.ts
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersEntity } from '../entities/signup.entity';
import { changePassInterface } from '../interfaces/change-password.interface';
import { HashService } from './hashing.service';
import { ApiResponse } from '../../../common/helpers/api-response.helper';
import { EmailService } from '../../notifications/services/email.service';

@Injectable()
export class ChangePasswordService {
  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
    // Hash Password Service:
    private readonly hashSerice: HashService,
    private readonly sendEmail: EmailService
  ) { }

  // Chnages Password: 
  async changePassword(userId: number, changePassBody: changePassInterface) {
    // Destructure with proper variable naming
    const { current_password, new_password, confirm_password } = changePassBody;

    // Check if new password and confirm password match
    if (new_password !== confirm_password) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'New password and confirm password do not match',
        error: 'Bad Request'
      });
    }

    // Get User From Database Table
    const user: UsersEntity | null = await this.userRepository.findOne({
      where: { user_id: Number(userId) },
      select: ['user_id', 'password', 'email']
    });

    // Check if user exists
    if (!user) {
      throw new NotFoundException({
        statusCode: 404,
        message: 'User not found',
        error: 'Not Found'
      });
    }

    // Check if current password is correct
    const isValidPassword = await this.hashSerice.isCompare(
      current_password,
      user.password
    );

    if (!isValidPassword) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'Current password is incorrect',
        error: 'Bad Request'
      });
    }

    // Check if new password is same as current password
    const isSamePassword = await this.hashSerice.isCompare(
      new_password,
      user.password
    );

    if (isSamePassword === true) {
      throw new BadRequestException({
        statusCode: 400,
        message: 'New password must be different from current password',
        error: 'Bad Request'
      });
    }

    // All checks are completed, update user password
    try {
      const hashedPassword = await this.hashSerice.hashPassword(new_password);

      // Update password in database
      await this.userRepository.update(userId, {
        password: hashedPassword,
        updated_at: new Date(),
      });

      return ApiResponse.success('Password changed successfully');
    } catch (error:any) {
      throw new InternalServerErrorException({
        statusCode: 500,
        message: 'Failed to update password. Please try again later.',
        error: error.message
      });
    }
  }

  // Forgot Password:
  async forgotPassword(){
     return this.sendEmail.send()
  }


}