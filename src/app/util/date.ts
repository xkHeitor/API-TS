import moment from "moment";

export class DateUtil {

    public static validateDate(dtt: string, format?: string): boolean {
        return moment(dtt, format || undefined).isValid();
    }

    public static formatDate(date: string, format?: string): string {
        return moment.utc(date).format(format || 'YYYY-MM-DD');
    }

}