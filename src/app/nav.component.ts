import { Directive, Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { FondService } from './service/fond.service';


@Component({
	selector		: 'nav-call',
	templateUrl		: './view/nav.component.html',
    styleUrls       : ['../assets/styl/view/nav.component.styl'],
})

export class NavComponent implements OnInit  {

	constructor(private fondService: FondService ){}

	// J'emet le type de fond à mon servive
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}

	ngOnInit (){}


}