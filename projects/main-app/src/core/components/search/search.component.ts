import { ChangeDetectionStrategy, Component, ViewChild, OnInit } from '@angular/core';
import { MatAccordion, MatExpansionModule, MatExpansionPanel} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {ChetContentViewComponent} from './chest-content-view/chest-content-view.component';
import {ChetContentUpdateComponent} from './chest-content-update/chest-content-update.component';
import { Chest } from '../../../shared/classes/chest';
import * as uiDefault from '../../../assets/languages/core/components/search/lang/1/en-US.json';
import { ILocalizationClient, ILocalizer, LocalizerFactory } from '@vsirotin/localizer';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [
    MatAccordion, 
    MatExpansionModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    ChetContentViewComponent,
    ChetContentUpdateComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements ILocalizationClient<ISerachUI>, OnInit {
  @ViewChild('viewPanel') viewPanel!: MatExpansionPanel;
  @ViewChild('updatePanel')  updatePanel!: MatExpansionPanel;

  ui: ISerachUI = (uiDefault as any).default;

  chetNumbers: number[] = [];
  viewTitle: string = "";

  private localizer: ILocalizer;
  private chest: Chest = Chest.instance;

  constructor() { 
    this.localizer = LocalizerFactory.createLocalizer<ISerachUI>("assets/languages/core/components/search/lang", 1, this.ui, this);
    this.chetNumbers = this.chest.getItems();;
    this.updateViewTitle();
    this.chest.chestChanged$.subscribe((items: number[]) => {
      
      this.updateViewTitle();
      this.chetNumbers = items;
      this.updatePanels();
    });

    const items = this.chest.getItems();
    //this.updatePanels(items);
  }

    ngOnInit() {
    //  this.updatePanels();
    }

  ngAfterViewInit() {
      // Ensure the sidenav is opened after initialization
      setTimeout(() => {
        this.updatePanels();
      }, 1);
    }  

  private updatePanels() {
    if (this.chetNumbers.length > 0) {
      this.viewPanel.open();
    } 
    this.updatePanel.open();
    
  }

  updateLocalization(data: ISerachUI): void {
    this.ui = data;
    this.updateViewTitle();
  }

  private updateViewTitle() {
    this.viewTitle = this.ui.viewTemplate.replace('X', this.chetNumbers.length.toString());
  }
}

interface ISerachUI {
  viewTemplate: string
  updateTitle: string;
}





