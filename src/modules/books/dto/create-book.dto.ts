import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class CreateBookDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    subtitle: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsOptional()
    @IsString()
    cover_photo: string | null;

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    publication_date:Date;

    @IsNumber()
    pages:number

    @IsString()
    language:string

    @IsNumber()
    author_id:number

    @IsNumber() 
    publisher_id:number
}