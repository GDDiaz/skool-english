import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  public units: Units[];
  constructor() { }

  ngOnInit() {

    this.units = [
      {
        name: 'Listening',
        icon: 'ear.svg',
        type: 'listening',
        percentage: 75,
        themes: [
          {
            name: 'Understand personal information questions',
            state: States.completed
          },
          {
            name: 'Understand greetings and farewells',
            state: States.completed
          },
          {
            name: 'Understand spelled words',
            state: States.in_progress
          },
          {
            name: 'Identify family members, occupations and characteristics.',
            state: States.awaiting
          }
        ]
      },
      {
        name: 'Speaking',
        icon: 'chat.svg',
        type: 'speaking',
        percentage: 23,
        themes: [
          {
            name: 'Recite the alphabet',
            state: States.completed
          },
          {
            name: 'Ask and give the time',
            state: States.awaiting
          },
          {
            name: 'Introduce oneself',
            state: States.awaiting
          },
          {
            name: 'Greet people and say goodbye',
            state: States.awaiting
          },
          {
            name: 'Ask and give basic information',
            state: States.awaiting
          },
          {
            name: 'Talk about peoples’ nationality',
            state: States.awaiting
          }

        ]
      },
      {
        name: 'Lenguage',
        icon: 'translate.svg',
        type: 'lenguage',
        percentage: 0,
        themes: [
          {
            name: 'Verb to Be. Af rmative, negative and interrogative',
            state: States.awaiting
          },
          {
            name: 'Prepositions of time',
            state: States.awaiting
          },
          {
            name: 'Wh- questions.WRITING',
            state: States.awaiting
          }
        ]
      }
    ];
  }

}

export interface Units {
  name: string;
  type: string;
  icon: string;
  themes: Themes[];
  percentage: number;
}

export interface Themes {
  name: string;
  state: States;
}

export enum States {
  awaiting,
  in_progress,
  completed
}
