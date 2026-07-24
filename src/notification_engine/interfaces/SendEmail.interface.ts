export interface SendEmailInterface {
    to: string;
    from: string ;
    subject: string ;
    description: string ;
}

// create another interface using parent 
export type InboxMsg  = Pick<SendEmailInterface, "to" | "description">;
// create another using Omit  interface using parent
export type sntMsg = Omit<SendEmailInterface, "subject">;