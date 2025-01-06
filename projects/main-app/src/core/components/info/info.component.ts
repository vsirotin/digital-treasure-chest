import { Component } from '@angular/core';

@Component({
  selector: 'app-info',
  standalone: true,
  imports: [],
  templateUrl: './info.component.html',
  styleUrl: './info.component.css'
})
export class InfoComponent {

  ui: IUIInfoComponent = {
    greeting: 'Welcome to the digital treasure box!',
    overview: 'This application will allow you to become an owner in priceless treasures and store them securely, but at the same time for free.',
    explanation: 'These treasures are wonderful numbers. And you can store them in the memory of your browser.',
    howToUse: 'You can select these treasures on the search page. Specify the interval and properties of the numbers you would like to possess. If too many numbers meet these criteria and all of them do not fit in your treasure chest, change the selection criteria. ',
    whereExplanation: 'At the bottom of the selection page, you can see a brief description of the remarkable properties of the numbers you choose. ',
    certificate: 'Then you can see a completed and signed certificate of ownership for those numbers. ',
    settings: 'The settings page will help you to set the desired language if it did not happen automatically. ',
    wisch: 'We wish you a pleasant time in selecting your numbers and further enjoyment in owning these treasures!'
  };

}

export interface IUIInfoComponent {
  greeting: string;
  overview: string;
  explanation: string;
  howToUse: string;
  whereExplanation: string;
  certificate: string;
  settings: string;
  wisch: string;
}

