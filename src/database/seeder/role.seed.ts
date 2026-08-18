import { DataSource } from 'typeorm';
import { RoleEntity } from '../../modules/auth/entities/role.entity';

export async function seedRoles(dataSource: DataSource) {
  const roleRepository = dataSource.getRepository(RoleEntity);

  const defaultRoles: Partial<RoleEntity>[] = [
    {
      role_name: 'SUPER ADMIN',
      is_active: true,
    },
    {
      role_name: 'ADMIN',
      is_active: true,
    },
    {
      role_name: 'PUBLISHER',
      is_active: true,
    },
    {
      role_name: 'CUSTOMER',
      is_active: true,
    }
  ];
  // check if role is already exit in table don't insert again:
  await roleRepository.upsert(defaultRoles, ['role_name']);
  console.log('Roles seeded successfully.');
}