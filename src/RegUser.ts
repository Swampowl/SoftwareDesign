import ConsoleHandling from "./ConsoleHandling";
import { Questionarie } from "./Questionarie";
import { UnregUser } from "./UnregUser";
import { Question } from "./Question";
import { UserManager } from "./UserManager";
import { DefaultDate } from "./DefaultDate";
import FileHandler from "./FileHandler";
import { PossibleAnswer } from "./PossibleAnswer";
import { LoginCredentials } from "./LoginCredentials";


export class RegUser extends UnregUser {

    private testName: string = "lol";
    private loginCredentials: LoginCredentials;

    constructor(loginCredentials: LoginCredentials) {

        super(["view statistics of own questionaries", "create a new questionarie"]);
        this.loginCredentials = loginCredentials;
    }

    get LoginCredentials(): LoginCredentials {
        return this.loginCredentials;
    }

    override get UserName(): string {
        return this.loginCredentials.username;
    }

    public static dumbToSmart(dumbUser: RegUser): RegUser {
        let smartLoginCredentials: LoginCredentials = LoginCredentials.dumbToSmart(dumbUser.loginCredentials);

        let smartUser: RegUser = new RegUser(smartLoginCredentials);
        return smartUser;
    }

    public async getDate(_startEndDefinition: string): Promise<DefaultDate> {
        let dateString: string = await ConsoleHandling.question(`Type in ${_startEndDefinition} date in format: DD.MM.YYYY:  `);

        try {
            return new DefaultDate(dateString);

        } catch (error) {
            console.log(error.message);
            return await this.getDate(_startEndDefinition);
        }
    }

    public async getTitle(): Promise<string> {
        let newQuestionarieTitle: string = await ConsoleHandling.question("Please enter a questionarie name:  ");
        if (this.isQuestNameAlreadyUsed(newQuestionarieTitle)) {
            console.log("Questionaire name already in use.")
            return await this.getTitle();
        }
        return newQuestionarieTitle;
    }

    public override async createQuestionarie(): Promise<void> {

        console.log("In the following steps you can create your own questionarie.")

        let newQuestionarieTitle: string = await this.getTitle();

        let questionarieStart: DefaultDate = await this.getDate("start");

        let questionarieEnd: DefaultDate = await this.getDate("end");

        let questions: Question[] = await this.getQuestions();

        let questionaire: Questionarie = new Questionarie(UserManager.questionaireDB.length + 1, newQuestionarieTitle, questions, questionarieStart, questionarieEnd, 0, this.UserName);
        UserManager.questionaireDB.push(questionaire);
        FileHandler.writeFile("QuestionaireDB.json", UserManager.questionaireDB);

        return;
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

            //KEINE MAGIC NUMBERS! FLO SCHREIB SIE ALS OBJEKTATTRIBUT ODER KLASSENATTRIBUT MIT VERNÜNFTIGEM NAMEN
            if (amountQuestions < 5) {

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
        let answer: string = await ConsoleHandling.question("Enter your next answerPossibility here (if you have enough answers, type `done`) : ");

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

    public override async showOwnStatistics(): Promise<void> {
        console.log("Select one of your created questionaries!");
    }
}
