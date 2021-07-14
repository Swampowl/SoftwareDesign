import ConsoleHandling from "./ConsoleHandling";


export class UnregUser {

    public initalStartOptions: string[] = [];


    constructor() {

        this.initalStartOptions = ["1. show ten questionaries", "2. search questionarie by name", "3. show amount of taken questionaries and their names"];
        this.startMenue();
    }

    private async startMenue(): Promise<void> {

        ConsoleHandling.printInput("You continued as unregistrated User.\nPlease choose a activity:")
        let answer: string = await ConsoleHandling.showPossibilities(this.initalStartOptions, "Your Statement:");
        console.log(answer);
    }
}
