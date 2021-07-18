import { DefaultDate } from "./DefaultDate";

export class DateArea {
    public startDate: DefaultDate;
    public endDate: DefaultDate;


    constructor(startDate: DefaultDate, endDate: DefaultDate) {
        this.startDate = startDate;
        this.endDate = endDate;
    }


    public static makeExecutable(inanely: DateArea): DateArea {
        let smartStartDate: DefaultDate = DefaultDate.makeExecutable(inanely.startDate);
        let smartEndDate: DefaultDate = DefaultDate.makeExecutable(inanely.endDate);

        return new DateArea(smartStartDate, smartEndDate);
    }

    public wraps(dateNew: DefaultDate | Date): boolean {
        let defaultDate: DefaultDate;

        if (dateNew instanceof Date) {
            defaultDate = DefaultDate.dateToDefaultDate(dateNew);
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