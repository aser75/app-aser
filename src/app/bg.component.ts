import { Component, OnInit, OnDestroy, ElementRef, Input , OnChanges, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';

import "gsap";

declare var TweenMax: any;

@Component({
	selector		: 'bg',
	templateUrl		: './view/bg.component.html',
})

export class BgComponent implements OnInit, OnDestroy, OnChanges {

  @Input() bgsvg: boolean;
  relativePath: string = window.location.pathname;

  ngOnChanges(): void {
    console.log(this.bgsvg);

    if(!this.bgsvg) {
      
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,100 50,100 100,100 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1
      });

    } else {

      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 50,30 100,20 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1
      });

    }


  }
  

  ngOnInit(): void {
    
    /*
    Animation BG
    Utilisation tweenMax
    */

    if (this.relativePath !== "/accueil") {
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 50,30 100,20 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1
      });
    }
  }

  ngOnDestroy(): void {

    /*
    Remove Class Body
    */


  }
}