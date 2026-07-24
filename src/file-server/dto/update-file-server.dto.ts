import { PartialType } from '@nestjs/mapped-types';
import { CreateFileServerDto } from './create-file-server.dto';

export class UpdateFileServerDto extends PartialType(CreateFileServerDto) {}
