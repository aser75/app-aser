import { Injectable } from '@angular/core';

import { Projet } from './projet';
import { PROJETS } from './mock-projets';

@Injectable()
export class ProjetService {
	getProjets(): Promise<Projet[]> {
		return Promise.resolve(PROJETS);
	}
}