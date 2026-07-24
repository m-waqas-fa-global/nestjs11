import { Module } from '@nestjs/common';

import { FileServerController } from './file-server.controller';
import { FileServerService } from './service/file-server.service';

@Module({
  controllers: [FileServerController],
  providers: [FileServerService],
})
export class FileServerModule { }
