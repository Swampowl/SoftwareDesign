/* eslint-disable no-case-declarations */
import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";
import { LoginCredentials } from "./LoginCredentials";
import FileHandler from "./FileHandler";
import { RegUser } from "./RegUser";
import { DefaultDate } from "./DefaultDate";
import { Questionarie } from "./Questionarie";

export class UserManager {


    public static regUserDB: RegUser[] = [];
    public static questionaireDB: Questionarie[] = [];

    constructor() {

        UserManager.readAllDBs();

        this.loginQuestion();
    }


    public static questionarieDBToStringArray(): string[] {
        let strings: string[] = [];
        UserManager.questionaireDB.forEach(function (quest): void {
            strings.push(quest.title);
        });
        return strings;
    }

    public static readAllDBs(): void {
        UserManager.readRegUserDB();
        UserManager.readQuestDB();
    }
    public static writeAllDBs(): void {

        UserManager.writeRegUserDB();
        UserManager.writetoQuestDB();
    }

    public static writetoQuestDB(): void {
        FileHandler.writeFile("QuestionaireDB.json", UserManager.questionaireDB);
    }

    public static writeRegUserDB(): void {
        console.log("will write regUserDB: ", UserManager.regUserDB);
        FileHandler.writeFile("regUserDB.json", UserManager.regUserDB);
    }

    private static readRegUserDB(): void {

        UserManager.regUserDB = <RegUser[]>FileHandler.readObjectFile("regUserDB.json");

        for (let index: number = 0; index < UserManager.regUserDB.length; index++) {
            let dumbUser: RegUser = UserManager.regUserDB[index];

            let smartUser: RegUser = RegUser.makeExecutable(dumbUser);
            UserManager.regUserDB[index] = smartUser;

        }

    }

    private static readQuestDB(): void {
        let dumbQuestionaire: Questionarie[] = <Questionarie[]>FileHandler.readObjectFile("QuestionaireDB.json");
        for (let index: number = 0; index < dumbQuestionaire.length; index++) {
            UserManager.questionaireDB.push(Questionarie.makeExecutable(dumbQuestionaire[index]));
        }
    }

    public async getDate(): Promise<void> {
        let dateString: string = await ConsoleHandling.question("please type in the date in the following format: DD.MM.YYYY:  ");
        new DefaultDate(dateString);
    }

    private async loginQuestion(): Promise<void> {
        console.log('\x1b[32m', `Welcome to Questionaire App!`, '\x1b[0m', "\n What do you want to do?");
        let answer: string = await ConsoleHandling.showPossibilities(["<L> Login", "<R> Register", "<G> Continue as guest"], "Your Statement:");

        switch (answer.toUpperCase()) {
            case "L":
                console.clear();
                let regUser: RegUser = await this.getRegUser();
                regUser.startMenue();
                return;
            case "R":
                console.clear();
                await this.register();
                break;
            case "G":

                console.clear();
                console.log('\x1b[33m', "You now continue as unregistrated User.", '\x1b[0m');
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
        ConsoleHandling.printInput("Please enter your login credentials to identify.");
        let usernameLogin: string = await ConsoleHandling.question("username: ");
        let passwordLogin: string = await ConsoleHandling.question("password: ");

        let newLoginCredentials: LoginCredentials = new LoginCredentials(UserManager.regUserDB.length, usernameLogin, passwordLogin);

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
        for (let index: number = 0; index < UserManager.regUserDB.length; index++) {
            let currentRegUser: RegUser = UserManager.regUserDB[index];

            if (inputLoginCredentials.equalsRegUser(currentRegUser)) {
                console.clear();
                console.log("Login successful.");
                console.log('\x1b[32m', `You are now logged in as ${currentRegUser.UserName}!`, '\x1b[0m');
                return currentRegUser;
            }
        }

        console.log('\x1b[31m', "\nUsername and password do not match", '\x1b[0m', "\nreturning to main menue");
        throw new Error("UsernamePasswordMissmatch");
    }

    public isRegisterUsernameTaken(usernameRegister: string): boolean {

        for (let regUser of UserManager.regUserDB) {

            if (regUser.UserName == usernameRegister) {

                return true;
            }
        }
        return false;
    }

    private async register(): Promise<void> {

        //console.clear();
        ConsoleHandling.printInput("You can now register to Questionaire App.\nPlease choose a username and password.\nKeep in mind that only numbers and letters are allowed.");
        let usernameRegister: string = await ConsoleHandling.question("enter username here:");

        if (this.isRegisterUsernameTaken(usernameRegister)) {
            //console.clear();
            console.log('\x1b[31m', "Username already taken.", '\x1b[0m');
            return;
        }

        let passwordLogin: string = await ConsoleHandling.question("enter password here:");

        let userID: number = UserManager.regUserDB.length;

        let loginData: LoginCredentials = new LoginCredentials(userID, usernameRegister, passwordLogin);
        console.clear();

        console.log('\x1b[36m', "User " + usernameRegister + " was created. Returning to main menue!", '\x1b[0m');

        let newRegUser: RegUser = new RegUser(loginData);

        UserManager.regUserDB.push(newRegUser);

        FileHandler.writeFile("regUserDB.json", UserManager.regUserDB);

    }
}
