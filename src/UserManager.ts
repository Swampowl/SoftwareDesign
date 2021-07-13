import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";
import { LoginCredentials } from "./LoginCredentials";
import FileHandler from "./FileHandler";

export class UserManager {


    private loginDB: LoginCredentials[] = [];

    constructor() {
        this.loginDB = <LoginCredentials[]>FileHandler.readObjectFile("loginDB.json");
        this.loginQuestion();
    }
    private async loginQuestion(): Promise<void> {
        let answer: string = await ConsoleHandling.showPossibilities(["<L> Login", "<R> Register", "<G> Continue as guest"], "Hello User! Do you warnt to register?\nYour Statement:");
        console.log(answer);
        switch (answer) {
            case "L":
                console.log("CASE L\n")
                await this.login();
                break;
            case "R":
                console.log("CASE R\n")
                await this.register();
                break;
            case "G":
                console.log("CASE G\n")
                await this.guestContinue();
                break;
            default:
                ConsoleHandling.printInput("please choose a siutable input.");
                break;
        }
        await this.loginQuestion();

    }

    private async login() {
        ConsoleHandling.printInput("Please enter your login credentials to identify.")
        let usernameLogin: string = await ConsoleHandling.showPossibilities(["Username"], "enter Username here: ");
        let passwordLogin: string = await ConsoleHandling.showPossibilities(["password"], "enter password here: ");
    }


    private async register() {
        ConsoleHandling.printInput("To register for Questionaire App,\nplease choose a username and password.\nkeep in mind that only numbers and letters are allowed")
        let usernameLogin: string = await ConsoleHandling.showPossibilities(["Username"], "enter Username here: ");
        let passwordLogin: string = await ConsoleHandling.showPossibilities(["password"], "enter password here: ");
        let userID: number = this.loginDB.length;
        let loginData: LoginCredentials = { userID: userID, username: usernameLogin, password: passwordLogin };
        this.loginDB.push(loginData);
        console.log(this.loginDB);
        console.log(JSON.stringify(this.loginDB));
        FileHandler.writeFile("loginDB.json", this.loginDB);
    }


    private async guestContinue() {
        new UnregUser();

    }
}