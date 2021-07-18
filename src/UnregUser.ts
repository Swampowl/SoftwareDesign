import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import FileHandler from "./FileHandler";
import { Questionarie } from "./Questionarie";
import { UserManager } from "./UserManager";


export class UnregUser {

    public initalStartOptions: string[] = ["select from ten questionaries", "search questionarie by name", "show taken questionaires"];
    public isRegistratedUser: boolean;
    public takenQuestionaryIDs: number[] = [];

    get UserName(): string {
        return "";
    }

    constructor(additionalStartoptions?: string[], takenQuestionaireIDs?: number[]) {

        if (additionalStartoptions) {
            this.initalStartOptions = this.initalStartOptions.concat(additionalStartoptions);
        }

        if (takenQuestionaireIDs) {
            this.takenQuestionaryIDs = takenQuestionaireIDs;
        }

        this.isRegistratedUser = (Object.getPrototypeOf(this) != UnregUser.prototype);
    }

    public async startMenue() {

        ConsoleHandling.printInput("Please choose a activity:");
        let answer: number = await ConsoleHandling.showIndexPossibilities(this.initalStartOptions, "Your Statement:");

        if (!this.isRegistratedUser) {
            if (answer > 3) {
                ConsoleHandling.printInput("Your input is not siutable!");
                await this.startMenue()
                return;
            }
        }

        switch (answer) {
            case 0:
                await this.selectFromTenQuestionaires();
                break;

            case 1:
                await this.searchQuestionaireByName();

                break;

            case 2:
                this.showTakenQuestionairesStatistics();
                break;

            case 3:
                this.showCreatedQuestionairesStatistics();
                break;

            case 4:
                await this.createQuestionarie();
                break;

            default:
                // ConsoleHandling.printInput("please choose a siutable input.")
                break;
        }



        await this.startMenue();
    }
    private async searchQuestionaireByName(): Promise<void> {

        let answer: string = await ConsoleHandling.showPossibilities(UserManager.questionarieDBToStringArray(), `please type in the quesionaire name you want to select:`);

        for (let quest of UserManager.questionaireDB) {
            if (quest.title == answer) {
                await this.takePartAtQuestionaire(quest);
                return;
            }
        }

        console.log(`No Questionaire matching with your input name ${answer} was found!`);
    }


    private async takePartAtQuestionaire(quest: Questionarie): Promise<void> {

        let isSelectedQuestAlreadyTaken: boolean;

        this.takenQuestionaryIDs.forEach(questID => {
            if (questID == quest.questionarieID) {
                isSelectedQuestAlreadyTaken = true;
            }
        })

        if (isSelectedQuestAlreadyTaken) {
            console.log("You have already taken part at your chosen Questionaire!");
            return;
        }

        if (this.UserName == quest.author) {
            console.log("You are the questionaries author.\nYou are not authorized to take part in this questionaire.")
            return;
        }

        if (!quest.dateArea.wraps(new Date())) {
            console.log(`The chosen Questionaire is not active.\n The questionaires date area is not valid at the moment.`);
            return;
        }


        await quest.takePart();

        this.takenQuestionaryIDs.push(quest.questionarieID);
        UserManager.writeAllDBs();
    }


    private async selectFromTenQuestionaires(): Promise<void> {

        let selectedQuest: Questionarie;

        let questsAsString: string[] = UserManager.questionarieDBToStringArray();

        let answer: number = await ConsoleHandling.showIndexPossibilities(questsAsString, `please type in the quesionaire index you want to select`);

        selectedQuest = UserManager.questionaireDB[+answer];

        await this.takePartAtQuestionaire(selectedQuest);

    }

    public showTakenQuestionairesStatistics(): string {
        console.log("You have taken part in " + this.takenQuestionaryIDs.length + " Questionaries, all listed here:");

        this.takenQuestionaryIDs.forEach(questID => {
            console.log(UserManager.questionaireDB[questID].title);
        })

        ConsoleHandling.question("Enter anything to resume to main menue: ")
        return;
    }

    // Method which gets overwritten by RegUser:
    public async createQuestionarie(): Promise<void> { }
    // Method which gets overwritten by RegUser:
    public async showTakenQuestionaireStatistics(): Promise<void> { }
    // Method which gets overwritten by RegUser:
    public showCreatedQuestionairesStatistics() { }
}

