import { 
  Entity, 
  Unique, 
  PrimaryGeneratedColumn, 
  Column 
} from "typeorm";

@Entity('role_permissions')
@Unique(['role_id', 'permission_id'])
export class RolePermissionEntity {

  @PrimaryGeneratedColumn()
  role_permission_id: number;

  @Column({
    type: 'int',
  })
  role_id: number;

  @Column({
    type: 'int',
  })
  permission_id: number;
}