import { DataSource } from "typeorm";
import { RoleEntity } from "../auth/entities/role.entity";
import { PermissionEntity } from "../auth/entities/permission.entity";
import { AuthorEntity } from "../books/entities/authors.entity"
import { PublishersEntity } from "../books/entities/publishers.entity";

export const AppDataSource = new DataSource({
    type: 'sqlite',
    database: 'database.sqlite',
    synchronize: true,
    entities: [
        RoleEntity, 
        PermissionEntity,
        AuthorEntity,
        PublishersEntity
    ]
})