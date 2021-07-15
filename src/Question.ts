export class Question {

    public questionTitle: string;
    public answerPossibilities: [];
    public answerQuestion: string;


    constructor(questionTitle: string, answerPossibilities: [], answerQuestion: string) {
        
        this.questionTitle = questionTitle
        this.answerPossibilities = answerPossibilities
        this.answerQuestion = answerQuestion
    }

}