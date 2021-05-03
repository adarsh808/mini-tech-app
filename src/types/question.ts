import{ Author } from "./author"

export interface Question {
    question_id: number,
    link: string,
    title: String,
    body: string,
    owner: Author,
    creation_date: number,
    showDetails: boolean,
    displayDate: string;
}
