import ConsoleHandling from "./ConsoleHandling";
import { Questionarie } from "./Questionarie";
import { UnregUser } from "./UnregUser";
import { Question } from "./Question";
import { UserManager } from "./UserManager";
import { DefaultDate } from "./DefaultDate";
import FileHandler from "./FileHandler";

export class RegUser extends UnregUser {

    private testName: string = "lol";

    constructor() {
        super(["<4> view statistics of own questionaries", "<5> create a new questionarie"]);
        // console.log(this.initalStartOptions);
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

        let questionaire: Questionarie = new Questionarie(UserManager.questionaireDB.length, newQuestionarieTitle, questions, questionarieStart, questionarieEnd, 0);
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

        return new Question(question, answerArray);
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

        return answer;
    }


    /*     if (this.createQuestionarie(newQuestionarieTitle)) {
             //console.clear();
             console.log('\x1b[31m', "Username already taken.", '\x1b[0m');
             return;
         }
 
         let passwordLogin: string = await ConsoleHandling.showPossibilities(["enter password here:"], "");
 
 
         let userID: number = this.loginDB.length;
 
         let loginData: LoginCredentials = new LoginCredentials(userID, usernameRegister, passwordLogin);
         this.loginDB.push(loginData);
         // console.log(this.loginDB);
         // console.log(JSON.stringify(this.loginDB));
         FileHandler.writeFile("loginDB.json", this.loginDB);
      */   ////console.clear();

    public override async showOwnStatistics(): Promise<void> {
        console.log("Select one of your created questionaries!");
    }
}
