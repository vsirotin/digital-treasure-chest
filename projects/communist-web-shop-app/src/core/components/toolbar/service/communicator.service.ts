import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CommunicatorService {
  private buttonClickedSource = new Subject<void>();
  buttonClicked$ = this.buttonClickedSource.asObservable();

  buttonClicked() {
    this.buttonClickedSource.next();
  }
}
