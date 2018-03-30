import { Component, OnInit, OnDestroy, AfterViewInit,  ElementRef, Input, OnChanges, SimpleChange, ViewChild, HostListener }     from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer }                                              from '@angular/common';
import { Subscription }                                                                               from 'rxjs/Subscription';
import { FondService }                                                                                from './service/fond.service';

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

  helpset: any;
  mousePos:any;
  modelScene: any;


  /**
  ** Import three test
  **/
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.PerspectiveCamera;
  private cameraTarget: THREE.Vector3;
  public scene: THREE.Scene;
  public mesh: THREE.Mesh;

  public fieldOfView: number = 60;
  public nearClippingPane: number = 1;
  public farClippingPane: number = 1100;

  public controls: THREE.OrbitControls;

  @ViewChild('canvas')
  private canvasRef: ElementRef;  
  public rotationSpeedX: number = 0.005;
  public rotationSpeedY: number = 0.01;
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

    /**
    ** Import three test
    **/   
    this.mousePos = {x:0, y:0};
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
  *** Code Three
  *** 
  ***/
  private get canvas(): HTMLCanvasElement {
    return this.canvasRef.nativeElement;
  }
  
  public init() {
    var scope = this;
    scope.camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    scope.camera.position.z = 4;

    scope.scene = new THREE.Scene();
    
    var ambient = new THREE.AmbientLight( 0x444444 );
    scope.scene.add( ambient );

    var directionalLight = new THREE.DirectionalLight( 0xffeedd );
    directionalLight.position.set( 0, 1, 1 ).normalize();
    scope.scene.add( directionalLight );

    var mesh = new THREE.Object3D();
    var objectLoader = new THREE.JSONLoader();

    objectLoader.load("assets/model/test5.json", 
    function (geometry, materials) {
        
       // materials.forEach(function (material) {
       //         material.skinning = true;
       //});
        var material = new THREE.MeshFaceMaterial(materials);
        //var material = new THREE.MeshLambertMaterial ({skinning:true});
        scope.mesh = new THREE.SkinnedMesh(geometry,material);
        scope.mesh.name = 'batiment';
        scope.scene.add(scope.mesh);
    });

    scope.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true
    });

    scope.renderer.setPixelRatio( window.devicePixelRatio );
    scope.renderer.setSize( window.innerWidth, window.innerHeight );
    let component: BgComponent = this;

    (function render() {
        requestAnimationFrame(render);
        component.render();
    }());
  }

  public render() {
    if(this.mesh) {
      //this.mesh.skeleton.bones[3].matrixAutoUpdate = true;
      //this.mesh.skeleton.bones[3].matrixWorldNeedsUpdate = true;
      //this.mesh.skeleton.bones[3].position.x += 0.0268739;

    }
    
    this.renderer.render( this.scene, this.camera );
    this.animeTest();
  }


  /**
  ** Action with Three
  **/
  public removeEntity() {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    selectedObject.visible = false;
    console.log("remove");
  }

  public addEntity() {
    var scope = this;
    var selectedObject = scope.scene.getObjectByName('batiment');
    selectedObject.visible = true;
    console.log("add");
  }

  public animeTest() {

    if(this.scene.getObjectByName('batiment')){
      //this.scene.getObjectByName('batiment').rotation.x += 0.01;
      //this.scene.getObjectByName('batiment').rotation.y += 0.01;
    }

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