import { Component, OnInit } from '@angular/core';
import { ResponseService } from '../response.service';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css']
})
export class SurveyComponent implements OnInit {
  yes_responses: Number;
  no_responses: Number;

  constructor(private responseService: ResponseService) {}

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

  ngOnInit() {
    this.updateResp('yes');
    this.updateResp('no');
  }

}
