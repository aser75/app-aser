import { Component, OnInit, OnDestroy } from '@angular/core';
import { Projet } from './projet';
import { ProjetService } from './projet.service';

@Component({
  selector           : 'app-root',
  templateUrl        : './view/projet.component.html',
  styleUrls          : ['../assets/styl/view/projet.component.styl'],
  providers          : [ProjetService]
})

export class ProjetComponent implements OnInit, OnDestroy {
  title 	= 'App Aser';
  projets :  Projet[];
  selectedProjet: Projet;

  constructor (private projetService: ProjetService){}

  getProjets(): void {
    this.projetService.getProjets().then(projets => this.projets = projets);
  }
 
  ngOnInit(): void {
    
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

}
