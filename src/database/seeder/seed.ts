import { AppDataSource } from '../../config/data-source';
import { seedRoles } from './role.seed';
import { seedPermissions } from './permission.seed';
import { seedAuthers } from './auther.seed';
import { seedPublishers } from './publisher.seed';

async function seed() {
    await AppDataSource.initialize();

    try {
        // await seedRoles(AppDataSource);       // Insert Roles:
        // await seedPermissions(AppDataSource);  // Insert Permission:
        await seedAuthers(AppDataSource)       // Insert Bulk Authors List:
        await seedPublishers(AppDataSource)    // Inset Bulk Publishers
        console.log('All seeders completed successfully');
    } catch (error) {
        console.error('Seeding failed:', error);
    } finally {
        await AppDataSource.destroy();
    }
}

seed();