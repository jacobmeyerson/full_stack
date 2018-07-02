import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class ServerService {
    constructor(private http: Http) {}
    storeServers(servers: any[]) {
        return this.http.post('https://udemy-http-59048.firebaseio.com/viv.json', servers);
    }
    storeResponse(response: string) {
        return this.http.post('https://udemy-http-59048.firebaseio.com/ampath.json', [response]);
    }
    getServers() {
        return this.http.get('http://localhost:3000/');
    }
}
