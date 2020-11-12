import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateAgo',
  pure: true
})
export class DateAgoPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      const seconds = Math.floor((+new Date() - +new Date(value)) / 1000);
      if (seconds < 10) // less than 30 seconds ago will show as 'Just now'
        return 'Przed chwilą';
      const intervals = {
        'lat': 31536000,
        'miesięcy': 2592000,
        'tygodni': 604800,
        'dni': 86400,
        'godzin': 3600,
        'minut': 60,
        'sekund': 1
      };
      let counter: number;
      for (let i in intervals) {
        counter = Math.floor(seconds / intervals[i]);
        if (counter > 0) {
          if (counter === 1) {
            switch (i) {
              case 'lat':
                i = 'rok';
                break;
              case 'miesięcy':
                i = 'miesiąc';
                break;
              case 'tygodni':
                i = 'tydzień';
                break;
              case 'dni':
                i = 'dzień';
                break;
              case 'godzin':
                i = 'godzina';
                break;
              case 'minut':
                i = 'minuta';
                break;
              case 'sekund':
                i = 'sekunda';
                break;
            }
          } else if (counter >= 2 && counter <= 4) {
            switch (i) {
              case 'lat':
                i = 'lata';
                break;
              case 'miesięcy':
                i = 'miesiące';
                break;
              case 'tygodni':
                i = 'tygodnie';
                break;
              case 'godzin':
                i = 'godziny';
                break;
              case 'minut':
                i = 'minuty';
                break;
              case 'sekund':
                i = 'sekundy';
                break;
            }
          }

          return counter + ' ' + i + ' temu';
        }
      }
    }
    return value;
  }
}