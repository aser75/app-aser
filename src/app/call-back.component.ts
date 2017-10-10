import { Directive, Component, EventEmitter, Input, Output, OnInit, OnDestroy } from '@angular/core';

import { FondService } from './service/fond.service';


@Component({
	selector		: 'callback',
	templateUrl		: './view/call-back.component.html',
    styleUrls        	: ['../assets/styl/view/callBack.component.styl'],
})

export class CallBackComponent  {

	constructor(private fondService: FondService ){}

	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}

}