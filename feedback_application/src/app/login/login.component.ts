import { Component, Output, EventEmitter } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { ResponseService } from '../response.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  @Output() loggedInComplete = new EventEmitter<boolean>();

  constructor(private http: Http, private responseService: ResponseService) { }

  onLogin(username, password) {
    const headers = new Headers();
    const base64 = btoa(username.value + ':' + password.value);
    headers.append('Authorization', 'Basic ' + base64);

    this.responseService.storeCredentials(headers);

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
      }
    });

  }

  onLogout() {
    console.log('logout');
  }


}
