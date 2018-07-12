import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ResponseService {
    constructor(private http: Http) {}

    storeResponse(response: string) {
        return this.http.post('http://localhost:8000/', response);
    }
    getResponse(y_n) {
        return this.http.get(`http://localhost:8000/response/${y_n}`);
    }

    resetResponse() {
        return this.http.get('http://localhost:8000/reset');
    }
}
