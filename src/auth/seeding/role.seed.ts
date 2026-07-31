import { DataSource } from 'typeorm';
import { RoleEntity } from '../entities/role.entity';

export async function seedRoles(dataSource: DataSource) {

  const roleRepository = dataSource.getRepository(RoleEntity);

  const roles = [
    {
      role_name: 'Admin',
      isActive: true,
    },
    {
      role_name: 'Publisher',
      isActive: true,
    },
    {
      role_name: 'Customer',
      isActive: true,
    },
  ];

  await roleRepository.upsert(roles, ['role_name']);

  console.log('Roles seeded successfully');
}