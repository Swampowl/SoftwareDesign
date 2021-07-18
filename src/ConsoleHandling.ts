import { resolve } from 'path';
import * as readline from 'readline';
import { convertToObject } from 'typescript';

class ConsoleHandling {
  private static instance: ConsoleHandling = new ConsoleHandling()

  // logger object with syslog levels as specified loglevels
  // logs into build_service.log in directory log and onto console of running node.js process
  private consoleLine: readline.ReadLine = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  constructor() {
    if (ConsoleHandling.instance) {
      throw new Error("Use ConsoleHandling.Instance() instead new ConsoleHandling()");
      ConsoleHandling.instance = this;
    }
  }

  public static getInstance(): ConsoleHandling {
    return ConsoleHandling.instance
  }

  public debugTwo(message: any, secondMessage: any): void {
    console.log(message);
    console.log(secondMessage);

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

  public async showIndexPossibilities(showPossibilities: string[], question: string): Promise<number> {

    // this.consoleLine.write("Functions you can use: ");
    this.consoleLine.write("\n");

    for (let index: number = 0; index < showPossibilities.length; index++) {

      let possibility: string = showPossibilities[index];

      this.consoleLine.write(`->>${index}<<-  <--->  ${possibility}`);

      this.consoleLine.write("\n")

    }

    this.consoleLine.write("\n");

    let answerPromise: string = await new Promise((resolve) => this.consoleLine.question(question.toString(), (answer: string) => {
      resolve(answer);
    }));


    if (!showPossibilities[+answerPromise]) {
      console.log("invalid input! Please try again. Don't type in the full answer possibility, but rather the number next to it!")
      return await this.showIndexPossibilities(showPossibilities, question);
    }

    return +answerPromise;
  }

  public async showPossibilities(showPossibilities: string[], question: string): Promise<string> {

    this.consoleLine.write("\n");

    for (let index: number = 0; index < showPossibilities.length; index++) {

      let possibility: string = showPossibilities[index];

      this.consoleLine.write(`${possibility}`);

      this.consoleLine.write("\n")

    }

    this.consoleLine.write("\n");

    let answerPromise: string = await new Promise((resolve) => this.consoleLine.question(question.toString(), (answer: string) => {
      resolve(answer);
    }));

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