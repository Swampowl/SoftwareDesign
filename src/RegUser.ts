import ConsoleHandling from "./ConsoleHandling";
import { UnregUser } from "./UnregUser";

export class RegUser extends UnregUser {



    constructor() {
        super(["<4> view statistics of own questionaries", "<5> create a new questionarie"]);
        console.log(this.initalStartOptions);
    }
}