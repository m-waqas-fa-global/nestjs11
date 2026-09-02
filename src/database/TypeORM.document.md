## TypeORM Methods Commonly used:
1. `const isValidAuthor = await this.autherRepo.findOneBy({author_id:createBookBody.author_id});`
Return existing recorde if match with the given ID.
2. `const isValidPub = await this.publisherRepo.exists({where:{publisher_id:createBookBody.publisher_id}});`
Return [Boolean] if recorde exist.