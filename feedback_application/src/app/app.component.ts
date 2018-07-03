import { Component } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private serverService: ServerService) {}
  yes_responses = 0;
  no_responses = 0;

  onYes() {
    this.serverService.storeResponse('yes')
    .subscribe(
      (_response) => {
        this.updateResp();
      }
    );
  }
  onNo() {
    this.serverService.storeResponse('no')
      .subscribe(
        (response) => console.log(response.text())
      );
  }

  updateResp() {
    this.serverService.getServers()
      .subscribe(
        (response) => {
          const r = JSON.parse(response.text());
          console.log(response.text());
          console.log(r.num_response);
          this.yes_responses = r.num_response;
        }
        // console.log(response.text()) // this.yes_responses = parseFloat(response.text())
      );
  }
}
