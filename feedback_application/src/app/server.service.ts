import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}

    storeResponse(response: string) {
        return this.http.post('http://localhost:3000/', response);
    }
    getServers(y_n) {
        // console.log(`http://localhost:3000/${y_n}`);
        return this.http.get(`http://localhost:3000/${y_n}`);
    }
}
