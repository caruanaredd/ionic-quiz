import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: number): string
  {
    // calculate the number of seconds/minutes/hours.
    const seconds = Math.ceil(value / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    // compile a string.
    var output = "";
    if (hours > 0) output += `${hours} hrs `;
    if (minutes > 0) output += `${minutes % 60} min `;
    output += `${seconds % 60}s`;

    return output;
  }
}
