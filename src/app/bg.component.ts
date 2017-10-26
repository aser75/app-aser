import { Component, OnInit, OnDestroy, ElementRef, Input , OnChanges, SimpleChange }    from '@angular/core';
import { Location }                                                                     from '@angular/common';
import { Subscription }                                                                 from 'rxjs/Subscription';
import { FondService }                                                                  from './service/fond.service';
import "gsap";

declare var TweenMax: any;


@Component({
	selector		: 'bg',
	templateUrl		: './view/bg.component.html',
})


export class BgComponent implements OnInit, OnDestroy, OnChanges {

  @Input() bgsvg: string;

  relativePath: string = window.location.pathname;
  message: any;
  subscription: Subscription;


  /**
  ** Function du slide du Svg
  **/
  mouvementBg( type: string ): void {

    if(type == "bas") {
    
      let targetObject = document.getElementById('poly1');
  
      // Svg Position Bas
      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,100 25,100 50,100 75,100 100,100 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("footer").classList.remove("bgWhite")
          document.getElementById("footer").classList.add("bgBlack");
        },
        onStart: function() {
          document.getElementById("bg__svg").classList.remove("shadow__svg");
         },
      });
    } 

    if (type == "poly-1") {

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
          document.getElementById("bg__svg").classList.add("shadow__svg");
        }
      });

    }

    if (type == "poly-2") {

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
          document.getElementById("bg__svg").classList.add("shadow__svg");
        }
      });
    }
  }


  constructor(private messageService: FondService) {

    // J'observe le type de fond du callBack component
    this.subscription = this.messageService.getType().subscribe(message => { 

      this.message = message;
      this.mouvementBg(this.message.text);

    });

  }


  ngOnChanges(): void {

    this.mouvementBg(this.bgsvg);

  }

  ngOnInit(): void {
    
    /*
    Animation BG
    Utilisation tweenMax
    */

    if (this.relativePath !== "/accueil" && this.relativePath !== "/" && this.relativePath !== "/contact" && this.relativePath !== "/accueil(popup:compose)") {

      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,22.5 50,30 75,22.5 100,15 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("bg__svg").classList.add("shadow__svg");
        }
      });

    } if (this.relativePath == "/contact") {

      let targetObject = document.getElementById('poly1');

      TweenMax.to(targetObject, 1, {
        attr: {
          points: '0,15 25,26.5 50,30 75,26.5 100,15 100,100 0,100'
        },
        repeat: 0,
        repeatDelay: 1,
        onComplete: function() {
          document.getElementById("bg__svg").classList.add("shadow__svg");
        }
      });     

    }
  }

  ngOnDestroy(): void {}


}