import { Pipe, PipeTransform } from '@angular/core';


@Pipe ({
	name: 'category'
})

export class CategoryPipe implements PipeTransform {
	
	transform(value: any, args?: any) : any {
		var test = ["Css / html"];
		if( args == undefined) {
			return value;
		}
		else {
			return value.filter(valu => valu.categories.some(f => f.categorie_titre == args));
		}


	
	}

}