import { Question} from  './question'

export interface QuestionList {
    has_more: boolean,
    items:Array<Question>
}
