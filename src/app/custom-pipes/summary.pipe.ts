import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'summary'
})

export class SummaryPipe implements PipeTransform {
  transform(value: string, limit?: number): string {
    if (!value) return null;

    let actualLimit = (limit) ? limit : 50;
    return value.length > limit ? value.substr(0, actualLimit) + '...' : value;
  }
}