import { IsArray, IsEmail, IsInt, IsNotEmpty, IsString } from "class-validator";

export class SignUpDTO {
    @IsString()
    @IsNotEmpty()
    name: string

    @IsString({ message: 'Email is must be string.' })
    @IsNotEmpty({ message: 'Email is required.' })
    @IsEmail({}, { message: 'Please enter a valid email address.' })
    email: string

    @IsString()
    @IsNotEmpty()
    password: string

    @IsInt()
    @IsNotEmpty()
    role_id: number;

    @IsArray()
    @IsInt({ each: true })
    @IsNotEmpty()
    permission_ids: number[];
}