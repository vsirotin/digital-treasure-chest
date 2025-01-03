import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {}
