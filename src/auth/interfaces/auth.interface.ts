export interface SignUpInterface {
    name:string
    email:string
    password:string
}

export type Login = Omit<SignUpInterface,"name">;