import 'rxjs/add/operator/switchMap';
import { Component, OnInit } 	from '@angular/core';
import { ActivatedRoute, ParamMap}	 	from '@angular/router';
import { Location }						from '@angular/common'

// Service Projet
import { Projet } 						from './projet';
import { ProjetService }				from './projet.service';


@Component ({
	selector			: 'projet-detail',
  	templateUrl			: './view/projet-detail.component.html',
	styleUrls        	: ['../assets/styl/view/projet-detail.component.styl'],
})

export class ProjetDetailComponent implements OnInit {
	projet: Projet;

	constructor(
		private projetService: ProjetService,
		private route: ActivatedRoute,
		private location: Location
	) {}

	ngOnInit(): void {
    	this.route.paramMap
      		.switchMap((params: ParamMap) => this.projetService.getProjet(+params.get('id')))
      		.subscribe(projet => this.projet = projet);		
	}

  	goBack(): void {
    	this.location.back();
  	}
}