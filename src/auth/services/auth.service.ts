import { HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
import { ApiResponse } from '../../common/helpers/api-response.helper';
import { Login, SignUpDto } from '../interfaces/auth.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersEntity } from '../entities/signup.entity';
import { Repository } from 'typeorm';
import { HashService } from './hashing.service';
import { RoleEntity } from '../entities/role.entity';
import { PermissionEntity } from '../entities/permission.entity';

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
        // Hash Service:
        private readonly hashService: HashService
    ) { }
    // ========== Create New User in Database: ===============
    async createUser(signUpData: SignUpDto) {
        //check if user already exist
        const existingUser = await this.userTableRepo.findOneBy({ email: signUpData.email });
        if (existingUser) {
            return ApiResponse.error("User already exist", HttpStatus.BAD_REQUEST)
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
            const createdUser = await this.userTableRepo.save(user);
            return ApiResponse.success(
                `User ${createdUser.name} created successfully!`,
                null,
                HttpStatus.CREATED
            )
        } catch (error) {
            throw new InternalServerErrorException('Failed to create user');
        }
    }
    // ========== Get All signup users from Database: ===============
    async getAllSignUsers() {
        const res = await this.userTableRepo.find();
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


        const response = {
            token: crypto.randomUUID(),
            id: existingUser.user_id,
            name: existingUser.name,
            email: existingUser.email,
            is_active: existingUser.is_active,
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
    async get_roles_permissions(query: Object) {
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
            { roles, permissions },
            HttpStatus.OK
        )
    }

}