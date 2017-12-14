import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';

/*
** Service
*/
import { Projet } from './service/projet';
import { ProjetService } from './service/projet.service';
import { Categorie } from './service/categorie';
import { CategorieService } from './service/categorie.service';

/*
** Animation
*/
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router, NavigationEnd } from '@angular/router';

import "gsap";
declare var TweenMax: any;
declare var KUTE: any;


@Component({
  selector           : 'app-root',
  templateUrl        : './view/projet.component.html',
  styleUrls          : ['../assets/styl/view/projet.component.styl'],
  providers          : [ProjetService, CategorieService],
  animations         : [
    trigger('listAnimation', [
      transition('* => *', [
 
        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', [
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
  categories : Categorie[];
  result = [];

  selectedProjet: Projet;
  target: string;
  targetPair: string;
  typeItem: any;
  productcategory: string;
  multiSelectValue: string[] = ['reactjs', 'angular'];


  /*
  **  Constructor
  */
  constructor (
    private projetService: ProjetService,
    private categorieService: CategorieService,
    private router: Router){}

  /*
  **  Service Projets
  */
  getProjets(): void {
    this.projetService.getProjets().then(projets => this.projets = projets);
  }

  /*
  **  Service Categories
  */
  getCategories(): void {
    this.categorieService.getCategorie().then(categories => this.categories = categories);    
  }

  /*
  **  Init de la view
  */
  ngOnInit(): void {

    // Scroll Top 
    this.router.events.subscribe((evt) => {
        if (!(evt instanceof NavigationEnd)) {
            return;
        }
        window.scrollTo(0, 0);
    });

    // Add Projet Ressource
    this.getProjets();

    // Add Categorie Ressource
    this.getCategories();

    // Add Class Body
    document.body.classList.add('projet');
  }

  /*
  **  Destruction de la view
  */
  ngOnDestroy(): void {
    // Remove Class Body
    document.body.classList.remove('projet');
  }

  /*
  **  Selection de la view
  */
  onSelect(projet: Projet): void {
    this.selectedProjet = projet;
  }


  /*
  **  Gestion du Svg de la liste des projets
  */
  hoverSvg(event: any){

    this.target       = event.target.id;
    this.targetPair   = event.target.className;
    this.typeItem     = event.target.classList

    if(this.typeItem.contains('even') ) {

      // Svg Position Nul
      let targetObject = document.getElementById(this.target).getElementsByClassName( 'triangle__svg' )[0];

        TweenMax.to(targetObject, 0.2, {
          attr: {
            points: '100,0 100,0 100,100'
          },
        });
    } 
    if ( this.typeItem.contains('odd') ) {

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

    if( this.typeItem.contains('even') ) {

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

    if( this.typeItem.contains('odd') ){

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


  /*
  **  Click filter
  */
  updateProductCategory (stringCategory: string) {
    this.productcategory = stringCategory;
  }

}
