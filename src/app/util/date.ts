import moment from "moment";

export class DateUtil {

    public static validateDate(dtt: string, format?: string): boolean {
        return moment(dtt, format || undefined).isValid();
    }

}