import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import { FileServerController } from './file-server.controller';
import { FileServerService } from './service/file-server.service';

describe('FileServerController', () => {
  let controller: FileServerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FileServerController],
      providers: [FileServerService],
    }).compile();

    controller = module.get<FileServerController>(FileServerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
