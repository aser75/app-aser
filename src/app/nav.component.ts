import { Directive, Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
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

	// Declaration des variables
	route: string;

	/*
	** Detection des changements de routes
	*/
	constructor(private fondService: FondService,location: Location, router: Router ){
    	router.events.subscribe((val) => {
    
			if(location.path() == '/accueil'){
				document.getElementById("actifBt").style.top = '272px';
				document.getElementById("actifBt").style.right = '26px';
				document.getElementById("actifBt").style.transform = 'translate(-17%, -17%)';
			}
			if(location.path() == '/projet'){
				document.getElementById("actifBt").style.top = '409px';
				document.getElementById("actifBt").style.right = '26px';
				document.getElementById("actifBt").style.transform = 'translate(-17%, -17%)';
			}
			if(location.path() == '/contact'){
				document.getElementById("actifBt").style.top = '546px';
				document.getElementById("actifBt").style.right = '26px';
				document.getElementById("actifBt").style.transform = 'translate(-17%, -17%)';
			}

    	});		
	}

	/*
	** J'emet le type de fond à mon servive
	*/
	typeFond (valeur: string): void {
		this.fondService.typeA(valeur);
	}

	/*
	** Changement de taille de fenetre
	*/
	onResize(event) {
		let container :any  	 	 = document.getElementById("callBack"); 
		let pos : any				 = container.querySelector('.active'); 
		let posiTop: any 	 		 = pos.getBoundingClientRect().top;
		let posiLeft: any 	 		 = pos.getBoundingClientRect().left;

		document.getElementById("actifBt").style.transition = "none";
		document.getElementById("actifBt").style.top = posiTop+'px';
		document.getElementById("actifBt").style.left = posiLeft+'px';
		document.getElementById("actifBt").style.transform = 'translate(-13%, -15.5%)';

	}


}