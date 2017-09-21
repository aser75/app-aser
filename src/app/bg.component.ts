import { Component, OnInit, OnDestroy, ElementRef, Input , OnChanges, SimpleChange } from '@angular/core';
import { Location } from '@angular/common';

import "gsap";

declare var TweenMax: any;

@Component({
	selector		: 'bg',
	templateUrl		: './view/bg.component.html',
})

export class BgComponent implements OnInit, OnDestroy, OnChanges {

  @Input() bgsvg: string;
  relativePath: string = window.location.pathname;

  ngOnChanges(): void {
    
    if(this.bgsvg == "bas") {

      // Svg Position bas
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,100 25,100 50,100 75,100 100,100 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("footer").classList.remove("bgWhite")
          document.getElementById("footer").classList.add("bgBlack");
        }
      });

    } if (this.bgsvg == "poly-1") {

      // Svg Position Haut
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,22.5 50,30 75,22.5 100,15 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("footer").classList.remove("bgBlack")
          document.getElementById("footer").classList.add("bgWhite");
        }
      });

    } if (this.bgsvg == "poly-2") {

      // Svg Position Haut
      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,26.5 50,30 75,26.5 100,15 100,100 0,100'
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

    if (this.relativePath !== "/accueil" && this.relativePath !== "/" && this.relativePath !== "/contact") {

      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,22.5 50,30 75,22.5 100,15 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1
      });

    } if (this.relativePath == "/contact") {

      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,26.5 50,30 75,26.5 100,15 100,100 0,100'
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