
import { DateDiff } from "./DateDiff";

export class DefaultDate {

    public year: number;
    public month: number;
    public day: number;

    constructor(inputDateString: string) {
        //regex test inputDateString
        let regexDate: RegExp = /(\b(0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](0?[1-9]|1[0-2])[^\w\d\r\n:](\d{4}|\d{2})\b)|(\b(0?[1-9]|1[0-2])[^\w\d\r\n:](0?[1-9]|[12]\d|30|31)[^\w\d\r\n:](\d{4}|\d{2})\b)/;
        if (!regexDate.test(inputDateString)) {
            throw new Error("Enter a valid date!");
        }

        //inputDateString zerlegen in year month und day -> eventuell mit eigener methode, aber splice/split verwenden
        let dateArray: string[] = inputDateString.split(".");
        this.day = +dateArray[0];
        this.month = +dateArray[1];
        this.year = +dateArray[2];

    }

    public static dateToDefaultDate(date: Date): DefaultDate {
        return new DefaultDate(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);
    }

    public static makeExecutable(inanely: DefaultDate): DefaultDate {
        return new DefaultDate(`${inanely.day}.${inanely.month}.${inanely.year}`);
    }

    public getDateUntil(otherDate: DefaultDate): DateDiff {
        let dayUntil: number = otherDate.day - this.day;
        let monthUntil: number = otherDate.month - this.month;
        let yearUntil: number = otherDate.year - this.year;

        let dateDiff: DateDiff = { year: yearUntil, month: monthUntil, day: dayUntil };

        return dateDiff;
    }

    public isBefore(otherDate: DefaultDate | Date): boolean {
        let otherDefaultDate: DefaultDate;

        if (otherDate instanceof Date) {
            otherDefaultDate = DefaultDate.dateToDefaultDate(otherDate);
        } else {
            otherDefaultDate = otherDate;
        }

        let dateDiff: DateDiff = this.getDateUntil(otherDefaultDate);

        if (dateDiff.year < 0) {
            return false;
        }

        if (dateDiff.year > 0) {
            return true;
        }

        if (dateDiff.month > 0) {
            return false;
        }

        if (dateDiff.month < 0) {
            return true;
        }

        if (dateDiff.day > 0) {
            return true;
        }

        return false;
    }

    public equals(otherDate: DefaultDate): boolean {
        return (this.year == otherDate.year && this.month == otherDate.month && this.day == otherDate.day);
    }

}