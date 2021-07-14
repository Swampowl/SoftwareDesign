import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import { UserManager } from "./UserManager";


export class UnregUser {

    public initalStartOptions: string[] = ["<1> show ten questionaries", "<2> search questionarie by name", "<3> show amount of taken questionaries and their names"];


    constructor(additionalStartoptions?: string[]) {
        if (additionalStartoptions) {
            this.initalStartOptions = this.initalStartOptions.concat(additionalStartoptions);
            //   console.log(this.initalStartOptions);
            //  console.log(additionalStartoptions);
        }
        this.startMenue();
    }
    private async startMenue(): Promise<void> {
        console.clear();
        ConsoleHandling.printInput("Please choose a activity:");
        let answer: string = await ConsoleHandling.showPossibilities(this.initalStartOptions, "Your Statement:");
        switch (answer) {
            case "1":
                console.clear();
                console.log("CASE 1\n")
                return;
            case "2":
                console.clear();
                console.log("CASE 1\n")
                return;
            case "4":
                console.clear();
                console.log("CASE 4\n")
                return;
            case "4":
                console.clear();
                console.log("CASE 4\n")
                return;
            case "5":
                console.clear();
                console.log("CASE 5\n")
                return;
            default:
                ConsoleHandling.printInput("please choose a siutable input.");
                break;
        }

    }
}
