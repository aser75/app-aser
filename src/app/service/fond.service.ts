import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FondService {

	private subject = new Subject<any>();

	typeA(message: string) {
        this.subject.next({ text: message });
    }

	getType():  Observable <any> {
		 return this.subject.asObservable();
	}

}