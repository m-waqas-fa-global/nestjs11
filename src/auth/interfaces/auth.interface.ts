export interface SignUpBody {
    name: string
    email: string
    password: string,
    role_id: number;
    permission_ids: number[]
}

export type Login = Omit<SignUpBody, "name" | "role_id" | "permission_ids">;
