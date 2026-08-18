import { DataSource } from 'typeorm';
import { PermissionEntity } from '../../modules/auth/entities/permission.entity';


export async function seedPermissions(dataSource: DataSource) {

  const permissionRepository = dataSource.getRepository(PermissionEntity);

  const permissions: Partial<PermissionEntity>[] = [
    // Book
    { permission_name: 'book:create' },
    { permission_name: 'book:read' },
    { permission_name: 'book:update' },
    { permission_name: 'book:delete' },
    // Cart
    { permission_name: 'cart:create' },
    { permission_name: 'cart:read' },
    { permission_name: 'cart:update' },
    { permission_name: 'cart:delete' },
    // Wishlist
    { permission_name: 'wishlist:create' },
    { permission_name: 'wishlist:read' },
    { permission_name: 'wishlist:delete' },
    // Review
    { permission_name: 'review:create' },
    { permission_name: 'review:read' },
    // User
    { permission_name: 'user:create' },
    { permission_name: 'user:read' },
    { permission_name: 'user:update' },
    { permission_name: 'user:delete' },
    // Reports
    { permission_name: 'report:read' },
  ];

  await permissionRepository.upsert(
    permissions,
    ['permission_name'],
  );

  console.log('Permissions seeded successfully');
}