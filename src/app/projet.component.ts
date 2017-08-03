import { Component, OnInit } from '@angular/core';
import { Projet } from './projet';
import { ProjetService } from './projet.service';

@Component({
  selector           : 'app-root',
  templateUrl        : './view/projet.component.html',
  styleUrls          : ['../assets/styl/view/projet.component.styl'],
  providers          : [ProjetService]
})

export class ProjetComponent implements OnInit {
  title 	= 'App Aser';
  projets :  Projet[];
  selectedProjet: Projet;

  constructor (private projetService: ProjetService){}

  getProjets(): void {
    this.projetService.getProjets().then(projets => this.projets = projets);
  }
 
  ngOnInit(): void {
    this.getProjets();
  }

  onSelect(projet: Projet): void {
  	this.selectedProjet = projet;
  }
}
