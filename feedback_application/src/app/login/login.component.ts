import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ResponseService } from '../response.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedInComplete = new EventEmitter<boolean>();

  // headers;

  constructor(private http: Http, private responseService: ResponseService) { }

  onLogin(username, password) {
    this.responseService.storeCredentials('bob');

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
          // this.http.delete(url, {
          //   headers: headers}); // logs out - according to https://wiki.openmrs.org/display/docs/REST+Web+Services+API+For+Clients
      }
    });
  }

  ngOnInit () {
    // for demonstration purposes only; code copied from onLogin()
    const headers = new Headers();

    const base64 = btoa('jmeyerson:Ampath123');

    headers.append('Authorization', 'Basic ' + base64);

    const request = this.http.get('http://localhost:3000/reset', {
      headers: headers
    });
    request.subscribe(
      (response: Response) => console.log('Got it')
    );
  }
}
