import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, EmailValidator } from '@angular/forms';
import {Http} from "@angular/http";

@Component ({
	selector 		: 'contact-form',
	templateUrl 	: './view/form.component.html',	
})

export class FormComponent implements OnInit {
	
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

	constructor(private fb: FormBuilder, http : Http) { 

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
    	this.endpoint = "http://parc2ce.projets.predprodaser.ovh/sendEmail.php";	

	}

    // Fionction au click sur le subimt de la view
	sendMail() {
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
                    if (response.status === 201) { 
                        return this.succes = true;
                    }
                     else if (response.status === 200) {
                        return this.succes = true;
                    }
                },
                error => {
                    return this.probleme = true;
                }
            )
	}


}