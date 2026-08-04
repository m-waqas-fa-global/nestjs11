import { DataSource } from "typeorm";
import { RoleEntity } from "../auth/entities/role.entity";
import { PermissionEntity } from "../auth/entities/permission.entity";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    entities: [RoleEntity, PermissionEntity]
})