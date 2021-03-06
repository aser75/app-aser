import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnDestroy } 	                       from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd}	 	     from '@angular/router';
import { environment }                                           from '../environments/environment';
import { Location }				                                       from '@angular/common';

// Service Projet
import { Projet } 						                                   from './service/projet';
import { ProjetService }				                                 from './service/projet.service';
import { FondService }                                           from './service/fond.service';


@Component ({
	  selector			    : 'projet-detail',
  	templateUrl			  : './view/projet-detail.component.html',
    styleUrls        	: ['../assets/styl/view/projet-detail.component.styl'],
})

export class ProjetDetailComponent implements OnInit, OnDestroy {
	
  projet: Projet;
  projets :  Projet[];

	constructor (
		private projetService: ProjetService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router,
    private fondService: FondService) {}

  /*
  **  Service Projets
  */
  getProjets(): void
  {
    this.projetService.getProjets().then(projets => this.projets = projets);
  }

	ngOnInit(): void
  {
    /*
    ** J'emet le type de fond à mon servive
    */
    this.fondService.typeA("poly-2");

		/*
     	Promise Get projet
    */
    this.route.paramMap
     		.switchMap((params: ParamMap) => this.projetService.getProjet(+params.get('id')))
     		.subscribe(projet => this.projet = projet);

  		/*
        Add Class Body
      */
  		document.body.classList.add('projet_detail');    	
      if (typeof window !== 'undefined') {
        this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
            return;
          }
          window.scrollTo(0, 0);
        });
      }

    // Add Projet Ressource
    this.getProjets();    
	}

	ngOnDestroy(): void
  {
    /*
    Remove Class Body
    */
    document.body.classList.remove('projet_detail');
	}

  goBack(): void 
  {
    this.location.back();
  }
}