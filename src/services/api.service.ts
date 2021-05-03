import { AxiosResponse } from 'axios';
import { QuestionList } from '../types/questionList';
import axios from './http-client.service';

export class ApiService{
    private baseUrl: string;
    constructor() {
        this.baseUrl = "https://api.stackexchange.com/2.2/";
    }
    getQuestionList(pageNumber:number):Promise<AxiosResponse<QuestionList>> {
        return axios(
          `${this.baseUrl}questions?order=desc&sort=creation&site=meta.stackoverflow&filter=withbody&page=${pageNumber}`
        );
    }
    
 
}
