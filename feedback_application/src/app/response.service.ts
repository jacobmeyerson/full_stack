import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ResponseService {
    credentials = 'init';
    headers;

    constructor(private http: Http) {
    }

    setCredentials(header) {
        this.headers = header;
    }

    storeResponse(response: string) {
        return this.http.post('http://localhost:3000/', response, {
            headers: this.headers
          });
    }

    getResponse(y_n) {
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
