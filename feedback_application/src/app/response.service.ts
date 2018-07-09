import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ResponseService {
    credentials = 'init';

    constructor(private http: Http) {
    }

    storeCredentials(credentials: string) {
        this.credentials = credentials;
    }

    storeResponse(response: string) {
        console.log(this.credentials);
        return this.http.post('http://localhost:3000/', response);
    }

    getResponse(y_n) {
        return this.http.get(`http://localhost:3000/yes_no/${y_n}`);
    }

    resetResponse() {
        return this.http.get('http://localhost:3000/reset');
    }

}
