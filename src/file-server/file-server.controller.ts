import { Controller, Get, Post, Body } from '@nestjs/common';

import { CreateFileServerDto } from './dto/create-file-server.dto';
import { FileServerService } from './service/file-server.service';

@Controller()
export class FileServerController {
  constructor(private readonly fileServerService: FileServerService) { }
}
