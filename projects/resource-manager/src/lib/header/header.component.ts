import { Component, Input, OnInit } from '@angular/core';
import { format } from 'date-fns';

import { MatDialog } from '@angular/material/dialog';
import { DisplayFieldsComponent } from '../display-fields/display-fields.component';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  currentDate: Date = new Date();

  @Input()
  onClickForward!: () => any;

  @Input()
  onClickBackward!: () => any;

  @Input()
  onToggleButton!: (value: string) => any;

  @Input() monthDate = new Date();

  constructor(public dialog: MatDialog) {}

  openDisplayFields() {
    const dialogRef = this.dialog.open(DisplayFieldsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit(): void {}
}
