import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from '../main/main.component';
import { APP_BASE_HREF } from '@angular/common';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    MainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [
    { provide: APP_BASE_HREF, useValue: environment.baseHref }
  ]
})
export class AppComponent {}
