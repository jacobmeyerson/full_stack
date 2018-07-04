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
    this.loggedInComplete.emit(true);
    console.log(username.value, password.value);

    const headers = new Headers();

    const base64 = btoa('jmeyerson' + ':' + 'Ampath123');

    headers.append('Authorization', 'Basic ' + base64);

    const url = 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/'; // this.getUrl();

    const request = this.http.get(url, {
      headers: headers
    });

    request
    .subscribe(
      (response: Response) => {
        console.log(response.text());
        const data = response.json();
        if (data.authenticated) {
          console.log('authenticated');
      }
    });
  }
}
// OPENMRS_REST_SUFFIX = 'ws/rest/v1/'

// if (this.getOpenmrsServer().endsWith('/')) {
//   return this.getOpenmrsServer() + AppSettingsService.OPENMRS_REST_SUFFIX;


// 'https://ngx.ampath.or.ke/test-amrs/'