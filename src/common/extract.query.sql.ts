// import { EntityClassOrSchema } from "@nestjs/typeorm/dist/interfaces/entity-class-or-schema.type";
// import { FindManyOptions } from "typeorm";

// export async function getUserQueryString(Entity:EntityClassOrSchema,repository:any) {
//     // 1. Define your standard repository search criteria
//     const criteria: FindManyOptions<Entity> = {
//       where: { status: 'active' },
//       relations: ['profile'],
//       order: { createdAt: 'DESC' },
//       take: 10
//     };

//     // 2. Feed the criteria into a direct QueryBuilder instance
//     const queryBuilder = this.userRepository.createQueryBuilder('user');
    
//     // TypeORM builds the internal SQL based on your find options here
//     queryBuilder.setFindOptions(criteria); 

//     // 3. Extract the SQL code directly inside the service
//     const sql = queryBuilder.getSql();
//     const parameters = queryBuilder.getParameters();

//     console.log('Generated SQL:', sql);
//     console.log('Generated Parameters:', parameters);

//     return { sql, parameters };
//   }
