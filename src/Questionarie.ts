import { Question } from "./Question";
export class Questionarie extends Question {

    public questionarieID: number;
    public title: string;
    public questionarieQuestions: [];
    public sumOfQuestions: number;
    public timesQuestionarieTaken: number;
    public validStart: Date;
    public validEnd: Date;


}