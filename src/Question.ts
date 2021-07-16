export class Question {

    public questionTitle: string;
    public answerPossibilities: string[];
    public answer: string;


    constructor(question: string, answerPossibilities: string[]) {

        this.questionTitle = question;
        this.answerPossibilities = answerPossibilities;
    }

}