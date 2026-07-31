import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('permissions')
export class PermissionEntity {

  @PrimaryGeneratedColumn()
  permission_id: number;

  @Column({
    type: 'varchar',
    length: 100,
    unique: true,
  })
  permission_name: string;


  @CreateDateColumn()
  createdAt: Date;
}