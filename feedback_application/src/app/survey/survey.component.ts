import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../response.service';
import { Http, Response } from '@angular/http';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent {
  yes_responses: Number;
  no_responses: Number;

  constructor(private responseService: ResponseService, private http: Http) {}

  onYes() {
    this.responseService.storeResponse('yes')
    .subscribe(
      (_response) => {
        this.updateResp('yes');
      }
    );
  }

  onNo() {
    this.responseService.storeResponse('no')
      .subscribe(
        (_response) => {
          this.updateResp('no');
        }
      );
  }

  onReset() {
    this.responseService.resetResponse()
      .subscribe(
        (_response) => {
          this.updateResp('no');
          this.updateResp('yes');
        }
      );
  }

  updateResp(y_n) {
    this.responseService.getResponse(y_n)
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


  onGetLocation() {
    // const location = this.http.get('https://ngx.ampath.or.ke/test-amrs/ws/rest/v1/location?v=default/');

    this.responseService.getLocation()
    .subscribe(
      (response: Response) => {
        console.log(response.json().results);
      });

  }
}
