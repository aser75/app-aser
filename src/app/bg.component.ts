import { Component, OnInit, OnDestroy, AfterViewInit,  ElementRef, Input, OnChanges, SimpleChange, ViewChild, HostListener }     from '@angular/core';
import { Location, isPlatformBrowser, isPlatformServer }                                              from '@angular/common';
import { Subscription }                                                                               from 'rxjs/Subscription';
import { FondService }                                                                                from './service/fond.service';
import { NgForm }                                                                                       from '@angular/forms';

import * as THREE from 'three';
import "./js/EnableThreeExamples";
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
  public typeAnime:boolean = false;
  public mouseLook = {x:0,y:0};
  public clientX;
  public width;
  public height;
  public loader = false;
  public batiment4:any;
  public batiment3:any;
  public batiment2:any;
  public batiment1:any;
  public arbre1:any;
  public arbre2:any;
  public arbre3:any;
  public arbre4:any;
  public LampadaireLeft:any;
  public LampadaireRight:any;
  public lightRight:any;
  public lightLeft:any;  
  public typeVisble: boolean;
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

    this.onModelSideRightBatimentA    = this.onModelSideRightBatimentA.bind(this);
    this.onModelSideRightBatimentB    = this.onModelSideRightBatimentB.bind(this);
    this.onModelSideLeftBatimentA     = this.onModelSideLeftBatimentA.bind(this);
    this.onModelSideLeftBatimentB     = this.onModelSideLeftBatimentB.bind(this);
    this.onModelArbreA                = this.onModelArbreA.bind(this);
    this.onModelArbreD                = this.onModelArbreD.bind(this);
    this.onModelampadaireSideRight    = this.onModelampadaireSideRight.bind(this);
    this.onModelampadaireSideLeft     = this. onModelampadaireSideLeft.bind(this);
    this.onModeArbreB                 = this. onModeArbreB.bind(this);
    this.onModeArbreC                 = this. onModeArbreC.bind(this);
    this.render                       = this.render.bind(this);
    this.lastTime                     = 0;
    this.clientX                      = 0;
    this.clock                        = new THREE.Clock();
    this.width                        = window.innerWidth;
    this.height                       = window.innerHeight;
  }

  /**
  ** Function SVG
  ** Mouvement du svg en fonction de la page
  **/
  mouvementBg( type: string ): void
  {
   var scope = this;

      if(type == "bas") 
      {
        if(scope.scene)
        {
          scope.actionAll(false);
        }
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

            /*
            * Si la scene Three existe deja
            */
            if (!scope.scene && scope.width > 768)
            {
              scope.init(true);
            } 
            else
            {
              scope.actionAll(true);
            }
          }
        });
      }
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
            /*
            * Si la scene Three existe deja
            */
            if (scope.scene && scope.width > 768)
            {
              scope.actionLight();
            }
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
  
  public init(typeVisble)
  {
    var scope          = this;
    scope.scene        = new THREE.Scene();
    scope.typeVisble   = typeVisble;

    /*
    ** Camera
    */
    scope.camera = new THREE.PerspectiveCamera( 45, scope.width / scope.height, 1, 2000 );
    scope.camera.position.set(0, 0, 4);
    scope.camera.lookAt( scope.scene.position );
    
    /*
    ** Ambiance Light
    */
    var ambient = new THREE.HemisphereLight( 0xeebc4d, 0xffffff, 0.6 );
    scope.scene.add( ambient );

    /*
    ** Dircetion Light
    */
    var light                           = new THREE.DirectionalLight(0xebf3ff,1);
    light.position.set(0, 1.2, 0.4);
    light.castShadow                    = true;
    light.shadow.camera.near            = 50;
    light.shadow.bias                   = 0.00009;
    var d                               = 390;
    light.shadow.camera.top             = d * 1.5;
    light.shadow.camera.bottom          = -d;
    light.shadow.camera.far             = 2500;
    scope.scene.add(light);

    /*
    ** Light Front
    */
    var lightFront = new THREE.PointLight(0xffffff, 1, 1 );
    lightFront.position.set(0, 1, 1);
    this.scene.add(lightFront);

    /*
    ** Light Lampadaire Right
    */
    var spotlightRight                                 = new THREE.SpotLight(0xfaf5e3);
    spotlightRight.intensity                           = 0.5;
    spotlightRight.name                                = "lightRight";
    spotlightRight.position.set(0.755, 0.865, 0 );
    scope.scene.add(spotlightRight);
    var lightTargetRight                               = new THREE.Object3D();
    lightTargetRight.position.set(0.755, 0.5, 0 );
    scope.scene.add(lightTargetRight);
    spotlightRight.target                              = lightTargetRight;
    var sphereRight                                    = new THREE.SphereBufferGeometry(  0.01, 0.01, 0.01 , 0, 1.5, 2 );
    spotlightRight.add( new THREE.Mesh( sphereRight, new THREE.MeshBasicMaterial( { color: 0xffFFFF } ) ) );
    spotlightRight.visible                             = scope.typeVisble;

    /*
    ** Light Lampadaire Left
    */
    var spotlightLeft                                  = new THREE.SpotLight(0xfaf5e3);
    spotlightLeft.intensity                            = 0.6;
    spotlightLeft.name                                 = "lightLeft";
    spotlightLeft.position.set(-0.755, 0.865, 0);
    scope.scene.add(spotlightLeft);
    var lightTarget                                    = new THREE.Object3D();
    lightTarget.position.set(-0.755, 0.5, 0);
    scope.scene.add(lightTarget);
    spotlightLeft.target                               = lightTarget;
    var sphereLeft                                     = new THREE.SphereBufferGeometry( 0.01, 15, 15, 0, 6.3, 1, 2.4 );
    spotlightLeft.add( new THREE.Mesh( sphereLeft, new THREE.MeshBasicMaterial( { color: 0xffFFFF } ) ) );
    spotlightLeft.visible                              = scope.typeVisble;

    /*
    ** Loading manager
    */    
    var manager = new THREE.LoadingManager();
    manager.onLoad = function() {
      scope.loader = true;
    };

    var objectLoader = new THREE.JSONLoader(manager);

    objectLoader.load("assets/model/Batiment-1.json", this.onModelSideRightBatimentA);
    objectLoader.load("assets/model/Batiment-4.json", this.onModelSideLeftBatimentA);
    objectLoader.load("assets/model/Batiment-2.json", this.onModelSideRightBatimentB);
    objectLoader.load("assets/model/Batiment-5.json", this.onModelSideLeftBatimentB);
    objectLoader.load("assets/model/arbre-type1.json", this.onModelArbreA);
    objectLoader.load("assets/model/arbre-type2.json", this.onModeArbreC);
    objectLoader.load("assets/model/lampadaire.json", this.onModelampadaireSideRight);
    objectLoader.load("assets/model/lampadaire-1.json", this.onModelampadaireSideLeft);
    objectLoader.load("assets/model/arbre-type2.json", this.onModeArbreB);
    objectLoader.load("assets/model/arbre-type1.json", this.onModelArbreD);
  }

  private onModelSideLeftBatimentB(geometry, materials) {
    var scope = this;
    
    for ( var i = 0; i < materials.length; i ++ ) {
      var m = materials[ i ];
      m.skinning = true;
    }

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(-1.05, 0.3, -1.4);
    scope.mesh.scale.set(0.20,0.20, 0.20);
    scope.mesh.name         = "batiment4";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('batiment4').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;

    if (scope.mesh.geometry['animations'])
    {
      var mixer                       = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation               = scope.mesh.geometry['animations'][ 0 ];
      let pauseAnimation              = scope.mesh.geometry['animations'][ 1 ];  
      let left                        = mixer.clipAction( leftAnimation );
      let pause                       = mixer.clipAction( pauseAnimation );
      scope.actions.push (left );      
      left.clampWhenFinished          = true;
      pause.clampWhenFinished         = true;
      scope.activeAction              = scope.actions[1];
      left.play();
    }

    scope.render(scope.mixers);
  }

  private onModelSideLeftBatimentA(geometry, materials) {
    var scope = this;
    
    for ( var i = 0; i < materials.length; i ++ ) {
          var m = materials[ i ];
          m.skinning = true;
    }

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(-1.25, 0.3, -0.5);
    scope.mesh.scale.set(0.20,0.20, 0.20);
    scope.mesh.name                                      = "batiment3";  
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('batiment3').visible     = scope.typeVisble; 
    scope.mesh.castShadow                                = true;
    scope.mesh.receiveShadow                             = true;

    if (scope.mesh.geometry['animations'])
    {
      var mixer                                          = new THREE.AnimationMixer(scope.mesh);
      scope.mixers.push(mixer);
      let leftAnimation                                  = scope.mesh.geometry['animations'][ 1 ];
      let pauseAnimation                                 = scope.mesh.geometry['animations'][ 2 ];  
      let left                                           = mixer.clipAction( leftAnimation );
      let pause                                          = mixer.clipAction( pauseAnimation );
      scope.actions.push (left );      
      left.clampWhenFinished                             = true;
      pause.clampWhenFinished                            = true;
      scope.activeAction                                 = scope.actions[1];
      left.play();
    }

    scope.render(scope.mixers);
  }

  private onModelampadaireSideRight(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);
   
    scope.mesh.position.set(0.86, 0.3, 0);
    scope.mesh.scale.set(0.6,0.6, 0.6);

    scope.mesh.name                 = "LampadaireRight";

    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('LampadaireRight').visible = scope.typeVisble;
    scope.mesh.castShadow           = true;
    scope.mesh.receiveShadow        = true;

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

  private onModelampadaireSideLeft(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(-0.86, 0.3, 0);
    scope.mesh.scale.set(0.6,0.6, 0.6);
    scope.mesh.name = "LampadaireLeft";

    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('LampadaireLeft').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;

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

  private onModeArbreC(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(1.75, 0.3, 0);
    scope.mesh.scale.set(0.42,0.42,0.42);
    scope.mesh.name   = "arbre1";

    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('arbre1').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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

  private onModeArbreB(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(-1.2, 0.3, 0.3);
    scope.mesh.scale.set(0.42,0.42, 0.42);
    scope.mesh.name = "arbre2";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('arbre2').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "arbre3";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('arbre3').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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

  private onModelArbreD(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(-1.6, 0.3, -0.2);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "arbre4";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('arbre4').visible = scope.typeVisble;
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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

  private onModelSideRightBatimentA(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(1.35, 0.3, 0);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "batiment1";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('batiment1').visible = scope.typeVisble;

    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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

  private onModelSideRightBatimentB(geometry, materials) {
    var scope = this;
    
    materials.forEach(function (material) {
      material.skinning = true;
    });

    var material      = new THREE.MeshFaceMaterial(materials);
    scope.mesh        = new THREE.SkinnedMesh(geometry,material);

    scope.mesh.position.set(1.15, 0.3, -0.5);
    scope.mesh.scale.set(0.22,0.22, 0.22);
    scope.mesh.name = "batiment2";
    scope.scene.add(scope.mesh);
    scope.scene.getObjectByName('batiment2').visible = scope.typeVisble;    
    scope.mesh.castShadow = true;
    scope.mesh.receiveShadow = true;
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

    /*
    *** Config Renderer
    */
    this.renderer = new THREE.WebGLRenderer({
        canvas: this.canvas,
        antialias: true,
        alpha: true,
    });
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap; 
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.autoClear = true;
    this.renderer.setSize( self.width, self.height );
    /*
    *** Fin Config Renderer
    */


    (function render(){
        requestAnimationFrame(render);

        if(self.clock)
        {
          let time         = Number(self.mouse);
          let delta        = time - self.lastTime;
          self.lastTime    = time; 

          for ( var i = 0; i < mixers.length; i++ ) {
            mixers[i].update(delta);        
          }
          self.renderer.render(self.scene, self.camera);
        }

    }());
  }

  /**
  ** Garder Ratio canvas
  **/
  private getAspectRatio(): number
  {
    let height = this.canvas.clientHeight;
      if (height === 0) {
        return 0;
      }
    return this.canvas.clientWidth / this.canvas.clientHeight;
  }


  /**
  ** Invisible all objects
  **/
  private actionAll(type)
  {
    if(this.scene) {

      this.batiment4         = this.scene.getObjectByName('batiment4');
      this.batiment3         = this.scene.getObjectByName('batiment3');
      this.batiment2         = this.scene.getObjectByName('batiment2');
      this.batiment1         = this.scene.getObjectByName('batiment1');
      this.arbre1            = this.scene.getObjectByName('arbre1');
      this.arbre2            = this.scene.getObjectByName('arbre2');
      this.arbre3            = this.scene.getObjectByName('arbre3');
      this.arbre4            = this.scene.getObjectByName('arbre4');
      this.LampadaireLeft    = this.scene.getObjectByName('LampadaireLeft');
      this.LampadaireRight   = this.scene.getObjectByName('LampadaireRight');
      this.lightRight        = this.scene.getObjectByName('lightRight');
      this.lightLeft        = this.scene.getObjectByName('lightLeft');

      if ( this.batiment4 )
      {
        this.batiment4.visible = type;
      }
      if ( this.batiment3 )
      {
        this.batiment3.visible = type;
      }
      if ( this.batiment2 )
      {
        this.batiment2.visible = type;
      }
      if ( this.batiment1 )
      {
        this.batiment1.visible = type;
      }
      if ( this.arbre4 )
      {
        this.arbre4.visible = type;
      }
      if ( this.arbre3 )
      {
        this.arbre3.visible = type;
      }
      if ( this.arbre2 )
      {
        this.arbre2.visible = type;
      }
      if ( this.arbre1 )
      {
        this.arbre1.visible = type;
      }
      if ( this.LampadaireLeft )
      {
        this.LampadaireLeft.visible = type;
      }
      if ( this.LampadaireRight )
      {
        this.LampadaireRight.visible = type;
      }
      if ( this.lightRight )
      {
        this.lightRight.visible = type;
      }
      if ( this.lightLeft )
      {
        this.lightLeft.visible = type;
      }
    }
  }

  /**
  ** Invisible all objects
  **/
  private actionLight()
  {
    this.batiment4         = this.scene.getObjectByName('batiment4');
    this.batiment3         = this.scene.getObjectByName('batiment3');
    this.batiment2         = this.scene.getObjectByName('batiment2');
    this.batiment1         = this.scene.getObjectByName('batiment1');
    this.arbre1            = this.scene.getObjectByName('arbre1');
    this.arbre2            = this.scene.getObjectByName('arbre2');
    this.arbre3            = this.scene.getObjectByName('arbre3');
    this.arbre4            = this.scene.getObjectByName('arbre4');
    this.LampadaireLeft    = this.scene.getObjectByName('LampadaireLeft');
    this.LampadaireRight   = this.scene.getObjectByName('LampadaireRight');
    this.lightRight        = this.scene.getObjectByName('lightRight');
    this.lightLeft        = this.scene.getObjectByName('lightLeft');

    if(this.scene) {
      if ( this.batiment4 ) {
        this.batiment4.visible = false;
      }
      if ( this.batiment3 ) {
        this.batiment3.visible = true;
      }
      if ( this.batiment2 ) {
        this.batiment2.visible = false;
      }
      if ( this.batiment1 ) {
        this.batiment1.visible = true;
      }
      if ( this.arbre4 ) {
        this.arbre4.visible = false;
      }
      if ( this.arbre3 ) {
        this.arbre3.visible = false;
      }
      if ( this.arbre2 ) {
        this.arbre2.visible = false;
      }
      if ( this.arbre1 ) {
        this.arbre1.visible = false;
      }
      if ( this.LampadaireLeft ) {
        this.LampadaireLeft.visible = true;
      }
      if ( this.LampadaireRight ) {
        this.LampadaireRight.visible = true;
      }
      if ( this.lightRight ) {
        this.lightRight.visible = false;
      }
      if ( this.lightLeft ) {
        this.lightLeft.visible = false;
      }
    }
  }

  /**
  ** Events Mouse Move
  **/  
  @HostListener('document:mousemove', ['$event'])
  public onMouseMove(e)
  {

    var scope = this;
    if( scope.loader &&  e.clientY < 560 )
    {
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
  {}

  ngOnDestroy(): void 
  {}




}