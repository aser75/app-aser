import { Component,EventEmitter, Input, Output  } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, animateChild, group } from '@angular/animations';

@Component({
    selector            : 'my-app',
    templateUrl         : './view/app.component.html',
    styleUrls           : ['../assets/styl/view/app.component.styl'],
    animations          : [
      trigger('routeAnimation', [
transition('* <=> *', [
    /* order */
    /* 1 */ query(':enter, :leave', style({ position: 'fixed', width:'100%' })
      , { optional: true }),
    /* 2 */ group([  // block executes in parallel
      query(':enter', [
        style({ transform: 'translateX(100%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
      ], { optional: true }),
      query(':leave', [
        style({ transform: 'translateX(0%)' }),
        animate('0.5s ease-in-out', style({ transform: 'translateX(-100%)' }))
      ], { optional: true }),
    ])
  ])
      ])
    ]
})

export class AppComponent {
  
  /**
  * Definition des variables
  **/
  title = 'Aser App';
  bgsvg: string;
  activeBurger: boolean = false;


prepRouteState(outlet: any) {
    return outlet.activatedRouteData['animation'] || 'firstPage'; 
  }

  actifBg(valeur: string) {

    this.bgsvg = valeur;
    this.activeBurger = !this.activeBurger;
    
  }

  toggleClass() {

  	this.activeBurger = !this.activeBurger;

  }
  
}