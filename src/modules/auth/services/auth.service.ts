import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Login, SignUpBody } from '../interfaces/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/signup.entity';
import { In, Repository } from 'typeorm';
import { HashService } from './hashing.service';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '../entities/permission.entity';
import { UserRoleEntity } from '../entities/user-role.entity';
import { RolePermissionEntity } from '../entities/role-permission.entity';
import { transformResponse } from '../services/transform.helper';
import { JwtAuthService } from './jwt.service';
import { ApiResponse } from '../../../common/helpers/api-response.helper';

@Injectable()
export class AuthService {
    constructor(
        // UserTableEntity:
        @InjectRepository(UsersEntity)
        private readonly userTableRepo: Repository<UsersEntity>,
        // RolesTableEntity:
        @InjectRepository(RoleEntity)
        private readonly rolesTableRepo: Repository<RoleEntity>,
        // PermissionsTableEntity:
        @InjectRepository(PermissionEntity)
        private readonly permissionTableRepo: Repository<PermissionEntity>,

        @InjectRepository(UserRoleEntity)
        private readonly userRoleEntity: Repository<UserRoleEntity>,
        // PermissionsTableEntity:
        @InjectRepository(RolePermissionEntity)
        private readonly rolePermissionTableEntity: Repository<RolePermissionEntity>,
        // Hash Service:
        private readonly hashService: HashService,

        private readonly JWTService: JwtAuthService
    ) { 
        // this.userTableRepo.delete({user_id:1})    // Be Attention Don't execute this query: 
    }


    // ============================================================================
    private async isValidRole(roleId: number): Promise<boolean> {                   // Validate Roles:
        return this.rolesTableRepo.exist({
            where: {
                role_id: roleId,
            },
        });
    }

    private async isValidPermissions(permissionIds: number[]): Promise<boolean> {    // Validate Permissions:
        const uniquePermissionIds = [...new Set(permissionIds)];
        const permissions = await this.permissionTableRepo.find({
            where: {
                permission_id: In(uniquePermissionIds),
            },
            select: ['permission_id'],
        });

        return permissions.length === uniquePermissionIds.length;
    }

    private async getUserRoleAndPermission(user_id: number) {
        const userRoleMapping = await this.userRoleEntity.findOneBy({
          user_id,
        });
        // return if no role exist:
        if (!userRoleMapping) {
          return null;
        }
        // get role name from RolesTable:
        const role = await this.rolesTableRepo.findOne({
          where: {
            role_id: userRoleMapping.role_id,
          },
          select: {
            role_id: true,
            role_name: true,
          }
        });

        const permission = await this.getUserPermissions(role?.role_id);
        const extractRoleObj = transformResponse([role],'role_id','role_name')
        // user role & permissions:
        return {
            roles : extractRoleObj ?  extractRoleObj[0] : null, 
            permissions : transformResponse(permission,'permission_id','permission_name'), 
        }
    }

    private async getUserPermissions(role_id:number | undefined){
        // getting user permission ids from rolePermissionTableEntity:
        const rolePermission  = await this.rolePermissionTableEntity.findOneBy({
            role_id: role_id,
        });

        if (!rolePermission) {
            return [];
        }

        // Step 3: Get permission details
        return this.permissionTableRepo.find({
            where: {
              permission_id: In(rolePermission.permission_ids),
            },
            select: {
              permission_id: true,
              permission_name: true,
            },
        });

    }
    // ============================================================================


