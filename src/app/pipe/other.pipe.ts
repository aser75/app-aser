import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
  name: 'other'
})

export class OtherPipe implements PipeTransform {

  transform(value: any[], args?: any): any[] {
  		if( !value )
  		{
  			return value;
  		}
		return value.filter(valu => valu.id !== args); 
	}
}