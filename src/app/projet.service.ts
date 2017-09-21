import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Projet } from './projet';


@Injectable()
export class ProjetService {

	private url = 'api/fichier.json';  // URL to web api
	constructor(private http: Http) { }

	getProjets(): Promise<Projet[]> {
		

		return this.http.get(this.url)
             .toPromise()
             .then(response => response.json().data as Projet[])
             .catch(this.handleError);

	}

	private handleError(error: any): Promise<any> {
  		console.error('An error occurred', error); // for demo purposes only
  		return Promise.reject(error.message || error);
	}

	getProjet(id: number): Promise<Projet> {
		const url = `${this.url}/${id}`;

		return this.http.get(url)
    		.toPromise()
    		.then(response => response.json().data as Projet)
    		.catch(this.handleError);
	}
}