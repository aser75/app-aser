import { Component, OnInit, OnDestroy } from '@angular/core';
import { Projet } from './projet';
import { ProjetService } from './projet.service';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';

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
