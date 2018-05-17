import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'order'
})
export class OrderPipe implements PipeTransform {

  transform(value: Array<object>, args?: any): any {
  	if (value) {
     return value.sort((a: any, b: any) => {
    	if(a.order > b.order) {
    		 return -1;
    	}
    	else {
    		return 1;
    	}
    }); 		
  	}

  }

}
