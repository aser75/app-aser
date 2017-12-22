import { Component, EventEmitter, Input, Output, OnInit  } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger, animateChild, group } from '@angular/animations';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/filter';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector            : 'my-app',
  templateUrl         : './view/app.component.html',

  styleUrls           : ['../assets/styl/view/app.component.styl'],
  animations          : [
    trigger('routeAnimation', [

      transition('projet <=> details', [

        query(':enter .details-hack', style({ transform: 'translateY(100%)' }), { optional: true }),
        query(':leave .details-hack', style({ transform: 'translateY(100%)' }), { optional: true }),
          
        group([  // block executes in parallel
          query(':enter .details-hack', [
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)', opacity: '1' }))
          ], { optional: true }),
          
          query(':leave .details-hack', [
            animate('0.5s ease-in-out', style({ transform: 'translateY(100%)', opacity: '0'  }))
          ], { optional: true }),
        ])
      ]),

      transition('* => contact', [

        query(':enter #contact', style({ transform: 'translateY(100%)' }), { optional: true }),
        query(':leave #contact', style({ transform: 'translateY(100%)' }), { optional: true }),
          
        group([  // block executes in parallel
          query(':enter #contact', [
            animate('0.5s ease-in-out', style({ transform: 'translateY(0%)',opacity: '1' }))], { optional: true }),
          
          query(':leave #contact', [
            animate('0.5s ease-in-out', style({ transform: 'translateY(100%)', opacity: '0' }))], { optional: true }),
        ])
      ]),
    ])
  ]
})

export class AppComponent implements OnInit {
  
  /**
  * Definition des variables
  **/
  title = 'Aser App';
  bgsvg: string;

  constructor(private router: Router){}

  prepRouteState(outlet: any)
  {
    return outlet.activatedRouteData['animation'] || 'firstPage'; 
  }

  actifContactBg(valeur: string)
  {
    this.bgsvg = valeur;
  }

  ngOnInit()
  {
    this.router.events
      .filter((e: any) => e instanceof RoutesRecognized)
      .pairwise()
      .subscribe((e: any) => {
        if(e[0].url === '/accueil') {
          document.body.classList.add('previousAccueil');
        }
      });
  }
  
}