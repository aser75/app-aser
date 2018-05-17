import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, animateChild, group, keyframes } from '@angular/animations';
import { FondService } from './service/fond.service';
import "gsap";
declare var TweenMax: any;
declare var Snap: any;
declare var mina: any; 


@Component({
	  selector		: 'accueil',
	  templateUrl	: './view/accueil.component.html',
	  styleUrls		: ['../assets/styl/view/accueil.component.styl'],
    animations: [
      trigger('showTitre', [
        state('in', style({transform: 'translateX(0) rotate(-15deg)', opacity:0})),
        transition('* => *', [
          animate(4500 , keyframes([
            style({transform: 'translateX(0) rotate(-15deg)', opacity:0, offset: 0}),
            style({transform: 'translateX(0) rotate(-15deg)', opacity:0,  offset: 0.8}),
            style({transform: 'translateX(0) rotate(-15deg)', opacity:1, offset: 1.0})
          ]))
        ]),
      ]),

      trigger('showTexte', [
        state('in', style({transform: 'translateX(0) rotate(0deg)', opacity:0})),
        transition('* => *', [
          animate(4500 , keyframes([
            style({transform: 'translateX(0) rotate(0deg)', opacity:0, offset: 0}),
            style({transform: 'translateX(0) rotate(0deg)', opacity:0,  offset: 0.8}),
            style({transform: 'translateX(0) rotate(0deg)', opacity:1, offset: 1.0})
          ]))
        ]),
      ]),

      trigger('showIcone1', [
        state('in', style({ transform: 'rotateZ(30deg) translate3d(0,0,50px)', opacity: 1, })),
        transition('* => *', [
          animate(4000 , keyframes([
            style({ transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0, offset: 0}),
            style({ transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0,  offset: 0.9}),
            style({ transform: 'rotateZ(30deg) translate3d(0,0,50px)', opacity: 1, offset: 1.0})
          ]))
        ]),
      ]),

      trigger('showIcone2', [
        state('in', style({ transform: 'rotateZ(50deg) translate3d(0,0,50px)', opacity: 1, })),
        transition('* => *', [
          animate(4000 , keyframes([
            style({ transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0, offset: 0}),
            style({ transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0,  offset: 0.9}),
            style({ transform: 'rotateZ(50deg) translate3d(0,0,50px)', opacity: 1, offset: 1.0})
          ]))
        ]),
      ]),

      /*
      ** Animation Ombre
      */
      trigger('showShadow', [
        state('in', style({ transform: 'scale(0.9) translate3d(0,-20px,0)', opacity: 1, })),
        transition('* => *', [
          animate(4000 , keyframes([
            style({ transform: 'scale(0.9) translate3d(0,-20px,0)', opacity: 0, offset: 0}),
            style({ transform: 'scale(0.9) translate3d(0,-20px,0)', opacity: 0,  offset: 0.7}),
            style({ transform: 'scale(1) translate3d(0,0,0)', opacity: 1, offset: 0.9})
          ]))
        ]),
      ]),
    ]
})

export class AccueilComponent implements OnInit, OnDestroy {
  
  /*
  ** Etat initial
  */
  state = 'in';
  etat  = 'zeroDegres';
  svg: any;
  s: any;

  /*
  ** Detection des changements de routes
  */
  constructor( private fondService: FondService ){}

  /*
  ** J'emet le type de fond à mon servive
  */
  typeFond (valeur: string): void
  {
    this.fondService.typeA(valeur);
  }

  ngOnInit(): void
  {
    /*
    ** J'emet le type de fond à mon servive
    */
    this.fondService.typeA("bas");
    /*
    ** Add Class Body
    */
  	document.body.classList.add('accueil');
  }

  ngOnDestroy(): void 
  {
    /*
    ** Remove Class Body
    */
  	  document.body.classList.remove('accueil');
  }
}