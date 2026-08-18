// src/common/enums/role.enum.ts

export enum Role {
    super_admin = 'SUPER ADMIN',
    admin = 'ADMIN',
    customer = 'CUSTOMER',
    publisher = 'PUBLISHER'
}

export enum RoleIds {
    super_admin = 1,
    admin = 2,
    customer = 4,
    publisher = 3
}

const role  = Role.publisher