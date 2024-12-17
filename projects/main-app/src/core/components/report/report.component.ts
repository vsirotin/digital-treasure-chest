import { Component } from '@angular/core';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
  sertificate: string = "Certificate";
  line1: string = "This certificate confirms";
  line2: string = "that the bearer of this certificate is the legal virtual owner";
  line3: string = "of the following remarkable numbers:";
  numbers: string = "0, 12, 345, 7895, 888, 999";
  signature: string = "Master and Lord of All Numbers Numericus Incalculable";

}
