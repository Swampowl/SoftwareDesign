/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs = require('fs');
import path = require('path');

export class FileHandler {
  private static instance: FileHandler;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() { }

  public static getInstance(): FileHandler {
    if (this.instance == null)
      this.instance = new FileHandler();

    return this.instance;
  }


  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readFile(pathToFile: string): any {
    let jsonRaw = fs.readFileSync(path.resolve(__dirname, "../" + pathToFile));
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let json: any = JSON.parse(jsonRaw.toString());
    return json;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readArrayFile(pathToFile: string): Array<any> {
    return this.readFile(pathToFile);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public readObjectFile(pathToFile: string): any {
    return this.readFile(pathToFile);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public writeFile(pathToFile: string, dataToWrite: any): void {
    fs.writeFileSync(path.resolve(__dirname, "../" + pathToFile), JSON.stringify(dataToWrite));
  }
}

export default FileHandler.getInstance();