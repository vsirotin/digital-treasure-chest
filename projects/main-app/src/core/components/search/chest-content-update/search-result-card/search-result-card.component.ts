import {ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import { Searcher } from '../../searcher/searcher';

@Component({
  selector: 'app-serach-result-card',
  standalone: true,
  imports: [MatCardModule, MatChipsModule, MatProgressBarModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './search-result-card.component.html',
  styleUrl: './search-result-card.component.css'
})
export class SerachResultCardComponent implements OnChanges {

  @Input() searchResult: number[] = [];
  
  longText = ``;

  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchResult']) {
      this.updateLongText();
    }
  }

  private updateLongText(): void {
    this.longText = `The search results are: ${this.searchResult.join(', ')}`;
  }
}
