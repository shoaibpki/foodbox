import { Items } from './../interfaces/items';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(items: Items[], textSearch: string): Items[] {
    let textToUpper = textSearch.toUpperCase()
    if (textToUpper == '') {
      return items
    } else {
        return items.filter(
        i => i.itemName.toUpperCase().indexOf(textSearch) > -1
      )
    }
  }

}
