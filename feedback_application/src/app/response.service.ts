import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ResponseService {
    credentials = 'init';
    headers;

    constructor(private http: Http) {
    }

    storeCredentials(credentials: string) {
        console.log(credentials, 'STORECRED');
        this.credentials = credentials;
        this.headers = new Headers();
        const base64 = btoa(credentials);
        this.headers.append('Authorization', 'Basic ' + base64);
        console.log('credentials stored');
    }

    storeResponse(response: string) {
        // console.log(this.credentials);
        return this.http.post('http://localhost:3000/', response, {
            headers: this.headers
          });
    }

    getResponse(y_n) {
        console.log(this.credentials);
        // const headers = new Headers();
        // const base64 = btoa('jmeyerson' + ':' + 'Ampath123');
        // headers.append('Authorization', 'Basic ' + base64);
        return this.http.get(`http://localhost:3000/yes_no/${y_n}`, {
            headers: this.headers
          });
    }

    resetResponse() {
        return this.http.get('http://localhost:3000/reset', {
            headers: this.headers
          });
    }

}
