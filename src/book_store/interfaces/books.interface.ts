export interface Books {
    bk_id: number;
    title: string;
    author: string;
    price: number;
    is_available: boolean;
}

export type CreateBook = Omit<Books, "bk_id" | "is_available">;
export type UpdateBook = Pick<Books, "bk_id" | "is_available">;