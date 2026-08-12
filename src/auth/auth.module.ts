import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './auth.controller';
import { UsersEntity } from './entities/signup.entity';
import { RoleEntity } from './entities/role.entity';
import { PermissionEntity } from './entities/permission.entity';
import { RolePermissionEntity } from './entities/role-permission.entity';
import { UserRoleEntity } from './entities/user-role.entity';
import { HashService } from './services/hashing.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthService } from './services/jwt.service';
import { JwtStrategy } from './strategies/jwt.strategy';

const RBACEntities = [
  UsersEntity,           // users table entity:
  RoleEntity,            // User Roles List Table:               // This Table has static content already created
  PermissionEntity,      // User Permission List Table:          // This Table has static content already created
  UserRoleEntity,        // User Assigned Roles Table
  RolePermissionEntity   // User Assigned Permisssion Table
]

@Module({
  imports: [
    TypeOrmModule.forFeature([...RBACEntities]),
    // Jwt Module:
    JwtModule.register({
      secret: 'mySuperSecretKey@098765',
      signOptions: {
        expiresIn: '30m'
      }
    })
  ],
  controllers: [AuthController],
  providers: [ 
    AuthService, 
    HashService , 
    JwtAuthService,
    JwtStrategy       // JWT Strategy Serice for Verifyin thre incoming token
  ],
})
export class AuthModule { }
