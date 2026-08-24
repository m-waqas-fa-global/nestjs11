// src/auth/auth.service.ts
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UsersEntity } from '../entities/signup.entity';


@Injectable()
export class ChangePasswordService {
  private readonly logger = new Logger(ChangePasswordService.name);

  constructor(
    @InjectRepository(UsersEntity)
    private userRepository: Repository<UsersEntity>,
  ) {}

  /**
   * Change user password with comprehensive validation
   * @param userId - ID of the user
   * @param changePasswordDto - Password change data
   * @returns Promise with change password result
   */
  async changePassword(
    userId: string,
    changePasswordDto: ChangePasswordDto,
  ): Promise<any> {
    const { current_password, new_password, confirm_password } = changePasswordDto;

    // Validate password confirmation
    if (new_password !== confirm_password) {
      this.logger.warn(`Password confirmation mismatch for user ID: ${userId}`);
     
    }

    // Find user
    const user = await this.userRepository.findOne({
      where: { user_id: Number(userId) },
      select: ['user_id', 'password', 'email'],
    });

    if (!user) {
      this.logger.error(`User not found with ID: ${userId}`);
      throw new NotFoundException('User not found');
    }

    // Check if new password is different from current
    const isSamePassword = await bcrypt.compare(new_password, user.password);
    if (isSamePassword) {
      this.logger.warn(`User attempted to use same password: ${userId}`);
     
    }

    // Verify current password
    const isPasswordValid = await bcrypt.compare(current_password, user.password);
    if (!isPasswordValid) {
      this.logger.warn(`Invalid current password for user: ${userId}`);
     
    }

    try {
      // Hash new password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(new_password, saltRounds);

      // Update password in database
      await this.userRepository.update(userId, {
        password: hashedPassword,
        created_at: new Date(),
      });

      this.logger.log(`Password successfully changed for user: ${userId}`);

      return {
        success: true,
        message: 'Password changed successfully',
        timestamp: new Date(),
      };
    } catch (error:any) {
      this.logger.error(`Failed to change password for user ${userId}: ${error.message}`);
      throw error;
    }
  }
}