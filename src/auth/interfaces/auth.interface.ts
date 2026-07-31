export interface SignUpData {
    name:string
    email:string
    password:string
}

export type Login = Omit<SignUpData,"name">;
