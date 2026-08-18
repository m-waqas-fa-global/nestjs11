import { IsNotEmpty, IsString } from "class-validator";

export class SendEmailDTO {
    @IsString({message: "The 'to' field must be a string."})
    @IsNotEmpty({message: "The 'to' field is required."})
    to: string = ""

    @IsString({message: "The 'from' field must be a string."})
    @IsNotEmpty({message: "The 'from' field is required."})
    from: string = ""

    @IsString({message: "The 'subject' field must be a string."})
    @IsNotEmpty({message: "The 'subject' field is required."})
    subject: string = ""

    @IsString({message: "The 'description' field must be a string."})
    @IsNotEmpty({message: "The 'description' field is required."})
    description: string = ""

}