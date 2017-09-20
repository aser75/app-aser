import { Component, OnInit, OnDestroy } from '@angular/core';
import { Projet } from './projet';
import { ProjetService } from './projet.service';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector           : 'app-root',
  templateUrl        : './view/projet.component.html',
  styleUrls          : ['../assets/styl/view/projet.component.styl'],
  providers          : [ProjetService],
  animations         : [
    trigger('itemMove', [
      
      state('in', style({transform: 'translateX(0)'})),
      transition('void => *', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ])      
    ])
  ]
})


export class ProjetComponent implements OnInit, OnDestroy {

  title 	= 'App Aser';
  projets :  Projet[];
  selectedProjet: Projet;

  constructor (private projetService: ProjetService){}


  /*
    Service Projets
  */
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
