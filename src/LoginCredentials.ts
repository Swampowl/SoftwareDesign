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

    static makeExecutable(inanelyCredentials: LoginCredentials): LoginCredentials {
        return new LoginCredentials(inanelyCredentials.userID, inanelyCredentials.username, inanelyCredentials.password);
    }
    
    public equals(nextLogin: LoginCredentials): boolean {

        if (this.username == nextLogin.username && this.password == nextLogin.password) {
            return true;
        }

        return false;
    }

    public equalsRegUser(regUser: RegUser): boolean {
        return this.equals(regUser.LoginCredentials);
    }
}