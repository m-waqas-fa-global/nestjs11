import { IsNotEmpty,IsNumber } from "class-validator";

export class WishListDTO {
    @IsNumber()
    @IsNotEmpty()
    book_id: number;
}