import { Component } from '@angular/core';
import { Chest } from '../../../shared/classes/chest';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  sertificate: string = "Certificate";
  line1: string = "This certificate confirms";
  line2: string = "that the bearer of this certificate is the legal virtual owner";
  line3: string = "of the following remarkable numbers:";
  numbers: string = "";
  signature: string = "Master and Lord of All Numbers Numericus Incalculable";
  textForEmptyChest: string = "The chest is empty. Please fill it with numbers.";
  numbersIsEmpty: boolean = true;

  baseHref: string = environment.baseHref;

  constructor() { 
    this.updateNumbers(Chest.getItems());
    Chest.chestChanged$.subscribe((items: number[]) => {
      this.updateNumbers(items);
    });
  }

  private updateNumbers(items: number[]) {
    this.numbersIsEmpty = items.length == 0;
    this.numbers = items.join(", ");
  }
}
