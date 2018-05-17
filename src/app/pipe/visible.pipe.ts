import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'visible'
})
export class VisiblePipe implements PipeTransform {

  transform(value: any, args?: any): any {
  		if( !value )
  		{
  			return value;
  		}
		else {
			return value.filter(valu => valu.show == 1);
		}
  }

}
