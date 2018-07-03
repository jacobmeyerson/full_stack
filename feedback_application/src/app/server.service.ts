import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    storeResponse(response: string) {
        // console.log(this.http.post('https://udemy-http-59048.firebaseio.com/ampath.json', [response]));
        return this.http.post('http://localhost:3000/', response);
    }
    getServers() {
        return this.http.get('http://localhost:3000/');
    }
}
