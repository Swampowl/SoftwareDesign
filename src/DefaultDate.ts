export class DefaultDate {

    public year: number;
    public month: number;
    public day: number;

    constructor(inputDateString: string) {
        console.log(inputDateString);
        //regex test inputDateString
        let regexDate: RegExp = /(\b(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})\b)|(\b(0?[1-9]|1[0-2])[^\w\d\r\n:](0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](\d{4}|\d{2})\b)/;
        if (!regexDate.test(inputDateString)) {
            throw new Error("Enter a valid date!");
        }

        //inputDateString zerlegen in year month und day -> eventuell mit eigener methode, aber splice/split verwenden
        let dateArray: string[] = inputDateString.split(".");
        console.log(dateArray[0]);
        this.day = +dateArray[0];
        this.month = +dateArray[1];
        this.year = +dateArray[2];
    
    }

}