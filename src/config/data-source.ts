import { DataSource } from "typeorm";
import { PermissionEntity } from "../modules/auth/entities/permission.entity";
import { RoleEntity } from "../modules/auth/entities/role.entity";
import { AuthorEntity } from "../modules/books/entities/authors.entity";
import { PublishersEntity } from "../modules/books/entities/publishers.entity";

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