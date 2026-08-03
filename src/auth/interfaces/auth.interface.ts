export interface SignUpDto {
    name:string
    email:string
    password:string
}

export type Login = Omit<SignUpDto,"name">;
