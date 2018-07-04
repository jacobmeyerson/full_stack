import { Component, Output, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loggedInComplete = new EventEmitter<boolean>();

  constructor(private http: Http) { }

  onLogin(username, password) {
    const headers = new Headers();

    const base64 = btoa(username.value + ':' + password.value);

    headers.append('Authorization', 'Basic ' + base64);

    const url = 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/';

    const request = this.http.get(url, {
      headers: headers
    });

    request
    .subscribe(
      (response: Response) => {
        const data = response.json();
        if (data.authenticated) {
          this.loggedInComplete.emit(true);
          this.http.delete(url); // logs out - according to https://wiki.openmrs.org/display/docs/REST+Web+Services+API+For+Clients
      }
    });
  }
}
