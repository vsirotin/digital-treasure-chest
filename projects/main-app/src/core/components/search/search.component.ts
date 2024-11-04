import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [MatListModule,
    MatButtonModule, 
    MatDialogModule
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  criteria: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];

  buttonName = "(i)";

  onOptionClick(criterion: string): void {
    // Your function logic here
    console.log('Option clicked:', criterion);
  }

  readonly dialog = inject(MatDialog);

  openDialog(index: number): void {
    console.log('Dialog opened:', index);
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  
}

@Component({
  selector: './search.dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogContentExampleDialog {}
