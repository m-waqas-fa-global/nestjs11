import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('roles')
export class RoleEntity {

  @PrimaryGeneratedColumn()
  role_id: number;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  role_name: string;

  @Column({
    type: 'boolean',
    default: true,
  })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;
}