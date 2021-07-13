import ConsoleHandling from "./ConsoleHandling";


export class UnregUser {

    constructor() {
        this.startMenue();
    }

    private async startMenue() {
        ConsoleHandling.printInput("You continued as unregistrated User.\nPlease choose a activity:")
        let answer: string = await ConsoleHandling.showPossibilities(["1. ", "2.", "3. ", "4. "], "Your Statement:");
    }
}
