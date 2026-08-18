import { PartialType } from '@nestjs/swagger';

import { IsBoolean, IsNumber, IsOptional } from 'class-validator';
import { CreateBookDTO } from './create-book.dto';

export class UpdateBookStoreDto extends PartialType(CreateBookDTO) {
    @IsOptional()
    @IsNumber()
    bk_id: number;

    @IsOptional()
    @IsBoolean()
    is_available: boolean;
}
