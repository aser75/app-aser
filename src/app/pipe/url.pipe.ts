import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
	name: 'url'
})

export class UrlPipe {
	
	transform(value: string, args: string, disk: string,format: string) {    

		if ( format == "200" ) {
			value = value.replace(args, "thumb_"+disk+"_200_150_0_0_crop.jpg");	
		}
		
		if ( format == "800" ) {
			value = value.replace(args, "thumb_"+disk+"_800_490_0_0_crop.jpg");	
		}

    	return value;
 
	}
}