import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";
import { LoginCredentials } from "./LoginCredentials";
import FileHandler from "./FileHandler";
import { PassThrough } from "stream";
import { RegUser } from "./RegUser";

export class UserManager {


    private loginDB: LoginCredentials[] = [];

    constructor() {
        this.loginDB = <LoginCredentials[]>FileHandler.readObjectFile("loginDB.json");
        this.loginQuestion();
    }

    private async loginQuestion(): Promise<void> {
        console.log("Welcome to questionaire main menue.")
        let answer: string = await ConsoleHandling.showPossibilities(["<L> Login", "<R> Register", "<G> Continue as guest"], "Your Statement:");
        console.log(answer);

        switch (answer.toUpperCase()) {
            case "L":
                console.log("CASE L\n")
                if (await this.isLoginCorrect()) {
                    console.log("You are now logged in as registrated User.")
                    new RegUser();
                    return;
                }

                break;
            case "R":
                console.log("CASE R\n")
                await this.register();
                break;
            case "G":
                console.log("CASE G\n")
                new UnregUser();
                return;
            default:
                ConsoleHandling.printInput("please choose a siutable input.");
                break;
        }

        await this.loginQuestion();

    }

    private async isLoginCorrect(): Promise<boolean> {
        console.clear();
        ConsoleHandling.printInput("Please enter your login credentials to identify.")
        let usernameLogin: string = await ConsoleHandling.showPossibilities(["username:"], "");
        let passwordLogin: string = await ConsoleHandling.showPossibilities(["password:"], "");
        if (this.isLoginCredentialsCorrect(usernameLogin, passwordLogin)) {
            console.log("Username and Password match.");
            return true;
        }

        return false;
    }



    public isLoginCredentialsCorrect(usernameLogin, passwordLogin): boolean {

        let inputLoginCredentials: LoginCredentials = new LoginCredentials(this.loginDB.length, usernameLogin, passwordLogin);
        for (let index = 0; index <= this.loginDB.length - 1; index++) {

            if (inputLoginCredentials.equals(this.loginDB[index])) {
                console.clear();
                console.log("Login successful.")
                return true;
            }


        }
        console.clear();
        console.log("password / username missmatch. cancel");
        return false;

    }

    public isRegisterUsernameTaken(usernameRegister: string): boolean {

        for (let loginCredential of this.loginDB) {

            if (loginCredential.username == usernameRegister) {

                return true;
            };
        }
        return false;

    }


    private async register(): Promise<void> {
        console.clear();
        ConsoleHandling.printInput("To register for Questionaire App\nplease choose a username and password.\nkeep in mind that only numbers and letters are allowed.")
        let usernameRegister: string = await ConsoleHandling.showPossibilities(["enter username here:"], "");
        if (this.isRegisterUsernameTaken(usernameRegister)) {
            console.clear();
            console.log("Username already taken.");
            return;

        }


        let passwordLogin: string = await ConsoleHandling.showPossibilities(["enter password here:"], "");



        for (let index = 0; index <= this.loginDB.length - 1; index++) {
            //       console.log(this.loginDB[index].username);

        }
        let userID: number = this.loginDB.length;


        // Auf Typescript gültigkeit überprüfen, eventull via tslint3
        let loginData: LoginCredentials = new LoginCredentials(this.loginDB.length, usernameRegister, passwordLogin);
        this.loginDB.push(loginData);
        // console.log(this.loginDB);
        // console.log(JSON.stringify(this.loginDB));
        FileHandler.writeFile("loginDB.json", this.loginDB);
        //console.clear();
        console.clear();
        console.log("User " +usernameRegister +  " was created. Returning to main menue.");
    }

    /* private async createQuestionaire(){
         console.clear();
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
         console.clear();
         console.log("User was created. Returning to main menue.");
     }
 */

    private async guestContinue(): Promise<void> {
        return;
        console.clear();
        console.log("Welcome unregistrated user. Please choose an activity.")
        let answer: string = await ConsoleHandling.showPossibilities(["<1> create a questionaire", "<2> seach questionaire by name", "<3> show questionaires", "<4> view statistics of own qurstioaires."], "What do you want to do? \nYour Statement:");
        console.log(answer);
        switch (answer) {
            case "1":
                console.log("CASE 1\n")
                await this.guestContinue();
                break;
            case "2":
                console.log("CASE 2\n")
                await this.guestContinue();
                break;
            case "3":
                console.log("CASE G\n")
                await this.guestContinue();
                break;
            case "4":
                console.log("CASE 4\n")
                await this.guestContinue();
                break;
            default:
                ConsoleHandling.printInput("please choose a siutable input.");
                break;
        }
        await this.guestContinue();

    }




}
