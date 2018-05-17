import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Categorie } from './categorie';

@Injectable()
export class CategorieService {

	private categorieUrl = environment.apiCat;
	
	constructor (private http: Http) {}

	getCategorie(): Promise<Categorie[]> {
		return this.http.get(this.categorieUrl)
				.toPromise()
				.then( response => response.json().data as Categorie[] )
				.catch( this.handleError );
	}

	private handleError(error: any): Promise<any> {
	
		console.error('An error occurred', error); // for demo purposes only
  		return Promise.reject(error.message || error);
	
	}
}