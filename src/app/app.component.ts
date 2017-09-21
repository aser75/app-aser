import { Component,EventEmitter, Input, Output  } from '@angular/core';

@Component({
    selector         : 'my-app',
    templateUrl      : './view/app.component.html',
    styleUrls        : ['../assets/styl/view/app.component.styl'],
})

export class AppComponent {
  
  /**
  * Definition des variables
  **/
  title = 'Aser App';
  bgsvg: string;
  activeBurger: boolean = false;


  actifBg(valeur: string) {

    this.bgsvg = valeur;
    this.activeBurger = !this.activeBurger;
    
  }

  toggleClass() {

  	this.activeBurger = !this.activeBurger;

  }
  
}