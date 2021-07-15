import ConsoleHandling from "./ConsoleHandling";
import { Questionarie } from "./Questionarie";
import { UnregUser } from "./UnregUser";
import { Question } from "./Question";

export class RegUser extends UnregUser {

    constructor() {
        super(["<4> view statistics of own questionaries", "<5> create a new questionarie"]);
        // console.log(this.initalStartOptions);
    }

    public override async createQuestionarie(): Promise<void> {
        console.log("In the following steps you can create your own questionarie.");
        let newQuestionarieName: string = await ConsoleHandling.printInput("Please enter a questionarie name:  ");
        let questionaire: Questionarie = new Questionarie();
        questionaire.title = newQuestionarieName;
        let newValidStart: Date = await ConsoleHandling.printInput("Please enter a start date for your questionaire:");
        questionaire.validStart = newValidStart;
        let newValidEnd: Date = await ConsoleHandling.printInput("Please enter a end date for your questionaire:");
        return;

    }

    /*     if (this.createQuestionarie(newQuestionarieName)) {
             console.clear();
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
      */   //console.clear();

    public override async showOwnStatistics(): Promise<void> {
        console.log("Select one of your created questionaries!");
    }
}
