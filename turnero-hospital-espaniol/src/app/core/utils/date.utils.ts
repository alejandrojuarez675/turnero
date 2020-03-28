export class DateUtils {

    static getDate(string: string): Date {
        const date = string.split('/').map(x => Number(x));
        return new Date(`${date[1]}-${date[0]}-${date[2]}`);
    }

    static getFormatDate(date: Date): string {
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    }

    static getDaysArray = (from: Date, howManyDays: number) => {
        const a = [];
        for (let i = 0; i < howManyDays; i++) {
            const d = new Date();
            d.setDate(from.getDate() + i);
            a.push(d);
        }
        return a;
    }
}
