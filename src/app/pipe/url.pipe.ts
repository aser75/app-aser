import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
	name: 'url'
})

export class UrlPipe {
	
	transform(value: string, args: string, disk: string,format: number) {    
		
		if ( format == 200 )
		{
			value = value.replace(args, "thumb_"+disk+"_200_150_0_0_crop.jpg");	
		}
		else if ( format == 800 )
		{
			value = value.replace(args, "thumb_"+disk+"_800_494_0_0_crop.jpg");	
		}
		else if( format == 1600 )
		{
			value = value.replace(args, "thumb_"+disk+"_1600_988_0_0_crop.jpg");	
		}

    	return value;
 
	}
}