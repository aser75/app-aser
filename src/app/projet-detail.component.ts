import 'rxjs/add/operator/switchMap';
import { Component, OnInit, OnDestroy } 	from '@angular/core';
import { ActivatedRoute, ParamMap, Router, NavigationEnd}	 	from '@angular/router';
import { Location }						from '@angular/common'

// Service Projet
import { Projet } 						from './service/projet';
import { ProjetService }				from './service/projet.service';


@Component ({
	  selector			    : 'projet-detail',
  	templateUrl			  : './view/projet-detail.component.html',
    styleUrls        	: ['../assets/styl/view/projet-detail.component.styl'],
})

export class ProjetDetailComponent implements OnInit, OnDestroy {
	projet: Projet;

	constructor(
		private projetService: ProjetService,
		private route: ActivatedRoute,
		private location: Location,
		private router: Router
	) {}

	ngOnInit(): void {
    	
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

        this.router.events.subscribe((evt) => {
            if (!(evt instanceof NavigationEnd)) {
                return;
            }
            window.scrollTo(0, 0);
        });

	}

	ngOnDestroy(): void {

    /*
      Remove Class Body
    */
    document.body.classList.remove('projet_detail');		
	
	}

  	goBack(): void {
    	this.location.back();
  	}
}