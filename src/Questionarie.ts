import { Question } from "./Question";
import { DefaultDate } from "./DefaultDate";
export class Questionarie {

    public questionarieID: number;
    public title: string;
    public questionarieQuestions: [];
    public validStart: DefaultDate;
    public validEnd: DefaultDate;
    public timesQuestionarieTaken: number;


  constructor(
    questionarieID: number, 
    title: string, 
    questionarieQuestions: [], 
    validStart: DefaultDate, 
    validEnd: DefaultDate, 
    timesQuestionarieTaken: number
) {
    this.questionarieID = questionarieID
    this.title = title
    this.questionarieQuestions = questionarieQuestions
    this.validStart = validStart
    this.validEnd = validEnd
    this.timesQuestionarieTaken = timesQuestionarieTaken
  }
  


}