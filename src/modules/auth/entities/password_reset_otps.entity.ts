import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn
} from 'typeorm';

@Entity('password_reset_otps')
export class PasswordResetEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'user_id', nullable: false })
  user_id: number;

  @Column({ name: 'user_email', nullable: false })
  user_email: string;

  @Column({ name: 'otp_hash', type: 'varchar', length: 255, nullable: false })
  otp_hash: string;

  @Column({ name: 'expires_at', nullable: false })
  expires_at: Date;
  
  @Column({ name: 'is_used', type: 'boolean', default: false, nullable: false })
  is_used: boolean;

  @CreateDateColumn({select:false})
  created_at: Date;
}