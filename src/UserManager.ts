import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";
import { LoginCredentials } from "./LoginCredentials";
import FileHandler from "./FileHandler";
import { PassThrough } from "stream";
import { RegUser } from "./RegUser";
import { DefaultDate } from "./DefaultDate";
import { Questionarie } from "./Questionarie";

export class UserManager {

    private loginDB: LoginCredentials[] = [];
    public static questionaireDB: Questionarie[] = [];

    constructor() {

        this.readQuests();

        this.loginDB = <LoginCredentials[]>FileHandler.readObjectFile("loginDB.json");
        this.loginQuestion();
    }

    private readQuests(): void {
        let dumbQuestionaire: Questionarie[] = <Questionarie[]>FileHandler.readObjectFile("QuestionaireDB.json");
        for (let index: number = 0; index < dumbQuestionaire.length; index++) {
            UserManager.questionaireDB.push(Questionarie.dumbToSmart(dumbQuestionaire[index]));
        }
    }

    public async getDate() {
        let dateString: string = await ConsoleHandling.question("please type in the date in the following format: DD.MM.YYYY:  ");
        new DefaultDate(dateString);
    }

    private async loginQuestion(): Promise<void> {
        console.log("Welcome to questionaire main menue.")
        let answer: string = await ConsoleHandling.showPossibilities(["<L> Login", "<R> Register", "<G> Continue as guest"], "Your Statement:");
        console.log(answer);

        switch (answer.toUpperCase()) {
            case "L":

                let regUser: RegUser = await this.getRegUser();

                return;
            case "R":
                console.log("CASE R\n")
                await this.register();
                break;
            case "G":
                console.clear()
                console.log('\x1b[33m', "You now continue as unregistrated User.", '\x1b[0m')
                new UnregUser();
                return;
            default:
                //console.clear();
                ConsoleHandling.printInput('\x1b[36mplease choose a siutable input.\x1b[0m');
                break;
        }

        await this.loginQuestion();

    }

    private async getRegUser(): Promise<RegUser> {
        //console.clear();
        ConsoleHandling.printInput("Please enter your login credentials to identify.")
        let usernameLogin: string = await ConsoleHandling.question("username: ");
        let passwordLogin: string = await ConsoleHandling.question("password: ");


        if (this.isLoginCredentialsCorrect(usernameLogin, passwordLogin)) {

            console.log("Username and Password match.");
            return new RegUser(usernameLogin);

        } else {
            return await this.getRegUser();
        }
    }



    public isLoginCredentialsCorrect(usernameLogin: string, passwordLogin: string): boolean {

        let inputLoginCredentials: LoginCredentials = new LoginCredentials(this.loginDB.length, usernameLogin, passwordLogin);

        for (let index = 0; index <= this.loginDB.length - 1; index++) {

            if (inputLoginCredentials.equals(this.loginDB[index])) {
                //console.clear();
                console.log("Login successful.");
                console.log('\x1b[32m', "You are now logged in as registrated User!", '\x1b[0m')
                return true;
            }
        }

        //console.clear();
        console.log('\x1b[31m', "\nUsername and password do not match", '\x1b[0m', "\nreturning to main menue");
        return false;

    }

    public isRegisterUsernameTaken(usernameRegister: string): boolean {

        for (let loginCredential of this.loginDB) {

            if (loginCredential.username == usernameRegister) {

                return true;
            }
        }
        return false;
    }

    private async register(): Promise<void> {

        //console.clear();
        ConsoleHandling.printInput("To register for Questionaire App\nplease choose a username and password.\nkeep in mind that only numbers and letters are allowed.")
        let usernameRegister: string = await ConsoleHandling.showPossibilities(["enter username here:"], "");

        if (this.isRegisterUsernameTaken(usernameRegister)) {
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
        ////console.clear();
        //console.clear();
        console.log('\x1b[36m', "User " + usernameRegister + " was created. Returning to main menue.", '\x1b[0m');
    }

    /* private async createQuestionaire(){
         //console.clear();
         ConsoleHandling.printInput("Please name your Questionaire!")
         let questionaireTitle: string = await ConsoleHandling.showPossibilities(["Enter title here:"], "");
         ConsoleHandling.printInput("Please name your Questionaire!")
         let questionaireID: number = this.loginDB.length;
        
 
         // Auf Typescript gültigkeit überprüfen, eventull via tslint3
         let loginData: LoginCredentials = { userID: userID, username: usernameLogin, password: passwordLogin };
         this.loginDB.push(loginData);
         // console.log(this.loginDB);
         // console.log(JSON.stringify(this.loginDB));
         FileHandler.writeFile("loginDB.json", this.loginDB);
         //console.clear();
         console.log("User was created. Returning to main menue.");
     }
 */
}
