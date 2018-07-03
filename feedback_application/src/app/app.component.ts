import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private serverService: ServerService) {}

  onYes() {
    this.serverService.storeResponse('yes')
    .subscribe(
      (response) => console.log(response)
    );
  }
  onNo() {
    this.serverService.storeResponse('no')
      .subscribe(
        (response) => console.log(response)
      );
  }
}
