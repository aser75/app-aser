import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
	name: 'other'
})

export class OtherPipe implements PipeTransform {
	
	transform(value: any, args?: any) : any {
		console.log(args);
		return value;
		/*if( args == undefined) {
			return value;
		}
		else {
			return value.filter(valu => valu.categories.some(f => f.categorie_titre == args));
		}
		*/
	}
}