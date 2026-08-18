import { Test, TestingModule } from '@nestjs/testing';
import { BookStoreController } from './book_store.controller';
import { BookStoreService } from './services/book_store.service';

describe('BookStoreController', () => {
  let controller: BookStoreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookStoreController],
      providers: [BookStoreService],
    }).compile();

    controller = module.get<BookStoreController>(BookStoreController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
