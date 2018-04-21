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
  public mouse = 0;
  public mixers = [];
  public mixer;
  public activeAction;
  public actions = [];
  public i:number = 0;
  public typeAnime:boolean = false;
  public mouseLook = {x:0,y:0};
  public clientX;
  public cameraMoves = {x:0,y:0,z:-0.1,move:false,speed:0.1};
  public width;
  public height;
  public loader = false;
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

    this.onModelLoadingCompleted       = this.onModelLoadingCompleted.bind(this);
    this.onModelLoadingCompletedA      = this.onModelLoadingCompletedA.bind(this);
    this.onModelSideLeftBatimentA      = this.onModelSideLeftBatimentA.bind(this);
    this.onModelArbreA                 = this.onModelArbreA.bind(this);
    this.onModelampadaires             = this.onModelampadaires.bind(this);


    
    this.render                        = this.render.bind(this);
    this.lastTime                      = 0;
    this.clientX                       = 0;
    this.clock                         = new THREE.Clock();
    this.width                         = window.innerWidth;
    this.height                        = window.innerHeight;
  }

  /**
  ** Function SVG
  ** Mouvement du svg en fonction de la page
  **/
  mouvementBg( type: string ): void
  {

      if(type == "bas") 
      {
        //this.removeAll();
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
      if (type == "poly-1")
      {

        /*
        * Condition si scene existe deja
        */
        if (!this.scene) {
          this.init();
        }

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
      if (type == "poly-2")
      {
        /*
        * Condition si scene existe deja
        */
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
  private get canvas(): HTMLCanvasElement
  {
    return this.canvasRef.nativeElement;
  }
  
  public init()
  {
    var scope = this;

    // add camera
    scope.camera = new THREE.PerspectiveCamera( 45, scope.width / scope.height, 1, 2000 );
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
     
    var sphere = new THREE.SphereBufferGeometry( 0.01, 0.01, 0.01 , 0, 1.5,2);
    var light4 = new THREE.PointLight( 0xffaa00, 1.5, 50 );
    light4.position.set( 0.755, 0.865, 0 );
    light4.add( new THREE.Mesh( sphere, new THREE.MeshBasicMaterial( { color: 0xffaa00 } ) ) );
    scope.scene.add( light4 );

    var manager = new THREE.LoadingManager();
    manager.onLoad = function() {
      scope.loader = true;
    };

    var objectLoader = new THREE.JSONLoader(manager);
  

    // Side Right 
    //Arbre A    
    objectLoader.load("assets/model/arbre-type1.json", this.onModelArbreA);
    // Batiment 1
    objectLoader.load("assets/model/Batiment-1.json", this.onModelLoadingCompleted);
    // Batiment 2
    objectLoader.load("assets/model/Batiment-2.json", this.onModelLoadingCompletedA);
    // Lampadaire
    objectLoader.load("assets/model/lampadaire.json", this.onModelampadaires);

    // Side Left
    // Batiment 1
    objectLoader.load("assets/model/Batiment-4.json", this.onModelSideLeftBatimentA);
  }

  private onModelSideLeftBatimentA(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(-1.15, 0.3, -0.5);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.20,0.20, 0.20);
    scope.mesh.name = "batiment1Left";
    scope.scene.add(scope.mesh);

    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation     = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation     = scope.mesh.geometry['animations'][ 1 ];      

      let left = mixer.clipAction( leftAnimation );
      let pause = mixer.clipAction( pauseAnimation );

      scope.actions.push (left );      

      left.clampWhenFinished = true;
      pause.clampWhenFinished = true;
      
      scope.activeAction = scope.actions[1];
      left.play();
    }

    scope.render(scope.mixers);
  }

  private onModelampadaires(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(0.86, 0.3, 0);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.6,0.6, 0.6);
    scope.mesh.name = "Lampadaire";
    scope.scene.add(scope.mesh);

    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation     = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation     = scope.mesh.geometry['animations'][ 1 ];      

      let left = mixer.clipAction( leftAnimation );
      let pause = mixer.clipAction( pauseAnimation );

      scope.actions.push (left );    

      left.clampWhenFinished = true;
      pause.clampWhenFinished = true;

      scope.activeAction = scope.actions[0];
      left.play();
    }

    scope.render(scope.mixers);
  }


  private onModelArbreA(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(0.85, 0.3, -0.8);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "ArbreA";
    scope.scene.add(scope.mesh);

    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation     = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation     = scope.mesh.geometry['animations'][ 1 ];      

      let left = mixer.clipAction( leftAnimation );
      let pause = mixer.clipAction( pauseAnimation );

      scope.actions.push (left );    

      left.clampWhenFinished = true;
      pause.clampWhenFinished = true;

      scope.activeAction = scope.actions[0];
      left.play();
    }

    scope.render(scope.mixers);
  }

  private onModelLoadingCompleted(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(1.35, 0.3, 0);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "batiment1Left";
    scope.scene.add(scope.mesh);

    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation     = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation     = scope.mesh.geometry['animations'][ 1 ];      

      let left = mixer.clipAction( leftAnimation );
      let pause = mixer.clipAction( pauseAnimation );

      scope.actions.push (left );    

      left.clampWhenFinished = true;
      pause.clampWhenFinished = true;

      scope.activeAction = scope.actions[0];
      left.play();
    }

    scope.render(scope.mixers);
  }

  private onModelLoadingCompletedA(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(1.15, 0.3, -0.5);
    scope.mesh.rotation.set(0, 0, 0);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "batiment1Right";
    scope.scene.add(scope.mesh);

    if (scope.mesh.geometry['animations'])
    {
      var mixer = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation     = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation     = scope.mesh.geometry['animations'][ 1 ];      

      let left = mixer.clipAction( leftAnimation );
      let pause = mixer.clipAction( pauseAnimation );

      scope.actions.push (left );      

      left.clampWhenFinished = true;
      pause.clampWhenFinished = true;
      
      scope.activeAction = scope.actions[1];
      left.play();
    }

    scope.render(scope.mixers);
  }

  render(mixers?, mouseX?)
  {
    let self: BgComponent = this;
    self.mouse = 0;
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
    });

    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( self.width, self.height );

    (function render(){
        requestAnimationFrame(render);

        if(self.clock) {

          var time = Number(self.mouse);
          var delta        = time - self.lastTime;
          self.lastTime    = time;  

          for ( var i = 0; i < mixers.length; i++ ) {
            mixers[i].update(delta);        
          }

         // self.camera.position.x -= Math.max(Math.min((self.clientX - self.mouseLook.x) * 0.0002, self.cameraMoves.speed), - self.cameraMoves.speed);
         // self.mouseLook.x = self.clientX;
          
          self.renderer.render(self.scene, self.camera);
        }
    }());
  }

  /**
  ** Garder Ratio canvas
  **/
  private getAspectRatio(): number {
    let height = this.canvas.clientHeight;
      if (height === 0) {
        return 0;
      }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }

  /**
  ** Garder Ratio canvas
  **/
  private addEntity()
  {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    selectedObject.visible = true;
  }

  /**
  ** Invisible all objects
  **/
  private removeAll()
  {
    var scope = this;
    if(scope.scene) {
      var object1Right     = scope.scene.getObjectByName('batiment1Right');
      var object1Left      = scope.scene.getObjectByName('batiment1Left');
      var objectArbreA     = scope.scene.getObjectByName('ArbreA');

      objectArbreA.visible = false;
      object1Right.visible = false;
      object1Left.visible  = false;  
    }
  }

  private addAll()
  {
    var scope = this;
    if( scope.scene )
    {
      var object1Right     = scope.scene.getObjectByName('batiment1Right');
      var object1Left      = scope.scene.getObjectByName('batiment1Left');
      var objectArbreA      = scope.scene.getObjectByName('ArbreA');

      if( objectArbreA )
      {
        objectArbreA.visible = true;
      }
      if( object1Right )
      {
        object1Right.visible = true;
      }
      if( object1Left ) 
      {      
        object1Left.visible = true;  
      }
    }    
  }

  /**
  ** Events Mouse Move
  **/  
  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e) {
    var scope = this;
    if(scope.loader) {
      let mouse =  e.clientX;
      let mousePour = (mouse * 100)/scope.width;  
      let timerPour = (9.95833 * mousePour)/100;
      scope.mouse = timerPour;

      let windowHalfX = scope.width / 2;
      scope.clientX = e.clientX;
   }


  }


  /**
  ** Events Resize windows
  **/  
  @HostListener('window:resize', ['$event'])
  public onResize(event: Event) {
    if (this.scene) {
      this.canvas.style.width = "100%";
      this.canvas.style.height = "100%";
      this.camera.aspect = this.getAspectRatio();
      this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);     
    }
  }

  /***
  *** LIFECYCLE
  ***/
  ngOnInit(): void
  {
    this.mouvementBg(this.bgsvg);
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