import { DefaultDate } from "./DefaultDate";

export class DateArea {
    public startDate: DefaultDate;
    public endDate: DefaultDate;


    constructor(startDate: DefaultDate, endDate: DefaultDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }


    public static makeExecutable(dumb: DateArea): Promise<DefaultDate> {
        let smartStartDate: DefaultDate = DefaultDate.makeExecutable(dumb.startDate);
        let smartEndDate: DefaultDate = DefaultDate.makeExecutable(dumb.endDate);

        return new DateArea(smartStartDate, smartEndDate);
    }

    public wraps(_date: DefaultDate | Date): boolean {
        let defaultDate: DefaultDate;

        if (_date instanceof Date) {
            defaultDate = DefaultDate.dateToDefaultDate(_date);
        }

        if (defaultDate.isBefore(this.startDate)) {
            return false;
        }

        if (this.endDate.isBefore(defaultDate)) {
            return false;
        }

        return true;
    }
}