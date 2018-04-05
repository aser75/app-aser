import { Component, OnInit, OnDestroy, AfterViewInit,  ElementRef, Input, OnChanges, SimpleChange, ViewChild, HostListener }     from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer }                                              from '@angular/common';
import { Subscription }                                                                               from 'rxjs/Subscription';
import { FondService }                                                                                from './service/fond.service';
import { NgForm }                                                                                       from '@angular/forms';

/**
 ** Import three test
**/
import * as THREE from 'three';
import "./js/EnableThreeExamples";
import "three/examples/js/controls/OrbitControls";
import "three/examples/js/loaders/ColladaLoader";
/**
 ** Fin Import three test
**/
import "gsap";
declare var TweenMax: any;

@Component({
  selector    : 'bg',
  templateUrl    : './view/bg.component.html',
  host: {
    '(document:mousemove)': 'onMouseMove($event)'
  }
})


export class BgComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() bgsvg: string;
  relativePath: string;
  message: any;
  subscription: Subscription;


  /**
  ** Import three test
  **/
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  private scene: THREE.Scene;
  private mesh: THREE.Mesh;
  @ViewChild('canvas')
  private canvasRef: ElementRef;  
  public clock;
  public lastTime;
  mouse:any;
  i:number;
  /**
   ** Fin Import three test
  **/

  constructor( private messageService: FondService )
  {
    /**
    ** J'observe le type de fond du callBack component
    **/
    this.subscription = this.messageService.getType().subscribe(message => { 
      this.message = message;
      this.mouvementBg(this.message.text);

    });
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
    this.render = this.render.bind(this);
    this.i = 0;
    this.lastTime = 0;
    this.mouse = 0;
  }

  /**
  ** Function SVG
  ** Mouvement du svg en fonction de la page
  **/
  mouvementBg( type: string ): void
  {

      // Svg Position Bas
      if(type == "bas") 
      {
        //this.removeEntity();
        let targetObject = document.getElementById('poly1');
        TweenMax.to(targetObject, 1, {
          attr: {
            points: '0,100 25,100 50,100 75,100 100,100 100,100 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
          onComplete: function() {
            // Remove
            document.getElementById("footer").classList.remove("bgWhite");
            // Add
            document.getElementById("footer").classList.add("bgBlack");
          },
          onStart: function() {
            // Remove
            document.getElementById("bg__svg").classList.remove("shadow__svg");
            document.getElementById("viewProjet").classList.remove("completeProjet");
            document.getElementById("viewContact").classList.remove("completeContact");
           },
        });
      } 

      // Svg Position Haut
      if (type == "poly-1")
      {
        this.addEntity();

        let targetObject = document.getElementById('poly1');
        TweenMax.to(targetObject, 1, {
          attr: {
            points: '0,15 25,22.5 50,30 75,22.5 100,15 100,100 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
          onComplete: function() {
            // remove 
            document.getElementById("footer").classList.remove("bgBlack");
            document.getElementById("viewContact").classList.remove("completeContact");
            // Add
            document.getElementById("footer").classList.add("bgWhite");
            document.getElementById("bg__svg").classList.add("shadow__svg");
            document.getElementById("viewProjet").classList.add("completeProjet");
          }
        });
      }

      // Svg Position Haut
      if (type == "poly-2")
      {
        this.addEntity();

        let targetObject = document.getElementById('poly1');
  
        TweenMax.to(targetObject, 1, {
          attr: {
            points: '0,15 25,26.5 50,30 75,26.5 100,15 100,100 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
          onStart: function() {
            // Remove
            document.getElementById("viewProjet").classList.remove("completeProjet");
          },
          onComplete: function() {
            //  Remove
            document.getElementById("footer").classList.remove("bgBlack");
            // Add
            document.getElementById("footer").classList.add("bgWhite");
            document.getElementById("bg__svg").classList.add("shadow__svg");
            document.getElementById("viewContact").classList.add("completeContact");
          }
        });
    }
  }


  /***
  ***
  *** Webgl Three
  *** 
  ***/
  private get canvas(): HTMLCanvasElement {

    return this.canvasRef.nativeElement;

  }
  
  public init()
  {
    var scope = this;

    // add camera
    scope.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    scope.camera.position.set(0.2, 0, 4);

    // Creation scene
    scope.scene = new THREE.Scene();
    
    // Abmbiance Color
    var ambient = new THREE.AmbientLight( 0x4393e5, 0.2 );
    scope.scene.add( ambient );
    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, -70, 100 ).normalize();
    scope.scene.add( directionalLight );
    var hemisphereLight = new THREE.HemisphereLight(0x67bff9,0x4393e4,0.2);
    hemisphereLight.position.set(1, 1, 1).normalize();
    scope.scene.add(hemisphereLight);
    // Fin Abmbiance Color

    // Helpers
    var axesHelper = new THREE.AxesHelper( 5 );
    scope.scene.add( axesHelper );
    var spotLightHelper = new THREE.SpotLightHelper( directionalLight );
    scope.scene.add( spotLightHelper );
    // Fin des Helpers

    // Batiment 1
    var mesh = new THREE.Object3D();
    var objectLoader = new THREE.JSONLoader();
    objectLoader.load("assets/model/Batiment-1-A.json", this.onModelLoadingCompleted);
  }
  
  private onModelLoadingCompleted(geometry, materials) {
    var scope = this;
    var clock = new THREE.Clock();
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.name   = 'batiment';
    scope.mesh.position.set(-0.3, 0.3, 2.1);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.1,0.1, 0.1);

    
    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      //var idleClip = THREE.AnimationUtils.splitClip( clip, 'idle', 0, 60 );
      var left = mixer.clipAction( scope.mesh.geometry['animations'][ 0 ]);
      var pause = mixer.clipAction( scope.mesh.geometry['animations'][ 1 ]);
      var right = mixer.clipAction( scope.mesh.geometry['animations'][ 2 ]);

      left.setEffectiveWeight(1).play();
      pause.setEffectiveWeight(1).stop();
      right.setEffectiveWeight(1).stop();

      //left.setLoop( THREE.LoopOnce, 0 );
      right.setLoop( THREE.LoopOnce, 0 );
      //left.clampWhenFinished = true;
      right.clampWhenFinished = true;
      left.enabled = true;

      scope.scene.add(scope.mesh);
    }

    scope.render(mixer, clock);
  }

  render(mixer?, clock?, mouseX?){

    let self: BgComponent = this;
    
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
    });

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( window.innerWidth, window.innerHeight );

    (function render(){
      requestAnimationFrame(render);
      if(clock) {
        var time = Number(self.mouse);

          // Course Normal
          // var dt = clock.getDelta();
          // mixer.update(dt);

        //var time          = Number(2.5);
        var dt            = clock.getDelta();
        var delta         = time - self.lastTime;
        self.lastTime    = time;
        mixer.update(delta);         
        self.renderer.render(self.scene, self.camera);
      }
    }());
  }
    

  /**
  ** Function with Three
  **/
  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
      if (height === 0) {
        return 0;
    }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  private removeEntity()
  {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    selectedObject.visible = false;
  }

  private addEntity()
  {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    selectedObject.visible = true;
  }


  /**
  ** Events with Three
  **/  
  public onMouseMove(e) {
    var scope = this;
    var clock = new THREE.Clock();
    var moitierDocmuent = this.canvas.clientWidth / 2;

   
    scope.mouse =  e.clientX;
    // Largeur du document en PX;
    // self.canvas.clientWidth;

    // Position de souris en PX;
    // self.mouse

    // Position de souris en %
    let mousePour = (scope.mouse * 100)/scope.canvas.clientWidth;
    let timerPour = (10 * mousePour)/100;
    scope.mouse = timerPour;

    this.render(scope.mouse);
    if (e.clientX > 0 && e.clientX < moitierDocmuent ) {
      // Batiment 1
      this.i ++;
      if (this.i == 1) {
        //console.log(this.i+ ' insideleft ');
      }
    } else {
      // Batiment 1
      this.i = 0;
      // Fin Batiment 1
    }
    //this.mousePos = {x:tx, y:ty};
  }

  private getObjectBatiment1 () {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    return  selectedObject;
  }



  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    this.canvas.style.width = "100%";
    this.canvas.style.height = "100%";
    this.camera.aspect = this.getAspectRatio();
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);
    this.render();
  }


  /***
  *** LIFECYCLE
  ***/
  ngOnInit(): void
  {
      /*
      Animation BG
      Utilisation tweenMax
      */
      this.relativePath = window.location.pathname;
  
      if (this.relativePath !== "/accueil" && this.relativePath !== "/" && this.relativePath !== "/contact" && this.relativePath !== "/accueil(popup:compose)" && this.relativePath !== "/app-prod/accueil"  && this.relativePath !== "/app-prod/")
      {

        this.init();

        let targetObject = document.getElementById('poly1');
        TweenMax.to(targetObject, 1, {
          attr: {
            points: '0,15 25,22.5 50,30 75,22.5 100,15 100,100 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
          onComplete: function() {
            document.getElementById("bg__svg").classList.add("shadow__svg");
            document.getElementById("viewProjet").classList.add("completeProjet");
          }
        });
      }
      else if (this.relativePath == "/contact")
      {
        this.init();
        let targetObject = document.getElementById('poly1');
        TweenMax.to(targetObject, 1, {
          attr: {
            points: '0,15 25,26.5 50,30 75,26.5 100,15 100,100 0,100'
          },
          repeat: 0,
          repeatDelay: 1,
          onComplete: function() {
            document.getElementById("bg__svg").classList.add("shadow__svg");
            document.getElementById("viewContact").classList.add("completeContact");
  
          }
        });     
      }

  }
  
  ngOnChanges(): void
  {
    this.mouvementBg(this.bgsvg);
  }

  ngAfterViewInit(): void 
  {
  }

  ngOnDestroy(): void 
  {}




}