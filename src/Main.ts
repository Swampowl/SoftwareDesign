import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import FileHandler from "./FileHandler";
import { UserManager } from "./UserManager";

console.clear()
init();




function init() {
    new UserManager();
}

