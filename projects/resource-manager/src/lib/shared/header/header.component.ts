import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayFieldsComponent } from '../display-fields/display-fields.component';
import { TaskAllocationComponent } from '../task-allocation/task-allocation.component';
import { EmployeeAllocationComponent } from '../employee-allocation/employee-allocation.component';
import { CalendarService } from '../../services/calendar/calendar.service';
import { HeaderService } from '../../services/header/header.service';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  calendarView: string;

  monthDate: Date = new Date();
  weekDate: Date = new Date();

  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private headerService: HeaderService
  ) {
    this.calendarView = this.calendarService.calendarView;
  }

  openDisplayFields() {
    const dialogRef = this.dialog.open(DisplayFieldsComponent);

    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  onToggle = (currentTabValue: string) => {
    this.headerService.onChangeTabValue(currentTabValue);
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
    this.calendarService.onClickNextMonth();
  };

  onClickNextWeek = (): void => {
    this.calendarService.onClickNextWeek();
  };

  onClickPreviousMonth = (): void => {
    this.calendarService.onClickPreviousMonth();
  };

  onClickPreviousWeek = (): void => {
    this.calendarService.onClickPreviousWeek();
  };

  onClickCalendarViewButton = (currentCalendarView: string): void => {
    this.calendarService.onChangeCalendarView(currentCalendarView);
  };

  ngOnInit(): void {
    this.calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );
    this.calendarService.monthDate$.subscribe(
      (currentMonthDate: Date) => (this.monthDate = currentMonthDate)
    );
    this.calendarService.weekDate$.subscribe(
      (currentWeekDate: Date) => (this.weekDate = currentWeekDate)
    );
  }
}
