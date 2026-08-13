interface review{
    id:number;
    book_id: number;
    rating: number;
    review_text?: string;
}

export type createReview =  Omit<review,'id'>