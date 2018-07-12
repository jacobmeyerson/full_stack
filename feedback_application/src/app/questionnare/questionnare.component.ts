import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-questionnare',
  templateUrl: './questionnare.component.html',
  styleUrls: ['./questionnare.component.css']
})
export class QuestionnareComponent{
  json = {
    "title": "POC Patient Feedback",
    "pages": [
     {
      "name": "page1",
      "elements": [
       {
        "type": "radiogroup",
        "name": "Select Gender",
        isRequired: true,
        "choices": [
         "Male",
         "Female",
        ]
       }
      ]
     },
     {
      "name": "page2",
      "elements": [
       {
        "type": "matrix",
        "name": "Quality",
        isRequired: true,
        "title": "Please indicate if you agree or disagree with the following statements",
        "columns": [
         {
          "value": 1,
          "text": "Strongly Disagree"
         },
         {
          "value": 2,
          "text": "Disagree"
         },
         {
          "value": 3,
          "text": "Neutral"
         },
         {
          "value": 4,
          "text": "Agree"
         },
         {
          "value": 5,
          "text": "Strongly Agree"
         }
        ],
        "rows": [
         {
          "value": "affordable",
          "text": "Is the service Quick?"
         },
         {
          "value": "does what it claims",
          "text": "WOuld you prefer visiting us"
         },
         {
          "value": "better then others",
          "text": "Is our service better than others"
         },
         {
          "value": "easy to use",
          "text": "Our staff are co-operative"
         }
        ]
       }
      ]
     },
     {
      "name": "page3",
      "elements": [
       {
        "type": "radiogroup",
        "name": "price to competitors",
        "title": "Do you feel our staff are",
        isRequired: true,
        "choices": [
         "lazy",
         "Hardworking",
         "Co-opearative",
         "Not sure"
        ]
       }
      ]
     },
     {
      "name": "page4",
      "elements": [
       {
        "type": "checkbox",
        "name": "Do you love Ampath",
        isRequired: true,
        "choices": [
         "Yes",
         "No",
        ]
       }
      ]
     },
     {
      "name": "page5",
      "elements": [
       {
        "type": "checkbox",
        "name": "Do you prefer coming back?",
        isRequired: true,
        "choices": [
         "Yes",
         "No",
        ]
       }
      ]
     }
    ],
    "showProgressBar": "bottom bg-info"
   }
}
