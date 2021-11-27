import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewEncapsulation,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayFieldsComponent } from '../display-fields/display-fields.component';
import { TaskAllocationComponent } from '../task-allocation/task-allocation.component';
import { EmployeeAllocationComponent } from '../employee-allocation/employee-allocation.component';
import { CalendarService } from '../../services/calendar/calendar.service';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  tabValue = '';
  activeView: string;
  private calendarComponent: CalendarComponent = new CalendarComponent(
    this.calendarService
  );

  @Output() tabValueEvent = new EventEmitter<string>();

  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService
  ) {
    this.activeView = this.calendarService.getActiveView();
  }

  openDisplayFields() {
    const dialogRef = this.dialog.open(DisplayFieldsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onToggle = (value: string) => {
    this.tabValue = value;
    this.tabValueEvent.emit(this.tabValue);
  };

  openTaskAllocation() {
    const dialogRef = this.dialog.open(TaskAllocationComponent, {
      height: '100vh',
      width: '40vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(EmployeeAllocationComponent, {
      height: '100vh',
      width: '40vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onClickNextMonth = (): void => {
    this.calendarComponent.onClickNextMonth();
  };

  onClickNextWeek = (): void => {
    this.calendarComponent.onClickNextWeek();
  };

  onClickPreviousMonth = (): void => {
    this.calendarComponent.onClickPreviousMonth();
  };

  onClickPreviousWeek = (): void => {
    this.calendarComponent.onClickPreviousWeek();
  };

  ngOnInit(): void {}
}
