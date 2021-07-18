import ConsoleHandling from "./ConsoleHandling";
import { PossibleAnswer } from "./PossibleAnswer";

export class Question {


    public questionTitle: string;
    public possibleAnswers: PossibleAnswer[] = [];

    constructor(questionTitle: string, answerPossibilities: PossibleAnswer[]) {

        this.questionTitle = questionTitle;
        this.possibleAnswers = answerPossibilities;
    }

    public static stringsToPossibleAnswers(possibilityStrings: string[]): PossibleAnswer[] {

        let answerPossibilities: PossibleAnswer[] = [];

        for (let index: number = 0; index < possibilityStrings.length; index++) {
            answerPossibilities.push(new PossibleAnswer(possibilityStrings[index], 0));
        }

        return answerPossibilities;
    }

    public static possibleAnswersToStrings(answerPossibilities: PossibleAnswer[]): string[] {

        let possibilityStrings: string[] = [];

        for (let index: number = 0; index < answerPossibilities.length; index++) {
            possibilityStrings.push(answerPossibilities[index].answer);
        }

        return possibilityStrings;
    }

    public static makeExecutable(inanely: Question): Question {

        let inanelyAnswerPossibilities: PossibleAnswer[] = inanely.possibleAnswers;
        let smartAnswerPossibilities: PossibleAnswer[] = [];

        for (let index: number = 0; index < inanelyAnswerPossibilities.length; index++) {
            let currentPossibility: PossibleAnswer = inanelyAnswerPossibilities[index];

            smartAnswerPossibilities.push(new PossibleAnswer(currentPossibility.answer, currentPossibility.timesVoted));
        }

        return new Question(inanely.questionTitle, smartAnswerPossibilities);
    }

    public showCreateQuestionStatistics(): void {
        let index: number = 0;
        this.possibleAnswers.forEach(function (answer): void {
                console.log(`------------------> answer index:${index} || answer text ${answer.answer} || chosen times:${answer.timesVoted}`);
                index++;
            });
    }

    public async answer(): Promise<void> {
        let possiblAnswersAsStrings: string[] = Question.possibleAnswersToStrings(this.possibleAnswers);


        let answer: number = await ConsoleHandling.showIndexPossibilities(possiblAnswersAsStrings, this.questionTitle);

        let chosenAnswer: PossibleAnswer = this.possibleAnswers[answer];

        chosenAnswer.timesVoted++;
    }
}