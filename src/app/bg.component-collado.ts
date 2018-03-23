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
	selector		: 'bg',
	templateUrl		: './view/bg.component.html',
})


export class BgComponent implements OnInit, OnDestroy, OnChanges, AfterViewInit {

  @Input() bgsvg: string;
  relativePath: string;
  message: any;
  subscription: Subscription;
  mousePos:any;
  modelScene: any;


  /**
  ** Import three test
  **/
    private renderer: THREE.WebGLRenderer;
    private camera: THREE.PerspectiveCamera;
    private cameraTarget: THREE.Vector3;
    public scene: THREE.Scene;

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
    this.render = this.render.bind(this);
    this.onModelLoadingCompleted = this.onModelLoadingCompleted.bind(this);
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

    /**
    ** Creation de la scene
    **/
    private createScene() {
      this.scene = new THREE.Scene();
      var loader = new THREE.ColladaLoader();
      loader.load('assets/model/Batiment.dae', this.onModelLoadingCompleted);
    }

    /*
    * Parametre de l'import dae
    */
    public onModelLoadingCompleted(collada) {
        this.modelScene = collada.scene;
        this.modelScene.scale.set(5,5,5);
        this.modelScene.position.y = 10;
        this.scene.add(this.modelScene);
        this.render();
    }

    /**
    ** Creation de la lumiere de la scene
    **/
    private createLight() {
        var light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(0, 0, 100);
        this.scene.add(light);

        var light = new THREE.PointLight(0xffffff, 1, 1000);
        light.position.set(0, 0, -100);
        this.scene.add(light);
    }

    /**
    ** Rendu de la scene
    **/
    public render()
    {
      this.updateCube();
      this.renderer.render(this.scene, this.camera);
    }

    /**
    ** Animation
    **/
    private updateCube()
    {
      if (this.modelScene) {
      this.modelScene.rotation.x += this.rotationSpeedX;
      this.modelScene.position.y = this.mousePos.y;
      this.modelScene.position.x = this.mousePos.x;
      this.modelScene.position.y = this.mousePos.y;
    }
    }

    public normalize(v,vmin,vmax,tmin, tmax)
    {
      var nv = Math.max(Math.min(v,vmax), vmin);
      var dv = vmax-vmin;
      var pc = (nv-vmin)/dv;
      var dt = tmax-tmin;
      var tv = tmin + (pc*dt);
      return tv;
    }

    private createCamera() {
        let aspectRatio = this.getAspectRatio();
        this.camera = new THREE.PerspectiveCamera(
            this.fieldOfView,
            aspectRatio,
            this.nearClippingPane,
            this.farClippingPane
        );

        // Set position and look at
        this.camera.position.x = 10;
        this.camera.position.y = 10;
        this.camera.position.z = 100;
    }

    private getAspectRatio(): number {
        let height = this.canvas.clientHeight;
        if (height === 0) {
            return 0;
        }
        return this.canvas.clientWidth / this.canvas.clientHeight;
    }

    private startRendering() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.renderer.setPixelRatio(devicePixelRatio);
        this.renderer.setSize(this.canvas.clientWidth, this.canvas.clientHeight);

        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xffffff, 0);
        this.renderer.autoClear = true;

        let component: BgComponent = this;

        (function render() {
            requestAnimationFrame(render);
//            component.updateCube();
            component.render();
        }());
    }

    public addControls() {
        //this.controls = new THREE.OrbitControls(this.camera);
        //this.controls.rotateSpeed = 1.0;
        //this.controls.zoomSpeed = 1.2;
        //this.controls.addEventListener('change', this.render);
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
    this.createScene();
    this.createLight();
    this.createCamera();
    this.startRendering();
    this.addControls();
  }

  ngOnDestroy(): void 
  {}



  /***
  ***
  *** Events
  *** 
  ***/
  @HostListener('document:mousemove', ['$event']) 
  public onMouseMove(e) {

    var tx = -1 + (e.clientX / this.renderer.domElement.clientWidth)*2;
    var ty = -1 + (e.clientX / this.renderer.domElement.clientHeight)*2;
    
    this.mousePos = {x:tx, y:ty};

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

  private findAllObjects(pred: THREE.Object3D[], parent: THREE.Object3D) {

      if (parent.children.length > 0) {
          parent.children.forEach((i) => {
              pred.push(i);
              this.findAllObjects(pred, i);                
          });
      }
  }

}