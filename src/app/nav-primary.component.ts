import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { FondService } from './service/fond.service';


@Component({
	selector		: 'nav-primary',
	templateUrl		: './view/nav-primary.component.html',
})

export class NavPrimaryComponent {

	// Declaration des variables
	activeBurger: boolean = false;
	

	constructor(private fondService: FondService ){}

	/*
	** J'emet le type de fond à mon servive
	*/
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
		this.activeBurger = !this.activeBurger;
	}

	toggleClass() {
		this.activeBurger = !this.activeBurger;
	}

}