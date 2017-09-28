import { Component, OnInit, OnDestroy } from '@angular/core';

@Component ({
	selector		: 'contact',
	templateUrl		: './view/contact.component.html',
    styleUrls        : ['../assets/styl/view/contact.component.styl'],
})

export class ContactComponent implements OnInit, OnDestroy {
	bgsvg:boolean;

	ngOnInit(): void {

		/*
      	Add Class Body
    	*/
		document.body.classList.add('contact');
	
	}

	ngOnDestroy(): void {

		/*
		Remove Class Body
  		*/
		document.body.classList.remove('contact');
	}

}
