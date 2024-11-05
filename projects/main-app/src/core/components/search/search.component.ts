import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { ITermExplanationDialogData, TermExplanationDialog } from './term-explanation-dialog/TermExplanationDialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatListModule,
    MatButtonModule, 
    MatIconModule, 
    MatDialogModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  criteria: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  buttonName = "What is it?";

  onOptionClick(criterion: string): void {
    // Your function logic here
    console.log('Option clicked:', criterion);
  }

  readonly dialog = inject(MatDialog);

  openDialog(index: number): void {

    ;

    const dialogRef = this.dialog.open(TermExplanationDialog);

    const dialogData: ITermExplanationDialogData = {lang: "de-DE", term: "AAAAA"}
    dialogRef.componentInstance.setData(dialogData);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




