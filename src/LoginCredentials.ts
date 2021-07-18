import { RegUser } from "./RegUser";

export class LoginCredentials {
    public userID: number;
    public username: string;
    public password: string;

    constructor(userID: number, username: string, password: string) {
        this.userID = userID;
        this.username = username;
        this.password = password;
    }

    static makeExecutable(dumbCredentials: LoginCredentials): LoginCredentials {
        return new LoginCredentials(dumbCredentials.userID, dumbCredentials.username, dumbCredentials.password);
    }
    
    public equals(_second: LoginCredentials): boolean {

        if (this.username == _second.username && this.password == _second.password) {
            return true;
        }

        return false;
    }

    public equalsRegUser(_regUser: RegUser): boolean {
        return this.equals(_regUser.LoginCredentials);
    }
}