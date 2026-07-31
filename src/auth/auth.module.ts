import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersEntity } from './entities/signup.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { UserRoleEntity } from './entities/user-role.entity';

const RBACEntities = [
  UsersEntity,           // users table entity:
  RoleEntity,            // User Roles List Table:               // This Table has static content already created
  PermissionEntity,      // User Permission List Table:          // This Table has static content already created
  UserRoleEntity,        // User Assigned Roles Table
  RolePermissionEntity   // User Assigned Permisssion Table
]

@Module({
  // imports:[ ...RBACEntities ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
