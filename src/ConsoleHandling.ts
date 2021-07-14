import { resolve } from 'path';
import * as readline from 'readline';

class ConsoleHandling {
  private static instance: ConsoleHandling = new ConsoleHandling()

  // logger object with syslog levels as specified loglevels
  // logs into build_service.log in directory log and onto console of running node.js process
  private consoleLine: readline.ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  constructor() {
    if (ConsoleHandling.instance)
      throw new Error("Use ConsoleHandling.Instance() instead new ConsoleHandling()")
    ConsoleHandling.instance = this
  }

  public static getInstance(): ConsoleHandling {
    return ConsoleHandling.instance
  }

  public async question(question: string): Promise<string> {
    this.printInput("");
    let answer: string = "";
    let answerPromise: string = await new Promise((resolve) => {
      this.consoleLine.question(question.toString(), (_answer: string) => {
        answer = _answer;
        resolve(answer);

      })
    });

    if (answerPromise.toLocaleLowerCase() == "exit") {
      throw new Error("exit");
    }
    return answerPromise;
  }

  public async showPossibilities(showPossibilities: string[], question: string): Promise<string> {
   
    // this.consoleLine.write("Functions you can use: ");
    this.consoleLine.write("\n");
    for (let possibility of showPossibilities) {
      this.consoleLine.write(possibility.toString());
      this.consoleLine.write("\n")
    }
    this.consoleLine.write("\n");

    let answerPromise: string = await new Promise((resolve) => this.consoleLine.question(question.toString(), (answer: string) => {
      resolve(answer);
    }));

    if (answerPromise.toLocaleLowerCase() == "exit") {
      throw new Error("exit");
    }
    return answerPromise;
  }

  public printInput(input: string) {
    this.consoleLine.write(input);
    this.consoleLine.write("\n");
  }

  public closeConsole() {
    this.consoleLine.close();
  }
}

export default ConsoleHandling.getInstance();