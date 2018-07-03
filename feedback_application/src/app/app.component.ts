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
        this.updateResp('yes');
      }
    );
  }
  onNo() {
    this.serverService.storeResponse('no')
      .subscribe(
        (_response) => {
          this.updateResp('no');
        }
      );
  }

  updateResp(y_n) {
    this.serverService.getServers(y_n)
      .subscribe(
        (response) => {
          const r = JSON.parse(response.text());
          if (y_n === 'yes') {
            this.yes_responses = r.num_response;
          } else {
            this.no_responses = r.num_response;
          }
        }
      );
  }
}
