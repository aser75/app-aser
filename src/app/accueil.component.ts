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
      /*
      ** Animation Phone/Pen/Bulle/texte
      */ 
      trigger('bulleAnimation', [
        transition('* => *', [
 
          query('h1', style({ opacity: 0,transform: 'translateY(20%) rotate(-15deg)' }), { optional: true }),
          query('.bulle', style({ transform: 'translateY(30%)', opacity: 0 }), { optional: true }),
          query('.shape_text', style({ opacity: 0 }), { optional: true }),
          query('.content__inner .bt.blanc', style({ opacity: 0 }), { optional: true }),
          query('.shape_icon', style({ transform: 'rotate(0deg)' }), { optional: true }),
          query('.shadow', style({ transform: 'scaleX(1.7) translateY(0%)', opacity: 0  }), { optional: true }),
          
          group([
            query('h1', [ animate('1s 500ms ease-in-out', style({ opacity: 1, transform: 'translateY(0) rotate(-15deg)' }))], { optional: true }),
            query('.bulle', [animate('1s 500ms ease-in-out', style({ transform: 'translateY(0)', opacity: 1}))], { optional: true }),
            query('.shadow', [animate('1s 500ms ease-in-out', style({ transform: 'scaleX(1)', opacity: 1 }))], { optional: true }),
          ]),

          group([
            query('.shape_text', [animate('0.5s ease-in-out', style({opacity: 1}))], { optional: true }),
            query('.content__inner .bt.blanc', [animate('0.5s ease-in-out', style({opacity: 1}))], { optional: true }),
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


    /*
    ** Callback Svg projet
    */
    this.svg = document.getElementById("Layer_bt");
    this.s   = Snap(this.svg);
    var path = Snap.select('#state1');
    var pathCircle = Snap.select('#state0');

    setTimeout(function(){ animateCircle(); }, 1000);

    function animateCircle() {
      path.animate({ d: "M151.7,53.2h-23.4h-4h-4H119h-9.3h-4.9H89.5H72.7h-7.9H54.1H27.6c-6.1,0-11.3,4.3-12.4,10.2L0.3,138.1c-1.6,7.9,4.4,15.2,12.4,15.2h33.1c0,0.2-0.1,0-0.1,0h4.1h0.7h11.9h11.4h8.4h12.1h42.6c6.1,0,11.3-4.3,12.4-10.2l14.9-74.6C165.7,60.6,159.7,53.2,151.7,53.2z","fill-opacity": 1  }, 500, mina.easeinout, animatePath);
    }

    function animatePath(){
      path.animate({ d: "M151.7,53.2h-23.4c-0.3-2-2-3.5-4-3.5c-2.1,0-3.7,1.5-4,3.5H119c-0.3-4.9-4.3-8.8-9.3-8.8c-1.8,0-3.5,0.5-4.9,1.4c-2.9-5.5-8.6-9.3-15.3-9.3c-8.2,0-15.1,5.8-16.8,13.5c-2.2-1.8-4.9-2.8-7.9-2.8c-4.5,0-8.5,2.4-10.7,6H27.6c-6.1,0-11.3,4.3-12.4,10.2L0.3,138.1c-1.6,7.9,4.4,15.2,12.4,15.2h33.1c0,0.2-0.1,0.4-0.1,0.6c0,2.2,1.8,4.1,4.1,4.1c0.2,0,0.4,0,0.7-0.1c1.7,5,6.4,8.6,11.9,8.6c5.1,0,9.4-3,11.4-7.3c2.2,2,5.2,3.2,8.4,3.2c5.7,0,10.5-3.8,12.1-9h42.6c6.1,0,11.3-4.3,12.4-10.2l14.9-74.6C165.7,60.6,159.7,53.2,151.7,53.2z","fill-opacity": 1  }, 200, mina.easein);
    }

  }

  /*
  ** Fonction Callback animation bulle
  */
  onEnd(event)
  {
    this.state = 'in';
    
    if (event.toState === 'in') {
      setTimeout(() => {
        this.state = 'out';
      }, 0);
    }
  }

  /*
  ** Hover / Out bt callback
  */
  scaleMethod()
  {
    var path = Snap.select('#state1');
    animateScale();

    function animateScale() {
      path.animate({ d: "M151.7,53.2h-23.4h-4h-4H119h-9.3h-4.9H89.5H72.7h-7.9H54.1H27.6c-6.1,0-11.3,4.3-12.4,10.2L0.3,138.1c-1.6,7.9,4.4,15.2,12.4,15.2h33.1c0,0.2-0.1,0-0.1,0h4.1h0.7h11.9h11.4h8.4h12.1h42.6c6.1,0,11.3-4.3,12.4-10.2l14.9-74.6C165.7,60.6,159.7,53.2,151.7,53.2z","fill-opacity": 1  }, 200, mina.easeinout);      
    }
  }

  outScaleMethod()
  {
    var path = Snap.select('#state1');
    animateRetour();
    console.log('out');

    function  animateRetour() {
      path.animate({ d: "M151.7,53.2h-23.4c-0.3-2-2-3.5-4-3.5c-2.1,0-3.7,1.5-4,3.5H119c-0.3-4.9-4.3-8.8-9.3-8.8c-1.8,0-3.5,0.5-4.9,1.4c-2.9-5.5-8.6-9.3-15.3-9.3c-8.2,0-15.1,5.8-16.8,13.5c-2.2-1.8-4.9-2.8-7.9-2.8c-4.5,0-8.5,2.4-10.7,6H27.6c-6.1,0-11.3,4.3-12.4,10.2L0.3,138.1c-1.6,7.9,4.4,15.2,12.4,15.2h33.1c0,0.2-0.1,0.4-0.1,0.6c0,2.2,1.8,4.1,4.1,4.1c0.2,0,0.4,0,0.7-0.1c1.7,5,6.4,8.6,11.9,8.6c5.1,0,9.4-3,11.4-7.3c2.2,2,5.2,3.2,8.4,3.2c5.7,0,10.5-3.8,12.1-9h42.6c6.1,0,11.3-4.3,12.4-10.2l14.9-74.6C165.7,60.6,159.7,53.2,151.7,53.2z","fill-opacity": 1  }, 200, mina.easeinout);      
    }    
  }

  ngOnDestroy(): void 
  {
    /*
    ** Remove Class Body
    */
  	  document.body.classList.remove('accueil');
  }
}