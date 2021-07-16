import ConsoleHandling from "./ConsoleHandling";
import { PossibleAnswer } from "./PossibleAnswer";

export class Question {

    public questionTitle: string;
    public possibleAnswers: PossibleAnswer[] = [];

    constructor(questionTitle: string, answerPossibilities: PossibleAnswer[]) {

        this.questionTitle = questionTitle;
        this.possibleAnswers = answerPossibilities;
        
      
    }

    public static stringsToPossibleAnswers(_possibilityStrings: string[]): PossibleAnswer[] {

        let answerPossibilities: PossibleAnswer[] = [];

        for (let index: number = 0; index < _possibilityStrings.length; index++) {
            answerPossibilities.push(new PossibleAnswer(_possibilityStrings[index], 0));
        }

        return answerPossibilities;
    }

    public static possibleAnswersToStrings(_answerPossibilities: PossibleAnswer[]): string[] {

        let possibilityStrings: string[] = [];

        for (let index: number = 0; index < _answerPossibilities.length; index++) {
            possibilityStrings.push(_answerPossibilities[index].answer);
        }

        return possibilityStrings;
    }

    public static dumbToSmart(dumb: Question): Question {

        let dumbAnswerPossibilities: PossibleAnswer[] = dumb.possibleAnswers;
        let smartAnswerPossibilities: PossibleAnswer[] = [];

        for (let index: number = 0; index < dumbAnswerPossibilities.length; index++) {
            let currentPossibility: PossibleAnswer = dumbAnswerPossibilities[index];

            smartAnswerPossibilities.push(new PossibleAnswer(currentPossibility.answer, currentPossibility.timesVoted));
        }

        return new Question(dumb.questionTitle, smartAnswerPossibilities);
    }

    public async answer(): Promise<void> {

        console.log(this.possibleAnswers);

        let possiblAnswersAsStrings: string[] = Question.possibleAnswersToStrings(this.possibleAnswers);
        let answer: string = await ConsoleHandling.showPossibilities(possiblAnswersAsStrings, this.questionTitle)

        let chosenAnswer: PossibleAnswer;

        try {

            chosenAnswer = this.possibleAnswers[+answer];
            chosenAnswer.timesVoted++;

        } catch {
            console.log("invvalid input! Please try again. Don't type in the full answer possibility, but rather the number next to it!")
        }
    }
}