Ways to communicate with other modules entity:

 1. Directly inject another Entity Repository ⭐
 2. Use another module's Service ⭐⭐⭐ Recommended for business logic
 3. TypeORM Relations ⭐⭐⭐ Very useful(You can create a relationship between Wishlist and Book.)
 4. QueryBuilder / JOIN(For more complex queries, use QueryBuilder.)
    This is useful when you need:

    Multiple joins
    Filtering
    Sorting
    Pagination
    Aggregation
    Complex conditions
 5. Microservice/Event communication(This is mainly relevant if your modules eventually become separate services.)


### How to Check Depandancies Graph(Tree) of Nest.js Project:
They are 3 different to check apps depandancy graph of overall module and services and controllers

    Option 1: Log the Dependency Graph to the Console (Using nestjs-spelunker):
    Option 2: Use the Native NestJS REPL (Terminal Interactive Mode),you can start NestJS in REPL mode:
           Create a repl.ts file next to your main.ts, Run the REPL script  ``npx ts-node src/repl.ts``.Inspect the graphOnce the console loads, type debug() into the prompt.
    Option 3: Use Official NestJS Devtools (Visual Dashboard) By adding flag snapshot: true in main.ts file:
           This is especially helpful if your application crashes due to a "Cannot resolve dependency" error, as it will dump a partial graph file for you to inspect

  ### DB constraint Error:

[NestJS Logs] 30868  - 08/13/2026, 2:22:10 AM   ERROR [ExceptionsHandler] QueryFailedError: SQLITE_CONSTRAINT: UNIQUE constraint failed: book_store.author_id
    at Statement.handler (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\typeorm\driver\src\driver\sqlite\SqliteQueryRunner.ts:133:29) {
  query: `INSERT INTO "book_store"("bk_id", "title", "subtitle", "description", "cover_photo", "price", "author_id", "publisher_id", "is_available", "publication_date", "pages", "language", "deleted_at", "created_at", "updated_at") VALUES (NULL, ?, ?, ?, ?, 29.99, 11, 9, 1, ?, 350, ?, NULL, datetime('now'), datetime('now'))`,
  parameters: [
    'Again',
    'Teaches the art of rethinking, unlearning old ideas',
    'Teaches the art of rethinking, unlearning old ideas, and updating our mental frameworks.',
    'storage/books/cover.webp',
    '2024-01-15',
    'English'
  ],
  driverError: [Error: SQLITE_CONSTRAINT: UNIQUE constraint failed: book_store.author_id] {
    errno: 19,
    code: 'SQLITE_CONSTRAINT'
  },
  errno: 19,
  code: 'SQLITE_CONSTRAINT'
}


### Compile Time Error
[NestJS Logs] 29600  - 08/13/2026, 12:18:20 AM   ERROR [ExceptionHandler] UnknownDependenciesException [Error]: Nest can't resolve dependencies of the WishListService (?). Please make sure that the argument "WishlistEntityRepository" at index [0] is available in the BookStoreModule context.

Potential solutions:
- Is BookStoreModule a valid NestJS module?
- If "WishlistEntityRepository" is a provider, is it part of the current BookStoreModule?
- If "WishlistEntityRepository" is exported from a separate @Module, is that module imported within BookStoreModule?
  @Module({
    imports: [ /* the Module containing "WishlistEntityRepository" */ ]
  })

For more common dependency resolution issues, see: https://docs.nestjs.com/faq/common-errors
    at Injector.lookupComponentInParentModules (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\injector.js:290:19)
    at async resolveParam (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\injector.js:140:38)
    at async Promise.all (index 0)
    at async Injector.resolveConstructorParams (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\injector.js:169:27)
    at async Injector.loadInstance (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\injector.js:75:13)
    at async Injector.loadProvider (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\injector.js:103:9)
    at async C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\instance-loader.js:56:13
    at async Promise.all (index 5)
    at async InstanceLoader.createInstancesOfProviders (C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\instance-loader.js:55:9)
    at async C:\Users\m.waqas\Pictures\Beckend Apps\Nest.js\chapterOne nestjs\node_modules\@nestjs\core\injector\instance-loader.js:40:13 {
  type: 'WishListService',
  context: {
    index: 0,
    dependencies: [
      'WishlistEntityRepository'
    ],
    name: 'WishlistEntityRepository'
  },
  metadata: {
    id: '43bb115c7024d82451798'
  },
  moduleRef: {
    id: 'a6b4981a5a3de6738436f'
  }
}

1. UnknownDependenciesException