import { IsNotEmpty, IsString, IsNumber, IsOptional } from "class-validator";

export class WishListDTO {
    @IsNumber()
    @IsNotEmpty()
    user_id: string;

    @IsNumber()
    @IsNotEmpty()
    book_id: string;

}