import { FilterService } from './../../services/filter/filter.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DisplayFieldsComponent } from '../display-fields/display-fields.component';
import { TaskAllocationComponent } from '../task-allocation/task-allocation.component';
import { EmployeeAllocationComponent } from '../employee-allocation/employee-allocation.component';
import { CalendarService } from '../../services/calendar/calendar.service';
import { HeaderService } from '../../services/header/header.service';
import { Priority } from '../../models/filter-models/priority/priority';
import { Status } from '../../models/filter-models/status/status';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'lib-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent implements OnInit {
  calendarView: string;
  removable = false;
  monthDate: Date = new Date();
  weekDate: Date = new Date();
  filterChips: string[] = [];

  priorityFilter: Priority = {
    high: false,
    low: false,
    medium: false,
  };

  statusFilter: Status = {
    defined: false,
    inProgress: false,
    completed: false,
    onHold: false,
  };
  constructor(
    public dialog: MatDialog,
    private calendarService: CalendarService,
    private headerService: HeaderService,
    private filterService: FilterService
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

    this.filterService.priorityFilter$.subscribe((priorityFilter: Priority) => {
      this.priorityFilter = priorityFilter;
      this.onchangePriorityFilter();
    });
    this.filterService.statusFilter$.subscribe((statusFilter: Status) => {
      this.statusFilter = statusFilter;
      this.onchangeStatusFilter();
    });
  }

  onchangePriorityFilter() {
    for (let [key, value] of Object.entries(this.priorityFilter)) {
      if (value == true) {
        if (!this.filterChips.includes(key)) {
          this.filterChips.push(key);
        }
      } else if (value == false) {
        if (this.filterChips.includes(key)) {
          this.filterChips = this.filterChips.filter((chip) => key != chip);
        }
      }
    }
  }

  onchangeStatusFilter() {
    for (let [key, value] of Object.entries(this.statusFilter)) {
      if (value == true) {
        if (!this.filterChips.includes(key)) {
          this.filterChips.push(key);
        }
      } else if (value == false) {
        if (this.filterChips.includes(key)) {
          this.filterChips = this.filterChips.filter((chip) => key != chip);
        }
      }
    }
  }

  removeChips(event: any) {
    console.log('out');
    // for (let [key, value] of Object.entries(this.statusFilter)) {
    //  if (value == true ) {
    //     if (this.filterChips.includes(key)) {
    //       this.filterChips = this.filterChips.filter((chip) => key != chip);
    //       console.log("in")
    //     }
    //   }
    // }
    this.filterChips;
    console.log(event);
    if (true) {
      let v = this.priorityFilter;
      if (this.filterChips.includes(event)) {
        this.filterChips = this.filterChips.filter((chip) => event != chip);
        this.filterService.unchecked.next(false);
      }
    }
  }

  high(ob: MatCheckboxChange) {
    let v = true;
  }
}
