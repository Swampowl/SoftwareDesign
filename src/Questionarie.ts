import { Question } from "./Question";
import { DateArea } from "./DateArea";


export class Questionarie {

    public questionarieID: number;
    public title: string;
    public dateArea: DateArea;
    public timesQuestionarieTaken: number;
    public author: string;
    public questions: Question[];

    constructor(
        questionarieID: number,
        title: string,
        questionarieQuestions: Question[],
        dateArea: DateArea,
        timesQuestionarieTaken: number,
        author: string
    ) {
        this.questionarieID = questionarieID;
        this.title = title;
        this.questions = questionarieQuestions;
        this.dateArea = dateArea;
        this.timesQuestionarieTaken = timesQuestionarieTaken;
        this.author = author;
    }

    public static dumbToSmart(dumb: Questionarie): Questionarie {

        let dumbQuestions: Question[] = dumb.questions;
        let smartQuestions: Question[] = [];

        for (let questionIndex: number = 0; questionIndex < dumbQuestions.length; questionIndex++) {
            smartQuestions.push(Question.dumbToSmart(dumbQuestions[questionIndex]));
        }

        let smartDateArea: DateArea = DateArea.dumbToSmart(dumb.dateArea);

        return new Questionarie(
            dumb.questionarieID,
            dumb.title,
            smartQuestions,
            smartDateArea,
            dumb.timesQuestionarieTaken,
            dumb.author);
    }

    public showCreatedQuestionaireStatistics(): Promise<string> {
        this.questions.forEach(function (question): void {
                console.log("---------> Question: " + question.questionTitle);
                question.showCreateQuestionStatistics();
            });
    }


    public async takePart(): Promise<void> {

        for (let questionIndex: number = 0; questionIndex < this.questions.length; questionIndex++) {

            let currentQuestion: Question = this.questions[questionIndex];

            await currentQuestion.answer();

        }

        console.log("You have answered all questions in this questionaire.\nReturning to main menue.");
        this.timesQuestionarieTaken++;
    }
}