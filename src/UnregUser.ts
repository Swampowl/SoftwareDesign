import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import FileHandler from "./FileHandler";
import { Questionarie } from "./Questionarie";
import { UserManager } from "./UserManager";


export class UnregUser {

    public initalStartOptions: string[] = ["<1> select from ten questionaries", "<2> search questionarie by name", "<3> show amount of taken questionaries and their names"];
    public isRegistratedUser: boolean;

    constructor(additionalStartoptions?: string[]) {

        if (additionalStartoptions) {
            this.initalStartOptions = this.initalStartOptions.concat(additionalStartoptions);
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
                await this.selectFromTenQuestionaires();
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

    private async selectFromTenQuestionaires(): Promise<void> {

        let selectedQuest: Questionarie;

        for (let questIndex: number = 0; (questIndex < UserManager.questionaireDB.length && questIndex < 10); questIndex++) {
            let title: string = UserManager.questionaireDB[questIndex].title;

            console.log(`<${questIndex}>   ` + title);
        }

        let answer: string = await ConsoleHandling.question("please type in the quesionaire index you want to select: ");

        selectedQuest = UserManager.questionaireDB[+answer];
        let currentUsername: string = this.getRegUserName();
        let currentAuthor: string = selectedQuest.author;

        if (currentUsername != currentAuthor) {
            await selectedQuest.takePart();
            FileHandler.writeFile("QuestionaireDB.json", UserManager.questionaireDB);
        }

        else {
            console.log("You are the questionaries author.\nYou are not authorized to take part in this questionaire.")
        }

    
    }
    public getRegUserName(): string {
        return;
    }

    public async createQuestionarie(): Promise<void> { }

    public async showOwnStatistics(): Promise<void> { }
}