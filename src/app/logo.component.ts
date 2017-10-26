import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { FondService } from './service/fond.service';

@Component ({
	selector: 		'logo',
	templateUrl:	'./view/logo.component.html'
})

export class LogoComponent  {
	
	// Declaration des variables
	@Input() changePosition: number;
	
	constructor(private fondService: FondService) {}

	/*
	** J'emet le type de fond à mon servive
	*/
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}

}