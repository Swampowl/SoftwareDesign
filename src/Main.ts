import { initial } from "lodash";
import ConsoleHandling from "./ConsoleHandling";
import FileHandler from "./FileHandler";
import {UserManager } from "./UserManager";

init();




function init() {
    new UserManager();
}

