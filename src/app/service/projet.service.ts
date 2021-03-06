import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import 'rxjs/add/operator/toPromise';
import { Projet } from './projet';

@Injectable()
export class ProjetService {

	private projetsUrl = environment.apiUrl;
	
	constructor (private http: Http) {

	}

	getProjets(): Promise<Projet[]> {
		return this.http.get(this.projetsUrl)
				.toPromise()
				.then( response => response.json().data as Projet[] )
				.catch( this.handleError );
	}

	private handleError(error: any): Promise<any> {
	
		console.error('An error occurred', error); // for demo purposes only
  		return Promise.reject(error.message || error);
	
	}

	getProjet(id: number): Promise<Projet> {
    	return this.getProjets()
            .then(projets => projets.find(projet => projet.id === id));
  	}
}