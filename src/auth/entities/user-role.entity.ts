import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
} from 'typeorm';

@Entity('user_roles')
@Unique(['user_id', 'role_id'])  // Those Two Colums are always unique
export class UserRoleEntity {

  @PrimaryGeneratedColumn()
  user_role_id: number;

  @Column({
    type: 'int',
  })
  user_id: number;

  @Column({
    type: 'int',
  })
  role_id: number;
}