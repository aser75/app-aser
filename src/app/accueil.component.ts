import { Component, OnInit, OnDestroy, } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, animateChild, group,keyframes } from '@angular/animations';

@Component({
	  selector		: 'accueil',
	  templateUrl	: './view/accueil.component.html',
	  styleUrls		: ['../assets/styl/view/accueil.component.styl'],
    animations: [

      /*
      ** Animation Phone/Pen/Bulle/texte
      */ 
      trigger('bulleAnimation', [
        transition('* => *', [
 
          query(':enter h1', style({ opacity: 0,transform: 'translateY(20%) rotate(-15deg)' }), { optional: true }),
          query(':enter .bulle', style({ transform: 'translateY(30%)', opacity: 0 }), { optional: true }),
          query(':enter .shape_text', style({ opacity: 0 }), { optional: true }),
          query('.shape_icon', style({ transform: 'rotate(0deg)' }), { optional: true }),
          query(':enter .shadow', style({ transform: 'scaleX(1.7) translateY(0%)', opacity: 0  }), { optional: true }),
          
          group([
            query(':enter h1', [ animate('1s 500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0) rotate(-15deg)' }))], { optional: true }),
            query(':enter .bulle', [animate('1s 500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1}))], { optional: true }),
            query(':enter .shadow', [animate('1s 500ms ease-in-out', style({ transform: 'scaleX(1)', opacity: 1 }))], { optional: true }),
          ]),

          group([
            query(':enter .shape_text', [animate('0.5s ease-in-out', style({opacity: 1}))], { optional: true }),
          ])

        ])
      ]),

      trigger('rotatePhoneAnimation', [

        state('zeroDegres', style({transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0, })),
        state('trenteDegres', style({transform: 'rotateZ(30deg) translate3d(0,0,50px) ', opacity: 1, })),
        
        transition('zeroDegres <=> trenteDegres', animate('0.5s 0.5s ease-in')),
      ]),

      trigger('rotatePenAnimation', [

        state('zeroDegres', style({transform: 'rotateZ(0deg) translate3d(0,0,0)', opacity: 0, })),
        state('trenteDegres', style({transform: 'rotateZ(50deg) translate3d(0,0,50px) ', opacity: 1, })),
        
        transition('zeroDegres <=> trenteDegres', animate('0.5s 0.7s ease-in')),
      ]),

      /*
      ** Animation Bulle
      */
      trigger('bunceAnimation', [
        
        state('in', style({transform: 'translate3d(0, 0, -30px)' })),
        state('out', style({transform: 'translate3d(0, 15px, 0)' })),
        
        transition('in => out', animate('1.5s 0.5s ease-in-out')),
        transition('out => in', animate('1.5s  ease-out'))
      ]),

      /*
      ** Animation Ombre
      */
      trigger('shadowAnimation', [
        
        state('in', style({transform: 'scaleX( 1 ) scaleY( 1 )' })),
        state('out', style({transform: 'scaleX( 1.5 ) scaleY( 1.2 )' })),
        
        transition('in => out', animate('1.5s 0.5s ease-in-out')),
        transition('out => in', animate('1.5s  ease-out'))
      ]),
    ]
})

export class AccueilComponent implements OnInit, OnDestroy {
  
  /*
  ** Etat initial
  */
  state = 'in';
  etat  = 'zeroDegres';

  ngOnInit(): void {

    /*
    ** Depart de animation bulle
    */
    setTimeout(() => {
      this.state = 'out';
    }, 0);

    setTimeout(() => {
      this.etat = 'trenteDegres';
    },1000);

    /*
    ** Add Class Body
    */
  	document.body.classList.add('accueil');

  }

  /*
  ** Fonction Callback animation bulle
  */
  onEnd(event) {
    this.state = 'in';
    
    if (event.toState === 'in') {
      setTimeout(() => {
        this.state = 'out';
      }, 0);
    }
  
  }

  ngOnDestroy(): void {

    /*
    ** Remove Class Body
    */
  	document.body.classList.remove('accueil');

  }
}