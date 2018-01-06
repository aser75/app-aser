import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { environment } from '../environments/environment';
import {Http} from "@angular/http";

declare var Snap: any;
declare var mina: any; 

@Component ({
	selector 		: 'contact-form',
	templateUrl 	: './view/form.component.html',	
    styles          : ['.message-succes { opacity:0; z-index:-1;position:fixed;left:50%;top:30%;transform: translate(-50%,-50%);width:150px;height:150px}.message-succes.green-message {opacity:1; z-index:999};']
})


export class FormComponent implements OnInit {

	// anime svg
    svg: any;
    s: any;

	rForm: FormGroup;
    // Une propriete pour le formulaire soumit
	post:any;                     
    // Var du formulaire
	nom:string  		 = '';
	tel:number;
	email:string		 = '';
	entreprise:string 	 = '';
	message: string 	 = '';
    // Var confirmation ou non d'envoie d'email
    succes: boolean      = false;
    probleme: boolean    = false;
    // Divers
	http : Http;
	endpoint : string;

	constructor(
        private fb: FormBuilder,
        http : Http) { 

    	this.rForm = fb.group({
    		'nom' : [null, Validators.required],
    		'tel' : [null, Validators.compose([Validators.required, Validators.min(1)])],
    		'email' : [null, Validators.compose([Validators.required, Validators.email])],
    		'entreprise' : '',
    		'message' : ''
    	});

    	this.http = http;
  	}


