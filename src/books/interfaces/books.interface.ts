export interface Books {
    bk_id: number;
    title: string;
    subtitle: string;
    description: string;
    cover_photo: string | null;
    price: number;
    publication_date: Date;
    pages: number;
    language: string;
}

export type CreateBook = Omit<Books, "bk_id">;
export type UpdateBook = Pick<Books, "bk_id" >;