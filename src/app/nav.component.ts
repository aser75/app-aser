import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { FondService } from './service/fond.service';

@Component({
	selector		: 'nav-call',
	templateUrl		: './view/nav.component.html',
    styleUrls       : ['../assets/styl/view/nav.component.styl'],
})

export class NavComponent {

	// Declaration des variables
	route: string;

	/*
	** Detection des changements de routes
	*/
	constructor(
		private fondService: FondService,
		location: Location,
		router: Router){
    		router.events.subscribe((val) => {
				if(location.path() == '/accueil' || location.path() == '')
				{
					document.getElementById("actifBt").style.top = '0';
					document.getElementById("actifBt").style.transform = 'translate(-50%, -7px)';
				}
				if(location.path().indexOf("projet") > -1)
				{
					document.getElementById("actifBt").style.top = '50%';
					document.getElementById("actifBt").style.transform = 'translate(-50%, -50%)';
				}
				if(location.path() == '/contact')
				{
					document.getElementById("actifBt").style.top = '100%';
					document.getElementById("actifBt").style.transform = 'translate(-50%, -43px)';
				}
    		});	
	}

	/*
	** J'emet le type de fond à mon servive
	*/
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}
}