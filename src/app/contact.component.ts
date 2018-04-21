import { Component, OnInit, OnDestroy } from '@angular/core';
import { FondService } from './service/fond.service';

@Component ({
	selector		: 'contact',
	templateUrl		: './view/contact.component.html',
    styleUrls        : ['../assets/styl/view/contact.component.styl'],
})

export class ContactComponent implements OnInit, OnDestroy {

	bgsvg:boolean;
	constructor(private fondService: FondService){}

	ngOnInit(): void
	{
		/*
      	Add Class Body
    	*/
		document.body.classList.add('contact');
		/*
		** J'emet le type de fond à mon servive
		*/
		this.fondService.typeA("poly-2");
	}

	ngOnDestroy(): void
	{
		/*
		Remove Class Body
	  	*/
		document.body.classList.remove('contact');

	}

}
