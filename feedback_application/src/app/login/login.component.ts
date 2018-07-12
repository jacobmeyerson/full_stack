import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() loggedInComplete = new EventEmitter<boolean>();

  constructor(private http: Http) { }

  onLogin(username, password) {
    const headers = new Headers();

    const credentials = btoa(username.value + ':' + password.value);

    headers.append('Authorization', 'Basic ' + credentials);

    const url = 'https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/session/';

    const request = this.http.get(url, {
      headers: headers
    });

    request
    .subscribe(
      (response: Response) => {
        const data = response.json();
        if (data.authenticated) {
          console.log('authenticated!');
          this.loggedInComplete.emit(true);
          this.http.delete(url, {
            headers: headers}); // logs out - according to https://wiki.openmrs.org/display/docs/REST+Web+Services+API+For+Clients
      }
    });
  }

  ngOnInit () {}
  //   const headers = new Headers();

  //   const credentials = btoa('john:studio');

  //   headers.append('Authorization', 'Basic ' + credentials);

  //   const request = this.http.get('http://localhost:8000/reset', {
  //     headers: headers
  //   });
  //   request.subscribe(
  //     (response: Response) => console.log('Aunthentication is successful')
  //   );
  // }
}
