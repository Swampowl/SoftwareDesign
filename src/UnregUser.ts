import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import { UserManager } from "./UserManager";


export class UnregUser {

    public initalStartOptions: string[] = ["<1> show ten questionaries", "<2> search questionarie by name", "<3> show amount of taken questionaries and their names"];
    public isRegistratedUser: boolean;

    constructor(additionalStartoptions?: string[]) {

        if (additionalStartoptions) {
            this.initalStartOptions = this.initalStartOptions.concat(additionalStartoptions);
            //   console.log(this.initalStartOptions);
            //  console.log(additionalStartoptions);
        }


        this.isRegistratedUser = (Object.getPrototypeOf(this) != UnregUser.prototype);

        this.startMenue();
    }


    private async startMenue() {

        ConsoleHandling.printInput("Please choose a activity:");
        let answer: string = await ConsoleHandling.showPossibilities(this.initalStartOptions, "Your Statement:");


        if (!this.isRegistratedUser) {
            if (+answer > 3) {
                ConsoleHandling.printInput("Your input is not siutable!");
                await this.startMenue()
                return;
            }
        }

        switch (answer) {
            case "1":
                //console.clear();
                console.log("CASE 1\n");
                await this.showTenQuestionaires();
                break;

            case "2":
                //console.clear();
                console.log("CASE 2\n");
                break;

            case "3":
                //console.clear();
                console.log("CASE 3\n");
                break;

            case "4":
                //console.clear();
                await this.showOwnStatistics();
                break;

            case "5":
                await this.createQuestionarie();
                break;

            default:
                // ConsoleHandling.printInput("please choose a siutable input.")
                break;
        }
        await this.startMenue();
    }
    private async showTenQuestionaires() {
        for (let ten: number = 0; ten < 10; ten++) {
            console.log(UserManager.questionaireDB[ten]);


        }
    }

    public async createQuestionarie(): Promise<void> {

    }

    public async showOwnStatistics(): Promise<void> {
    }
}

