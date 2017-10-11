import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';

import { FondService } from './service/fond.service';


@Component({
	selector		: 'nav-call',
	templateUrl		: './view/nav.component.html',
    styleUrls       : ['../assets/styl/view/nav.component.styl'],
  	host: {
  	  '(window:resize)': 'onResize($event)'
  	}
})

export class NavComponent {

	constructor(private fondService: FondService ){}

	// J'emet le type de fond à mon servive
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}

	positRound(event){

		var classTarget 	 = event.currentTarget.className;
		let pos: any  		 = document.getElementById("callBack").getElementsByClassName( classTarget )[0];
		let posiTop: any 	 = pos.getBoundingClientRect().top;
		let posiLeft: any 	 = pos.getBoundingClientRect().left;

		document.getElementById("actifBt").style.top = posiTop+'px';
		document.getElementById("actifBt").style.left = posiLeft+'px';
		document.getElementById("actifBt").style.transition = "0.2s ease-in-out";
	}

	onResize(event) {

		let container :any  	 	 = document.getElementById("callBack"); 
		let pos : any				 = container.querySelector('.active'); 
		let posiTop: any 	 		 = pos.getBoundingClientRect().top;
		let posiLeft: any 	 		 = pos.getBoundingClientRect().left;

		document.getElementById("actifBt").style.transition = "none";
		document.getElementById("actifBt").style.top = posiTop+'px';
		document.getElementById("actifBt").style.left = posiLeft+'px';
	}


}