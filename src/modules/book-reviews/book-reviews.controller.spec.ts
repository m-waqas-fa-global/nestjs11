import { Test, TestingModule } from '@nestjs/testing';
import { BookReviewsController } from './book-reviews.controller';
import { BookReviewsService } from './book-reviews.service';

describe('BookReviewsController', () => {
  let controller: BookReviewsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BookReviewsController],
      providers: [BookReviewsService],
    }).compile();

    controller = module.get<BookReviewsController>(BookReviewsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
