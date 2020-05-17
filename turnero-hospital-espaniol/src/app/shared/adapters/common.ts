import {NativeDateAdapter} from '@angular/material';

export const MY_DATE_FORMATS = {
    parse: {
      dateInput: {month: 'short', year: 'numeric', day: 'numeric'},
    },
    display: {
      dateInput: 'input',
      monthYearLabel: {month: 'numeric', year: 'numeric', },
      dateA11yLabel: {day: 'numeric', month: 'long', year: 'numeric'},
      monthYearA11yLabel: { month: 'long', year: 'numeric'},
    },
  };

export class CustomDateAdapter extends NativeDateAdapter {

  parse(value: any): Date | null {
      if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
        const str = value.split('/');
  
        const year = Number(str[2]);
        const month = Number(str[1]) - 1;
        const date = Number(str[0]);
  
        if (month >= 0 && month < 12 && date > 0 && date <= 31 && 
            (month != 1 || date <= 28 || 
                (month == 1 && date == 29 && 
                    (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
                )) &&
            ((month != 3 && month != 3 && month != 5 && month != 8 && month != 10) || date <= 30)
        ) {
            return new Date(year, month, date);
        }
      }
      // const timestamp = typeof value === 'number' ? value : Date.parse(value);
      return null;
    }
  
  format(date: Date, displayFormat: Object): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

}