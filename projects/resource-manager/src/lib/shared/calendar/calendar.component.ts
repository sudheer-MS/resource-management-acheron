import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import {
  differenceInDays,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  getDaysInMonth,
  isSameMonth,
  isSameWeek,
  isSameYear,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { of } from 'rxjs';
import { Campaign } from '../../models/campaigns/campaign';
import { Priority } from '../../models/filter-models/priority/priority';
import { Status } from '../../models/filter-models/status/status';
import { Project } from '../../models/projects/project';
import { CalendarService } from '../../services/calendar/calendar.service';
import { FilterService } from '../../services/filter/filter.service';
import { HeaderService } from '../../services/header/header.service';
import { EmployeeAllocationComponent } from '../employee-allocation/employee-allocation.component';

@Component({
  selector: 'lib-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  calendarView: string = 'month';
  tabValue: string;

  currentDate = format(new Date(), 'MM/dd/yyyy');

  monthDate: Date = new Date();
  weekDate: Date = new Date();

  currentMonthDates: Date[] = [];
  currentWeekDates: Date[] = [];

  currentWeekProjects: any[] = [];
  currentMonthProjects: any[] = [];

  projectPanelOpenState: boolean = false;
  campaignPanelOpenState: boolean = false;

  priorityFilter: Priority;
  statusFilter: Status;

  @Input() projects: Object[] = [];

  constructor(
    private _calendarService: CalendarService,
    private headerService: HeaderService,
    private _filterService: FilterService,

    public dialog: MatDialog
  ) {
    this.tabValue = this.headerService.tabValue;
    this.priorityFilter = {
      high: false,
      low: false,
      medium: false,
    };
    this.statusFilter = {
      defined: false,
      inProgress: false,
      completed: false,
      onHold: false,
    };
  }

  ngOnInit(): void {
    this._calendarService.currentMonthDates$.subscribe(
      (currentMonthDates: Date[]) => {
        this.currentMonthDates = currentMonthDates;
        this.onChangeCurrentMonthProjects();
      }
    );
    this._calendarService.currentWeekDates$.subscribe(
      (currentWeekDates: Date[]) => {
        this.currentWeekDates = currentWeekDates;
        this.onChangeCurrentWeekProjects();
      }
    );
    this._calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );

    this._calendarService.monthDate$.subscribe(
      (currentMonthDate: Date) => (this.monthDate = currentMonthDate)
    );

    this._calendarService.weekDate$.subscribe(
      (currentWeekDate: Date) => (this.weekDate = currentWeekDate)
    );
    this.headerService.tabValue$.subscribe(
      (currentTabValue: string) => (this.tabValue = currentTabValue)
    );
    this._filterService.priorityFilter$.subscribe(
      (priorityFilter: Priority) => (this.priorityFilter = priorityFilter)
    );
    this._filterService.statusFilter$.subscribe(
      (statusFilter: Status) => (this.statusFilter = statusFilter)
    );
  }

  formatDate = (date: Date) => {
    return format(date, 'MM/dd/yyyy');
  };

  onChangeCurrentMonthProjects = () => {
    this.currentMonthProjects = this.projects.filter(
      (eachTask: any) =>
        isSameMonth(eachTask.startDate, this.monthDate) ||
        isSameMonth(eachTask.endDate, this.monthDate) ||
        isWithinInterval(this.monthDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
  };

  onChangeCurrentWeekProjects = () => {
    this.currentWeekProjects = this.projects.filter(
      (eachTask: any) =>
        isSameWeek(eachTask.startDate, this.weekDate) ||
        isSameWeek(eachTask.endDate, this.weekDate) ||
        isWithinInterval(this.weekDate, {
          start: eachTask.startDate,
          end: eachTask.endDate,
        })
    );
  };

  onChangePriorityFilter = () => {
    for (let [key, value] of Object.entries(this.priorityFilter)) {
      if (value == true) {
        this.currentMonthProjects.filter((campaign: Campaign) => {});
      }
    }
  };
  onChangeStatusFilter = () => {};

  monthLeftSpace = (startDate: Date): string => {
    let margin;
    let noOfDaysInCurrentMonth = getDaysInMonth(this.monthDate);
    let eachContainerWidth = 85 / noOfDaysInCurrentMonth;

    // check if startDate and currentDate are equal
    if (
      this.monthDate.getMonth() === startDate.getMonth() &&
      this.monthDate.getFullYear() === startDate.getFullYear()
    ) {
      let days = startDate.getDate() - 1;
      margin = days * eachContainerWidth + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  weekLeftSpace = (startDate: Date): string => {
    let margin;
    let eachContainerWidth = 85 / 7;

    // check if startDate and currentDate are equal
    if (
      isSameWeek(this.weekDate, startDate) &&
      isSameMonth(this.weekDate, startDate) &&
      isSameYear(this.weekDate, startDate)
    ) {
      let days = getDay(startDate);
      margin = days * eachContainerWidth + 'vw';
      return margin;
    }
    return 0 + 'vw';
  };

  monthWidth = (startDate: Date, endDate: Date): string => {
    let width;
    let calculateDifference: number;
    let currentMonth = this.monthDate;
    let findStartDateOfEndMonth = startOfMonth(endDate);
    let findEndDateOfStartMonth = endOfMonth(startDate);
    let noOfDaysInCurrentMonth = getDaysInMonth(currentMonth);
    let noOfDaysInStartMonth = getDaysInMonth(startDate);
    let noOfDaysInEndMonth = getDaysInMonth(endDate);

    // Check if startDate and endDate are in same month
    if (isSameMonth(startDate, endDate) && isSameYear(startDate, endDate)) {
      let eachContainerWidth = 85 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if endDate month and current month are same month
    else if (
      isSameMonth(currentMonth, endDate) &&
      isSameYear(currentMonth.getFullYear(), endDate.getFullYear())
    ) {
      let eachContainerWidth = 85 / noOfDaysInEndMonth;
      calculateDifference = differenceInDays(endDate, findStartDateOfEndMonth);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // Check if startDate month and current month are same month
    else if (
      isSameMonth(startDate, currentMonth) &&
      isSameYear(startDate, currentMonth)
    ) {
      let eachContainerWidth = 85 / noOfDaysInStartMonth;
      calculateDifference = differenceInDays(
        findEndDateOfStartMonth,
        startDate
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    }
    // check if both startDate and endDate are not related to current month
    else {
      let eachContainerWidth = 85 / noOfDaysInCurrentMonth;
      width = noOfDaysInCurrentMonth * eachContainerWidth + 'vw';
      return width;
    }
  };

  weekWidth = (startDate: Date, endDate: Date) => {
    let calculateDifference: number;
    let eachContainerWidth = 85 / 7;
    let width;

    if (
      isSameWeek(endDate, startDate) &&
      isSameMonth(startDate, endDate) &&
      isSameYear(startDate, endDate)
    ) {
      calculateDifference = differenceInDays(endDate, startDate);
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else if (isSameWeek(endDate, this.weekDate)) {
      calculateDifference = differenceInDays(
        endDate,
        startOfWeek(this.weekDate)
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else if (isSameWeek(startDate, this.weekDate)) {
      calculateDifference = differenceInDays(
        endOfWeek(this.weekDate),
        startDate
      );
      width = (calculateDifference + 1) * eachContainerWidth + 'vw';
      return width;
    } else {
      width = 7 * eachContainerWidth + 'vw';
      return width;
    }
  };

  openEmployeeDialog() {
    const dialogRef = this.dialog.open(EmployeeAllocationComponent, {
      height: '100vh',
      width: '40vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
