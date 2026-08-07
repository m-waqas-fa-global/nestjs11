import { IsOptional, IsString } from "class-validator";

export class CreateReportDto {
    
    @IsString({message: 'Title must be a string'})
    title: string;

    @IsOptional()
    description: string;    
}