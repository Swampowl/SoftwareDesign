import ConsoleHandling from "./ConsoleHandling";
import { Questionarie } from "./Questionarie";
import { UnregUser } from "./UnregUser";
import { Question } from "./Question";
import { UserManager } from "./UserManager";
import { DefaultDate } from "./DefaultDate";

export class RegUser extends UnregUser {

    constructor() {
        super(["<4> view statistics of own questionaries", "<5> create a new questionarie"]);
        // console.log(this.initalStartOptions);
    }

    public async getDate(_startEndDefinition: string): Promise<DefaultDate> {
        let dateString: string = await ConsoleHandling.question(`Type in ${_startEndDefinition} date in format: DD.MM.YYYY:  `);
        return new DefaultDate(dateString);
    }

    public override async createQuestionarie(): Promise<void> {

        console.log("In the following steps you can create your own questionarie.")
        let newQuestionarieTitle: string = await ConsoleHandling.question("Please enter a questionarie name:  ");
        let questionarieStart: DefaultDate = await this.getDate("start");
        let questionarieEnd: DefaultDate = await this.getDate("end");
this.createQuestion();



        // ---> da weiter schreiben



        let questionaire: Questionarie = new Questionarie(null, newQuestionarieTitle, null, questionarieStart, questionarieEnd, 0);

        return;

    }
    public async createQuestion(): Promise<void> {
        console.log("You will now create a question for your questionaire.");
        let questionCounter: number = 0;
        let answerCount: number = 0;
        let answerArray: string[];
        let question: string = await ConsoleHandling.question("Enter your question here:");

        if (answerCount < 2) {
            answerArray[answerCount] = await ConsoleHandling.question("Enter your answer possibility here:");
            answerCount++;
        }
        else {
            let anotherQuestion: string = await ConsoleHandling.question("This question already has two or more possible answers\n<1> add another answer\n<2>finish this questionn\nWhat do you want to do?:");
            switch (anotherQuestion) {
                case "1":
                    console.log("new answer!!!!")
                    break;

                case "2":
                    console.log("finish this question.");
                    break;
default:
    ConsoleHandling.printInput("please choose a siutable input.");
    break;

            }

        }

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
