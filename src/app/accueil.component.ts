import { Component, OnInit, OnDestroy, } from '@angular/core';

@Component({
	selector		: 'accueil',
	templateUrl		: './view/accueil.component.html',
	styleUrls		: ['../assets/styl/view/accueil.component.styl']
})

export class AccueilComponent implements OnInit, OnDestroy {

  ngOnInit(): void {

    /*
    Add Class Body
    */
  	document.body.classList.add('accueil');
  }

  ngOnDestroy(): void {

    /*
    Remove Class Body
    */
  	document.body.classList.remove('accueil');

  }
}