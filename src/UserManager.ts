import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";
import { LoginCredentials } from "./LoginCredentials";
import FileHandler from "./FileHandler";
import { PassThrough } from "stream";
import { RegUser } from "./RegUser";
import { DefaultDate } from "./DefaultDate";
import { Questionarie } from "./Questionarie";

export class UserManager {

    private regUserDB: RegUser[] = [];
    public static questionaireDB: Questionarie[] = [];

    constructor() {

        this.readQuests();
        this.readRegUserDB();

        this.loginQuestion();
    }

    private readRegUserDB(): void {

        this.regUserDB = <RegUser[]>FileHandler.readObjectFile("regUserDB.json");

        for (let index: number = 0; index < this.regUserDB.length; index++) {
            let dumbUser: RegUser = this.regUserDB[index];
            let smartUser: RegUser = RegUser.dumbToSmart(dumbUser);
            this.regUserDB[index] = smartUser;
        }

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
                regUser.startMenue();
                return;
            case "R":
                console.log("CASE R\n")
                await this.register();
                break;
            case "G":
                console.clear()
                console.log('\x1b[33m', "You now continue as unregistrated User.", '\x1b[0m')
                let unregUser: UnregUser = new UnregUser();
                unregUser.startMenue();
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

        let newLoginCredentials: LoginCredentials = new LoginCredentials(this.regUserDB.length, usernameLogin, passwordLogin)

        try {
            return this.getRegUserByLoginCredentials(newLoginCredentials);

        } catch (error) {
            if (error.message == "UsernamePasswordMissmatch") {
                console.log("Login Data missmatch! Try again");
                return await this.getRegUser();
            }

            throw error;
        }
    }



    public getRegUserByLoginCredentials(inputLoginCredentials: LoginCredentials): RegUser {
        console.log(this.regUserDB);
        for (let index = 0; index < this.regUserDB.length; index++) {
            let currentRegUser: RegUser = this.regUserDB[index];
            console.log(currentRegUser);


            if (inputLoginCredentials.equalsRegUser(currentRegUser)) {
                console.log("Login successful.");
                console.log('\x1b[32m', "You are now logged in as registrated User!", '\x1b[0m');
                return currentRegUser;
            }
        }

        console.log('\x1b[31m', "\nUsername and password do not match", '\x1b[0m', "\nreturning to main menue");
        throw new Error("UsernamePasswordMissmatch");
    }

    public isRegisterUsernameTaken(usernameRegister: string): boolean {

        for (let regUser of this.regUserDB) {

            if (regUser.UserName == usernameRegister) {

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

        let userID: number = this.regUserDB.length;

        let loginData: LoginCredentials = new LoginCredentials(userID, usernameRegister, passwordLogin);

        console.log('\x1b[36m', "User " + usernameRegister + " was created. You are now successfully logged in!", '\x1b[0m');

        let newRegUser: RegUser = new RegUser(loginData);

        this.regUserDB.push(newRegUser);

        FileHandler.writeFile("regUserDB.json", this.regUserDB);

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
