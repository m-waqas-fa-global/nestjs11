### Use .upsert() for Seeding:
   Database Seeding is a process of inserting default data into table by runing a simple command instead of inserting using queries, this methods is very usefull because they inset Data at once if user run this command again and again data is inserted at once not duplicated,

   [Arguments]
      1. The data you want to insert or update
      2. String array of columns that define the unique constraint

   `await userRepository.upsert(`
      `entityOrEntities, // The data you want to insert or update`
      `conflictPaths     // String array of columns that define the unique constraint`
   `);`
   