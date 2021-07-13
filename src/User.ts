import ConsoleHandling from "./ConsoleHandling";


export class User {

    constructor() {
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
                await this.guestResume();
                break;
            default:
                ConsoleHandling.printInput("please choose a siutable input.");
                break;
        }
        //  await this.loginQuestion();

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
    }
    private async guestResume() {
        ConsoleHandling.printInput("You continued as unregistrated User.\nPlease choose a activity:")
        let answer: string = await ConsoleHandling.showPossibilities(["1", "2", "3"], "Your Statement:");
    }

}