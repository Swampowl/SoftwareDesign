import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";

export class RegUser extends UnregUser {

    constructor() {
        super(["<4> view statistics of own questionaries", "<5> create a new questionarie"]);
        // console.log(this.initalStartOptions);
    }

    public override async createQuestionarie(): Promise<void> {
        console.log("advanced concepts of polymorphissmmm yeeeeeaaahh");
    }

    public override async showOwnStatistics(): Promise<void> {
        console.log("advanced concepts of polymorphissmmm yeeeeeaaahh version 2222222");
    }
}