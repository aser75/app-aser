import { Component, HostBinding, OnInit, ElementRef } from '@angular/core';
import { trigger, state, style, animate, transition, query, stagger } from '@angular/animations';
import { Router }                 from '@angular/router';
import "gsap";

declare var TweenMax: any;
declare var Snap: any;
declare var mina: any; 


@Component({
  templateUrl   : './view/compose-message.component.html',
  styles        : [ ':host { position: absolute; width: 100%; display: block; top: 0; left: 0; right: 0; bottom: 0; z-index: 999 }' ],
  animations    : [
    trigger('showAnimation', [
        state('*',
          style({
            opacity: 1,
    
          })
        ),
        transition(':enter', [
          style({
            opacity: 0,
    
          }),
          animate('0.2s 600ms linear')
        ]),
    ])
  ]
})

export class ComposeMessageComponent implements OnInit {

  details: string;
  svg: any;
  s: any;

  constructor(private router: Router) {}
  
  cancel() {
    this.closePopup();
  }
 
  closePopup() {
    this.router.navigate([{ outlets: { popup: null }}]);
  }

  ngOnInit():  void {

    this.svg = document.getElementById("Layer_pop");
    this.s   = Snap(this.svg);

    var path        = Snap.select('#trait1');
    var pathBulle   = Snap.select('#trait2');

    animatePath(); // start loop

    function animatePath(){
      path.animate({ d: "M700,428.8v-17.6v-27.7v-31.9v-16.8V123c0-12.7-10.3-23-23-23H473.8h-10.2H438h-14.2h-36.9h-27h-24.8h-24.3H123c-12.7,0-23,10.3-23,23v180.7V360V389v24.1V433v12.5V677c0,12.7,10.3,23,23,23h220.5H362h11.7h15.4h20.2H429h29.3h12.2h27.7H677c12.7,0,23-10.3,23-23V473.4v-9.4v-16V428.8z","fill-opacity": 1  }, 300, mina.easeinout,animateFinale);
    }

    function animateFinale () {
      path.animate({ d: "M752.3,428.8c-42-9-13.3-17.6-13.3-17.6c-26.1-17,42.6-27.7,42.6-27.7c-116-5.3-58-31.9-58-31.9c-13.3-1.3-20.1-8.7-23.6-16.8V123c0-12.7-10.3-23-23-23H473.8c-4.2-3.7-11.8-12.2-10.2-24.2c0,0-14.2,18.5-25.5,18.5s-13.5-10.6-14.2-18.5c0,0-22.7,40.5-36.9-49.7c0,0-7.8,66-27,67.4c-19.2,1.4-24.8-29.5-24.8-29.5S329,90.4,310.7,100H123c-12.7,0-23,10.3-23,23v180.7c-6.3,18.2-29.4,55-79.2,56.2c0,0,60.3,7.8,60.3,29.1c-3.3,15.7-12.8,24.1-12.8,24.1s26.3,8.5,17.7,19.9c0,0,9.8,3.6,13.9,12.5V677c0,12.7,10.3,23,23,23h220.5c11.9,7,18.4,21.3,18.4,21.3c0-3.7,4.8-14.9,11.7-15.4c6.9-0.5,11.7,15.4,15.4,38.3c3.7,22.9,10.1,41,20.2,40.5c10.1-0.5,12.8-41,19.7-54.8c6.9-13.8,21.3-6.4,29.3,1.1c8,7.5,10.6-0.5,12.2-6.4c3.6-12.4,16.2-20,27.7-24.5H677c12.7,0,23-10.3,23-23V473.4c3.8-4.8,11.9-9.4,11.9-9.4c-3.2-1.6-9.6-3.7-9.6-16S752.3,428.8,752.3,428.8z","fill-opacity": 1  }, 300, mina.backout,);
      pathBulle.animate({ d: "M355.2,753.6c-0.3,6.7,5.9,11.2,8.1,11.2c4.1,0,7.9-3.7,8.1-12c0.3-8.2-6.9-14.6-10.9-27.1C360.8,730.2,355.2,753.6,355.2,753.6z M486,45.2c4.5-2.4,4.3-10.6-3.2-6.1c-7.5,4.5-16.8,26.1-16.8,26.1C469.3,61.7,481.5,47.6,486,45.2z M530.8,68.1c2.5,0,4.5-2,4.5-4.5s-2-4.5-4.5-4.5s-4.5,2-4.5,4.5S528.3,68.1,530.8,68.1z M312.8,70c2.5,0,4.5-2,4.5-4.5s-2-4.5-4.5-4.5c-2.5,0-4.5,2-4.5,4.5S310.3,70,312.8,70z M71,507.5c-3.3,0-6,2.7-6,6s2.7,6,6,6s6-2.7,6-6S74.3,507.5,71,507.5z M731.5,324.3c-3,0-5.5,2.4-5.5,5.5c0,3,2.4,5.5,5.5,5.5c3,0,5.5-2.4,5.5-5.5C737,326.7,734.6,324.3,731.5,324.3z M720.2,473.3c-3.3,0-5.9,2.7-5.9,5.9c0,3.3,2.7,5.9,5.9,5.9s5.9-2.7,5.9-5.9C726.1,475.9,723.4,473.3,720.2,473.3z M698,302.2V118c0-12.7-10.3-23-23-23H550.6c0.2-0.8,0.3-1.6,0.3-2.5c0-5.7-4.7-10.4-10.4-10.4c-5.7,0-10.4,4.7-10.4,10.4c0,0.9,0.1,1.7,0.3,2.5H524h-30.2h-30.2H329.4H304h-25.4H121c-12.7,0-23,10.3-23,23v398.1c-9,0.9-16,8.4-16,17.7c0,3.3,0.9,6.5,2.6,9.1c-4.7,5.1-7.5,11.8-7.5,19.2c0,13.1,8.9,24.1,21,27.4V672c0,12.7,10.3,23,23,23h554c12.7,0,23-10.3,23-23V346.3v-22V302.2z","fill-opacity": 1  }, 300, mina.backout,);
    }
  }
}