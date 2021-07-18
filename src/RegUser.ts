import ConsoleHandling from "./ConsoleHandling";
import { Questionarie } from "./Questionarie";
import { UnregUser } from "./UnregUser";
import { Question } from "./Question";
import { UserManager } from "./UserManager";
import { DefaultDate } from "./DefaultDate";
import { PossibleAnswer } from "./PossibleAnswer";
import { LoginCredentials } from "./LoginCredentials";
import { DateArea } from "./DateArea";


export class RegUser extends UnregUser {

    private loginCredentials: LoginCredentials;
    private createdQuestionaireIDs: number[] = [];
    testName: string;
    minQuestions: number = 5;
    minAnswers: number = 2;
    constructor(loginCredentials: LoginCredentials, takenQuestionaireIDs?: number[], createQuestionarieIDs?: number[]) {
        super(["view statistics of own questionaries", "create a new questionarie"], takenQuestionaireIDs);

        this.loginCredentials = loginCredentials;

        if (createQuestionarieIDs) {
            this.createdQuestionaireIDs = createQuestionarieIDs;
        }
    }

    get LoginCredentials(): LoginCredentials {
        return this.loginCredentials;
    }

    override get UserName(): string {
        return this.loginCredentials.username;
    }

    public static makeExecutable(inanelyUser: RegUser): RegUser {
        let smartLoginCredentials: LoginCredentials = LoginCredentials.makeExecutable(inanelyUser.loginCredentials);

        let smartUser: RegUser = new RegUser(smartLoginCredentials, inanelyUser.takenQuestionaryIDs, inanelyUser.createdQuestionaireIDs);

        return smartUser;
    }

    public async getDate(startEndDefinition: string): Promise<DefaultDate> {
        let dateString: string = await ConsoleHandling.question(`Type in ${startEndDefinition} date in format: DD.MM.YYYY:  `);

        try {
            return new DefaultDate(dateString);

        } catch (error) {
            console.log(error.message);
            return await this.getDate(startEndDefinition);
        }
    }

    public async getTitle(): Promise<string> {
        let newQuestionarieTitle: string = await ConsoleHandling.question("Please enter a questionarie name:  ");
        if (this.isQuestNameAlreadyUsed(newQuestionarieTitle)) {
            console.log("Questionaire name already in use.");
            return await this.getTitle();
        }
        return newQuestionarieTitle;
    }

    public override async createQuestionarie(): Promise<void> {

        console.log("In the following steps you can create your own questionarie.");

        let newQuestionarieTitle: string = await this.getTitle();

        let dateArea: DateArea = await this.getDateArea();

        let questions: Question[] = await this.getQuestions();

        let questionaire: Questionarie = new Questionarie(UserManager.questionaireDB.length, newQuestionarieTitle, questions, dateArea, 0, this.UserName);

        UserManager.questionaireDB.push(questionaire);
        this.createdQuestionaireIDs.push(questionaire.questionarieID);

        ConsoleHandling.debugTwo("this user: createdDB:", this.createdQuestionaireIDs);
        ConsoleHandling.debugTwo("database Quest dDB:", UserManager.regUserDB);

        UserManager.writeAllDBs();

        return;
    }

    private async getDateArea(): Promise<DateArea> {
        let questionarieStart: DefaultDate = await this.getDate("start");


        let systemDate: Date = new Date();

        if (questionarieStart.isBefore(systemDate)) {
            console.log("please type in a date which is not in the past!");
            return await this.getDateArea();
        }

        let questionarieEnd: DefaultDate = await this.getDate("end");

        if (questionarieEnd.isBefore(questionarieStart)) {
            console.log("please type in a date which is after or at the start date!");
            return await this.getDateArea();
        }

        return new DateArea(questionarieStart, questionarieEnd);
    }

    private isQuestNameAlreadyUsed(newQuestionarieTitle: string): boolean {
        //Durch sinnvolle Abfragenlogik ersetzen
        return (newQuestionarieTitle == this.testName);
    }

    private async getQuestions(): Promise<Question[]> {
        let questions: Question[] = [];

        try {

            while (true) {
                let question: Question = await this.getQuestion(questions.length);
                questions.push(question);

                if (questions.length > this.minAnswers + 1) {
                    console.log("You have given enough answers! If you want to finish, write: done");
                }
            }

        } catch (error) {
            if (error.message == "done") {
                console.log("All Questions created!");
            } else {
                throw error;
            }
        }

        return questions;
    }

    private async getQuestion(amountQuestions: number): Promise<Question> {
        console.log("You will now create a question for your questionaire.");

        let question: string = await ConsoleHandling.question("Enter your question here:");

        if (question == "done") {


            if (amountQuestions < this.minQuestions) {

                console.log("you must have at least 5 possible questions!");
                return await this.getQuestion(amountQuestions);

            }

            throw new Error("done");

        }

        let answerArray: string[] = await this.getAnswers();

        let answersAsPossibleAnswers: PossibleAnswer[] = Question.stringsToPossibleAnswers(answerArray);
        return new Question(question, answersAsPossibleAnswers);
    }

    private async getAnswers(): Promise<string[]> {
        let answers: string[] = [];

        try {

            while (true) {
                let answer: string = await this.getAnswer(answers.length);
                answers.push(answer);
            }

        } catch (error) {
            if (error.message == "done") {
                console.log("All Answers given");
            } else {
                throw error;
            }
        }

        return answers;
    }

    private async getAnswer(amountAnswers: number): Promise<string> {
        let answer: string = await ConsoleHandling.question("Enter your next answer Possibility here: ");

        if (answer == "done") {
            if (amountAnswers < 2) {
                console.log("you must have at least 2 possible answers!");
                return await this.getAnswer(amountAnswers);
            }
            throw new Error("done");
        }


        if (answer.length < 1) {
            console.log("you must type in at least something!");
        }

        return answer;
    }

    public override async showTakenQuestionaireStatistics(): Promise<void> {
        console.log("Select one of your created questionaries!");
    }

    public override async showCreatedQuestionairesStatistics(): Promise<void> {
        console.log("You will now see a statistic of your created Questionaries!");

        console.log(this.createdQuestionaireIDs);

        this.createdQuestionaireIDs.forEach(function (questID): void {
            let currentQuestionaire: Questionarie = UserManager.questionaireDB[questID];
            console.log();
            console.log("asldkfjlsjf");

            console.log(`-> Questionaire-title: ${currentQuestionaire.title}`);
            currentQuestionaire.showCreatedQuestionaireStatistics();
            console.log();
        });
    }
}
