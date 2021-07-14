import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import { RegUser } from "./RegUser";
import { UserManager } from "./UserManager";


export class UnregUser {

    public initalStartOptions: string[] = ["<1> show ten questionaries", "<2> search questionarie by name", "<3> show amount of taken questionaries and their names"];
    public isInstanceOfRegUser: boolean;

    constructor(additionalStartoptions?: string[]) {
        if (additionalStartoptions) {
            this.initalStartOptions = this.initalStartOptions.concat(additionalStartoptions);
            //   console.log(this.initalStartOptions);
            //  console.log(additionalStartoptions);
        }
        this.isInstanceOfRegUser = (this instanceof RegUser);
        this.startMenue();
    }


    private async startMenue(): Promise<void> {

        ConsoleHandling.printInput("Please choose a activity:");
        let answer: string = await ConsoleHandling.showPossibilities(this.initalStartOptions, "Your Statement:");

        if (!this.isInstanceOfRegUser) {
            if (answer == "4" || "5") {
                ConsoleHandling.printInput("please choose a siutable input.")
            }
        }

        switch (answer) {
            case "1":
                console.clear();
                console.log("CASE 1\n")
                return;

            case "2":
                console.clear();
                console.log("CASE 2\n")
                return;

            case "3":
                console.clear();
                console.log("CASE 3\n")
                break;

            case "4":
                console.clear();
                console.log("CASE 4\n")
                return;

            case "5":
                console.clear();
                console.log("CASE 5\n")
                return;

            default:
                ConsoleHandling.printInput("please choose a siutable input.")
                break;
        }
        await this.startMenue();
        ;
    }
}

