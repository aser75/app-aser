import { Component, OnInit, OnDestroy } from '@angular/core';
import { Projet } from './projet';
import { ProjetService } from './projet.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';

import "gsap";

declare var TweenMax: any;

@Component({
  selector           : 'app-root',
  templateUrl        : './view/projet.component.html',
  styleUrls          : ['../assets/styl/view/projet.component.styl'],
  providers          : [ProjetService],
  animations         : [
    trigger('listAnimation', [
      transition('* => *', [ // each time the binding value changes
        
        query(':enter', [
          style({ opacity: 0 }),
          stagger(-200, [
            animate('0.4s', style({ opacity: 1 }))
          ])
        ], {optional: true} )
      ])
    ])
  ]
})


export class ProjetComponent implements OnInit, OnDestroy {

  title 	= 'Projets';
  projets :  Projet[];
  selectedProjet: Projet;
  target: string;
  targetPair: string;

  constructor (private projetService: ProjetService, private router: Router){}


  /*
    Service Projets
  */
  getProjets(): void {

    this.projetService.getProjets().then(projets => this.projets = projets);

  }

  ngOnInit(): void {

    /*
      Scroll Top 
    */
        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

    /*
      Add Projet Ressource
    */ 
    this.getProjets();


    /*
      Add Class Body
    */
    document.body.classList.add('projet');

  }

  ngOnDestroy(): void {

    /*
      Remove Class Body
    */
    document.body.classList.remove('projet');
  }

  onSelect(projet: Projet): void {
  
  	this.selectedProjet = projet;
  
  }


  hoverSvg(event: any){

    this.target       = event.target.id;
    this.targetPair   = event.target.className;

    console.log(this.targetPair);

    if(this.targetPair == "item layout horizontal justified center-center ng-tns-c1-1 even") {

      // Svg Position Nul
      let targetObject = document.getElementById(this.target).getElementsByClassName( 'triangle__svg' )[0];

        TweenMax.to(targetObject, 0.2, {
          attr: {
            points: '100,0 100,0 100,100'
          },
        });
    } 
    if (this.targetPair == "item layout horizontal justified center-center ng-tns-c1-1 odd") {

      // Svg Position Nul
      let targetObject = document.getElementById(this.target).getElementsByClassName( 'triangle__svg' )[0];

        TweenMax.to(targetObject, 0.2, {
          attr: {
            points: '0,0 0,0 0,100'
          },
        });
    }
  }

  outSvg(event: any) {

    this.target = event.target.id;

    if(this.targetPair == "item layout horizontal justified center-center ng-tns-c1-1 even") {

      // Svg Position Nul
      let targetObject = document.getElementById(this.target).getElementsByClassName( 'triangle__svg' )[0];

        TweenMax.to(targetObject, 0.2, {
          attr: {
            points: '75,0 100,0 100,100'
          },
          repeat: 0,
          repeatDelay: 1,
        });
    }

    if(this.targetPair == "item layout horizontal justified center-center ng-tns-c1-1 odd"){

      // Svg Position Nul
      let targetObject = document.getElementById(this.target).getElementsByClassName( 'triangle__svg' )[0];

        TweenMax.to(targetObject, 0.2, {
          attr: {
            points: '0,0 25,0 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
        });

    }
  }


}
