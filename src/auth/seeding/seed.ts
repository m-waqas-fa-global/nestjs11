// import { AppDataSource } from '../../config/data-source';
// import { seedRoles } from './role.seed';
// import { seedPermissions } from './permission.seed';

// async function seed() {

//   await AppDataSource.initialize();

//   try {
//     await seedRoles(AppDataSource);
//     await seedPermissions(AppDataSource);

//     console.log('All seeders completed successfully');
//   } catch (error) {
//     console.error('Seeding failed:', error);
//   } finally {
//     await AppDataSource.destroy();
//   }
// }

// seed();