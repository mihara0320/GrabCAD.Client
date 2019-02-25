import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectCount'
})
export class ObjectCountPipe implements PipeTransform {

  transform(value: any, args?: any): number {
    if (value) {
      console.log(value);

      return Object.keys(value).length;
    }
  }
}
