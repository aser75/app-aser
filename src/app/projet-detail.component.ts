import { Component, Input } from '@angular/core';
import { Projet } from './projet';

@Component ({
	selector: 'projet-detail',
  	templateUrl: './projet-detail.component.html',
})

export class ProjetDetailComponent {
	@Input() projet: Projet;
}