export class DateUtils {

    static getDate(string: string): Date {
        const date = string.split('/').map(x => Number(x));
        return new Date(`${date[2]}-${date[1] - 1}-${date[0] - 1}`);
    }

    static getFormatDate(date: Date): string {
        return `${date.getDay() + 1}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static getDaysArray = (from: Date, howManyDays: number) => {
        const a = [];
        const d = from;
        for (let i = 0; i < howManyDays; i++) {
            d.setDate(d.getDate() + i);
            a.push(d);
        }
        return a;
    }
}