	ngOnInit(): void {
    	// Url du fichier php
    	this.endpoint = environment.url+"sendEmail.php";


        // anime succes message
        this.svg = document.getElementById("Layer_1");
        this.s   = Snap(this.svg);
        var path        = Snap.select('#line');
        statePetit();

        function statePetit() {
            path.animate({ d: "M15,50c0-4.9,1-9.5,2.8-13.7c0.8-1.8,1.7-3.5,2.7-5.1c0.6-1,1.3-1.9,2-2.8c0.2-0.3,0.5-0.6,0.7-0.9c1.4-1.7,3-3.2,4.6-4.6c2.5-2.1,5.4-3.8,8.4-5.1c1.2-0.5,2.4-0.9,3.6-1.3c1.8-0.5,3.6-0.9,5.5-1.2c1.5-0.2,3-0.3,4.6-0.3c7.7,0,14.8,2.5,20.6,6.7c1.5,1.1,2.9,2.3,4.2,3.6c1.1,1.1,2.2,2.3,3.1,3.6c0.5,0.6,0.9,1.2,1.3,1.9c0.5,0.8,1.1,1.7,1.5,2.6c2.7,5,4.3,10.7,4.3,16.7c0,3.7-0.6,7.3-1.7,10.7c-0.4,1.3-0.9,2.6-1.5,3.8c-0.5,1.1-1,2.1-1.6,3.2c-1.5,2.5-3.3,4.9-5.3,6.9c-1.7,1.7-3.6,3.3-5.7,4.6c-1.3,0.9-2.7,1.7-4.2,2.4c-1.8,0.9-3.7,1.6-5.7,2.1c-3,0.8-6.1,1.3-9.3,1.3c-7.8,0-15-2.5-20.8-6.9c-1.1-0.8-2.2-1.7-3.2-2.7c-1.7-1.6-3.2-3.3-4.6-5.2c-0.9-1.2-1.7-2.5-2.4-3.9c-0.6-1.1-1.2-2.3-1.6-3.5C15.9,58.9,15,54.5,15,50z" }, 600,mina.easein,stateSplash);
        }
        function stateSplash(){
            path.animate({ d: "M15,50c0-4.9,1-9.5,2.8-13.7c0.8-1.8-2.6-5.6-1.8-7.3c1-2,5.8,0.2,6.5-0.7c0.2-0.3,0.5-1,0.5-1.3c0-3-7-12-4-15s13,4,15,4c1.3,0,3.8-2.6,5-3c1.8-0.5,4.5,2.5,6.4,2.3c1.5-0.2,3-0.3,4.6-0.3c7.8,0,15,2.6,20.8,6.9C72,22.7,76,22,77,23c1,1,0,3,1,4c1,1,5-3,7-1s-4.7,6.4-4.2,7.4C83.5,38.3,85,44,85,50c0,3.7-0.6,7.3-1.7,10.7C82.9,62,87.6,66.8,87,68c-1,2-5.5,0.9-6,2c-1,2,6.1,13.9,4,16c-3,3-13.9-6.3-16-5c-1.3,0.9-0.5,5.3-2,6c-1.8,0.9-5.7-3.8-7.7-3.3c-3,0.8-6.1,1.3-9.3,1.3c-7.9,0-15.2-2.6-21-7c-1.5-1.1-7.7,2.4-9,1c-1.2-1.2,2.5-7.3,1.5-8.7c-1-1.3-5.7-0.8-6.5-2.3c-0.6-1.2,2.7-4.3,2.3-5.6C15.8,58.6,15,54.4,15,50z" }, 300,statePetitOther);
        }
        function statePetitOther() {
            path.animate({ d: "M15,50c0-4.9,1-9.5,2.8-13.7c0.8-1.8,1.7-3.5,2.7-5.1c0.6-1,1.3-1.9,2-2.8c0.2-0.3,0.5-0.6,0.7-0.9c1.4-1.7,3-3.2,4.6-4.6c2.5-2.1,5.4-3.8,8.4-5.1c1.2-0.5,2.4-0.9,3.6-1.3c1.8-0.5,3.6-0.9,5.5-1.2c1.5-0.2,3-0.3,4.6-0.3c7.7,0,14.8,2.5,20.6,6.7c1.5,1.1,2.9,2.3,4.2,3.6c1.1,1.1,2.2,2.3,3.1,3.6c0.5,0.6,0.9,1.2,1.3,1.9c0.5,0.8,1.1,1.7,1.5,2.6c2.7,5,4.3,10.7,4.3,16.7c0,3.7-0.6,7.3-1.7,10.7c-0.4,1.3-0.9,2.6-1.5,3.8c-0.5,1.1-1,2.1-1.6,3.2c-1.5,2.5-3.3,4.9-5.3,6.9c-1.7,1.7-3.6,3.3-5.7,4.6c-1.3,0.9-2.7,1.7-4.2,2.4c-1.8,0.9-3.7,1.6-5.7,2.1c-3,0.8-6.1,1.3-9.3,1.3c-7.8,0-15-2.5-20.8-6.9c-1.1-0.8-2.2-1.7-3.2-2.7c-1.7-1.6-3.2-3.3-4.6-5.2c-0.9-1.2-1.7-2.5-2.4-3.9c-0.6-1.1-1.2-2.3-1.6-3.5C15.9,58.9,15,54.5,15,50z" }, 600,mina.backin,stateGros);
        }
        function stateGros(){
            setTimeout(function () {
                path.animate({ d: "M7.5,50c0-5.9,1.2-11.5,3.4-16.6c0.9-2.2,2-4.3,3.3-6.3c0.8-1.2,1.6-2.3,2.4-3.4c0.3-0.4,0.6-0.7,0.9-1.1c1.7-2,3.6-3.9,5.6-5.5c3.1-2.5,6.5-4.6,10.3-6.2c1.4-0.6,2.9-1.1,4.4-1.6c2.1-0.6,4.4-1.1,6.6-1.4c1.8-0.2,3.7-0.4,5.6-0.4c9.3,0,18,3,25,8.1c1.8,1.3,3.5,2.8,5.1,4.3c1.4,1.4,2.6,2.8,3.8,4.4c0.6,0.7,1.1,1.5,1.6,2.3c0.7,1,1.3,2,1.9,3.1c3.3,6,5.2,13,5.2,20.3c0,4.5-0.7,8.9-2,13c-0.5,1.6-1.1,3.1-1.8,4.6c-0.6,1.3-1.3,2.6-2,3.8c-1.8,3.1-4,5.9-6.5,8.4c-2.1,2.1-4.4,4-6.9,5.6c-1.6,1.1-3.3,2-5.1,2.9c-2.2,1-4.5,1.9-6.9,2.6c-3.6,1-7.4,1.5-11.3,1.5c-9.5,0-18.2-3.1-25.3-8.3c-1.4-1-2.6-2.1-3.9-3.2c-2-1.9-3.9-4.1-5.5-6.4c-1.1-1.5-2-3.1-2.9-4.7c-0.7-1.4-1.4-2.8-2-4.3C8.5,60.8,7.5,55.5,7.5,50z" }, 300,mina.easeinout, statePetit );
            }, 10);
        }

	}

    // Fonction au click sur le subimt de la view
	sendMail()
    {

    	let postVars = {
    	  email  		: this.email,
    	  tel  			: this.tel,
    	  name  		: this.nom,
    	  message  		: this.message,
    	  entreprise  	: this.entreprise,
    	};
    	// Requete de type http Post sur le fichier PHP
    	this.http.post(this.endpoint, postVars)
    	    .subscribe(
            	response => {
                    if (response.status === 201)
                    { 
                        return this.succes = true;

                    }
                    else if (response.status === 200)
                    {
                        return this.succes = true;
                    }
                },
                error =>
                {
                    return this.probleme = true;
                }
            );
	}

}