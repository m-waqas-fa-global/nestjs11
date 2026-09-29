import {
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  Column
} from "typeorm";

@Entity('role_permissions')    // Table Name:
export class RolePermissionEntity {

  @PrimaryGeneratedColumn()
  role_permission_id: number;

  @Column({
    type: 'int',
  })
  role_id: number;

  @Column({
    type: 'simple-array',
  })
  permission_ids: number[];
}