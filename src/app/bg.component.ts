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
    
    if(!this.bgsvg) {

      // Svg Position bas
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,100 50,100 100,100 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("footer").classList.remove("bgWhite")
          document.getElementById("footer").classList.add("bgBlack");
        }
      });

    } else {

      // Svg Position Haut
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 50,30 100,20 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("footer").classList.remove("bgBlack")
          document.getElementById("footer").classList.add("bgWhite");
        }
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