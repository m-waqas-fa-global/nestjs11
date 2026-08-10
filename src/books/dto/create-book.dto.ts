import { IsNotEmpty, IsString, IsNumber } from "class-validator";

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

    cover_photo:string | null

    @IsNumber()
    @IsNotEmpty()
    price: number;

    @IsNotEmpty()
    publication_date:Date;

    pages:number

    language:string
}