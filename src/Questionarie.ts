import { Question } from "./Question";
import { DefaultDate } from "./DefaultDate";
import ConsoleHandling from "./ConsoleHandling";
import { RegUser } from "./RegUser";
import { PossibleAnswer } from "./PossibleAnswer";

export class Questionarie {

    public questionarieID: number;
    public title: string;
    public validStart: DefaultDate;
    public validEnd: DefaultDate;
    public timesQuestionarieTaken: number;
    public author: string;
    public questions: Question[];

    constructor(
        questionarieID: number,
        title: string,
        questionarieQuestions: Question[],
        validStart: DefaultDate,
        validEnd: DefaultDate,
        timesQuestionarieTaken: number,
        author: string
    ) {
        this.questionarieID = questionarieID
        this.title = title
        this.questions = questionarieQuestions
        this.validStart = validStart
        this.validEnd = validEnd
        this.timesQuestionarieTaken = timesQuestionarieTaken
        this.author = author;
    }

    public static dumbToSmart(dumb: Questionarie): Questionarie {

        let dumbQuestions: Question[] = dumb.questions;
        let smartQuestions: Question[] = [];

        for (let questionIndex: number = 0; questionIndex < dumbQuestions.length; questionIndex++) {
            smartQuestions.push(Question.dumbToSmart(dumbQuestions[questionIndex]));
        }

        return new Questionarie(
            dumb.questionarieID,
            dumb.title,
            smartQuestions,
            dumb.validEnd,
            dumb.validStart,
            dumb.timesQuestionarieTaken,
            dumb.author);
    }

    public async takePart(): Promise<void> {

        for (let questionIndex: number = 0; questionIndex < this.questions.length; questionIndex++) {

            let currentQuestion: Question = this.questions[questionIndex];

            await currentQuestion.answer();

        }

        console.log("You have answered all questions in this questionaire.\nReturning to main menue.")
        this.timesQuestionarieTaken++;
        console.log(this.timesQuestionarieTaken);
    }
}