    // ========== Create New User in Database: ===============
    async createUser(signUpData: SignUpBody) {
        let createdUser: any;
        //check if user already exist
        const existingUser = await this.userTableRepo.findOneBy({ email: signUpData.email });
        if (existingUser) {
            return ApiResponse.error("User already exist", HttpStatus.BAD_REQUEST)
        }

        // Roles and PermissionsIds Validation Check;
        const isValidRole = await this.isValidRole(signUpData.role_id);
        if (!isValidRole) {
            return ApiResponse.error("Invalid User Role ID", HttpStatus.BAD_REQUEST)
        }
        const isValidPermissions = await this.isValidPermissions(signUpData.permission_ids);
        if (!isValidPermissions) {
            return ApiResponse.error("Invalid User Permissions IDs", HttpStatus.BAD_REQUEST)
        }

        //password Hashing Process:
        const hashPassword = await this.hashService.hashPassword(
            signUpData.password
        )
        // create entity:
        const user = this.userTableRepo.create({
            ...signUpData,
            password: hashPassword
        })
        //saved user into the Database:
        try {
            createdUser = await this.userTableRepo.save(user);
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user');
        }
        //User Role Table Creation:
        const userRole = this.userRoleEntity.create({
            user_id: createdUser.user_id,
            role_id: signUpData.role_id
        })
        // Save UserRole in Database
        await this.userRoleEntity.save(userRole);
        // User  Permission Table Creation:
        const userRolePermission = this.rolePermissionTableEntity.create({
            role_id: signUpData.role_id,
            permission_ids: signUpData.permission_ids
        })
        // Save Permission in Database
        await this.rolePermissionTableEntity.save(userRolePermission);

        return ApiResponse.success(
            `User ${createdUser.name} created successfully!`,
            null,
            HttpStatus.CREATED
        )
    }
    // ========== Get All signup users from Database: ===============
    async getAllSignUsers() {
        const query = {
            select: {
                user_id : true,
                name : true,
                email : true,
                created_at : true
            }
        }
        const res = await this.userTableRepo.find(query);
        return ApiResponse.success("List of sign up users", res);
    }

    async loginUser(loginData: Login) {
        //check if user already exist
        const existingUser = await this.userTableRepo.findOneBy({ email: loginData.email });
        if (!existingUser) {
            return ApiResponse.error(
                "User not found registered first",
                HttpStatus.NOT_FOUND
            )
        }

        // check user cridentails:
        const isTrue = await this.hashService.isCompare(loginData.password, existingUser.password)
        if (!isTrue) {
            return ApiResponse.error(
                "Bad Credentials : Invalid username or password",
                HttpStatus.BAD_REQUEST
            )
        }

        // Check user is_active if not then throw exception:
        if (!existingUser.is_active) {
            return ApiResponse.error(
                "User Locked : Please contect your admin",
                HttpStatus.BAD_REQUEST
            )
        } 
        
        // Getting Role and Permission of currently login user:
        const userRolePermissions =  await this.getUserRoleAndPermission(existingUser.user_id)
        
        const jwt_payload = {
            "sub": existingUser.user_id,      // user id
            // "name": existingUser.name,
            "email": existingUser.email,      // email
            "role_id": userRolePermissions?.roles?.id,
            "roles": userRolePermissions?.roles?.name
        }

        const token = await this.JWTService.generateJwtToken(jwt_payload);
        const user = {
            id: existingUser.user_id,
            name: existingUser.name,
            email: existingUser.email,
            is_active: existingUser.is_active,
            ...userRolePermissions
        };
        const response = {
            token: token,
            user
        }

        return ApiResponse.success(
            "User login successfully",
            response,
            HttpStatus.OK
        )
    }

    async changeUserStatus(userId: number) {
        // Check if the user exists
        const user = await this.userTableRepo.findOneBy({
            user_id: userId,
        });
        // check user exit or not
        if (!user) {
            return ApiResponse.error(
                'User not found.',
                HttpStatus.NOT_FOUND,
            );
        }
        // Toggle active status
        user.is_active = !user.is_active;
        // Save changes
        const updatedUser = await this.userTableRepo.save(user);
        // send response back to client
        return ApiResponse.success(
            `User has been ${updatedUser.is_active ? 'activated' : 'deactivated'
            } successfully.`,
            null,
            HttpStatus.OK,
        );
    }

    // ===================== Role Permissions =================
    async get_roles_permissions_list() {
        const rolesQuery = {
            select: {
                role_name: true,
                role_id: true,
                is_active: false,
                created_at: false
            }
        }
        const permissionQuery = {
            select: {
                permission_id: true,
                permission_name: true,
                created_at: false
            }
        }

        const roles = await this.rolesTableRepo.find(rolesQuery);
        const permissions = await this.permissionTableRepo.find(permissionQuery);

        return ApiResponse.success(
            "Roles and Permissions",
            { 
                roles : transformResponse(roles,'role_id','role_name'), 
                permissions : transformResponse(permissions,'permission_id','permission_name'), 
            },
            HttpStatus.OK
        )
    }

    async getRegisteredUserCount(){
        return {
            total_user: await this.userTableRepo.count(),
            active_user: 3,
        }
    }
   
}