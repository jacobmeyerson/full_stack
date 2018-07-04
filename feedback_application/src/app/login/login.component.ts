import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // loggedIn = false;
  @Output() loggedInComplete = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  onLogin(username, password) {
    this.loggedInComplete.emit(true);
    console.log(username.value, password.value);
  }
}
