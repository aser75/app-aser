import { Component, OnInit, OnDestroy, } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, animateChild, group } from '@angular/animations';

@Component({
	  selector		: 'accueil',
	  templateUrl	: './view/accueil.component.html',
	  styleUrls		: ['../assets/styl/view/accueil.component.styl'],
animations: [
   trigger('bulleAnimation', [
     transition('* => goAnimate', [
       // hide the inner elements
       query('h1', style({ opacity: 0 })),
       query('.content', style({ opacity: 0 })),
 
       // animate the inner elements in, one by one
       query('h1', animate(1000, style({ opacity: 1 }))),
       query('.content', animate(1000, style({ opacity: 1 }))),
     ])
   ])
 ]

})

export class AccueilComponent implements OnInit, OnDestroy {

  exp = '';
 
 /*
  * Animation entrer Bulle
 */
  goAnimate() {
  
    this.exp = 'goAnimate';
  
  }


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