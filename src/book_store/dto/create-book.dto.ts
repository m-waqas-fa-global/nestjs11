import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateBookDTO {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    author: string;

    @IsNumber()
    @IsNotEmpty()
    price: number;
}
