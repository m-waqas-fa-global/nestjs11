import { IsString, IsNotEmpty } from "class-validator"

export class InboxSmsDTO  {
    @IsString({message: "The 'to' field must be a string."})
    @IsNotEmpty({message: "The 'to' field is required."})
    to: string = ""
    
    @IsString({message: "The 'message' field must be a string."})
    @IsNotEmpty({message: "The 'message' field is required."})
    message: string = ""
}
