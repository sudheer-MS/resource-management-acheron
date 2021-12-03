import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import {
  differenceInDays,
  differenceInHours,
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

import { Campaign } from '../../models/campaigns/campaign';
import { Resource } from '../../models/resources/resource';
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

  currentWeekProjects: Campaign[] = [];
  currentMonthProjects: Campaign[] = [];

  projectPanelOpenState: boolean = false;
  campaignPanelOpenState: boolean = false;

  @Output() priorityFilter = new EventEmitter();
  @Output() statusFilter = new EventEmitter();

  @Input() projects: Campaign[] = [];
  @Input() resources: Resource[] = [];

  constructor(
    private _calendarService: CalendarService,
    private headerService: HeaderService,
    private _filterService: FilterService,

    public dialog: MatDialog
  ) {
    this.tabValue = this.headerService.tabValue;
    // this.priorityFilter = {
    //   high: false,
    //   low: false,
    //   medium: false,
    // };
    // this.statusFilter = {
    //   defined: false,
    //   inProgress: false,
    //   completed: false,
    //   onHold: false,
    // };
  }
  
  ngOnInit(): void {
    this.VerticalTimeLeftSpace();
    console.log(this.projects);
    this._calendarService.currentMonthDates$.subscribe(
      (currentMonthDates: Date[]) => {
        this.currentMonthDates = currentMonthDates;
        this.onChangeCurrentMonthProjects();
        console.log(this.monthDate);
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
    // this._filterService.priorityFilter$.subscribe(
    //   (priorityFilter: Priority) => (this.priorityFilter = priorityFilter)
    // );
    // this._filterService.statusFilter$.subscribe(
    //   (statusFilter: Status) => (this.statusFilter = statusFilter)
    // );
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

  onChangeCurrentMonthResourceTask = () => {
    // this.currentMonthResourceTask = this.resources.filter(
    //   (eachResourceTask: any) =>
    //     isSameMonth(eachResourceTask.task.startDate, this.monthDate) ||
    //     isSameMonth(eachResourceTask.task.endDate, this.monthDate) ||
    //     isWithinInterval(this.monthDate, {
    //       start: eachResourceTask.task.startDate,
    //       end: eachResourceTask.task.endDate,
    //     })
    // );
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

  onFilteringCampaigns = () => {
    // this.projects.filter((nproject)=>{
    //   if(nproject.campaignId==0){
    //     this.filterProjects=nproject;
    //   }
    //   console.log(this.filterProjects)
    // })
  };

  // onChangePriorityFilter = () => {
  //   for (let [key, value] of Object.entries(this.priorityFilter)) {
  //     if (value == true) {
  //       this.currentMonthProjects.filter((campaign: Campaign) => {});
  //     }
  //   }
  // };
  // onChangeStatusFilter = () => {};

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
      width: '37vw',
      panelClass: 'custom-dialog-container',
      position: {
        right: '0',
      },
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      console.log(`Dialog result: ${result}`);
    });
  }

  VerticalTimeLeftSpace = () => {
    const currentDateTime = new Date();
    let eachContainerWidth = 85 / getDaysInMonth(this.monthDate);
    const eachHourWidth = eachContainerWidth / 24;
    const hoursDifference = differenceInHours(
      currentDateTime,
      new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate()
      )
    );
    const leftSpace = eachHourWidth * hoursDifference;
    return `${leftSpace}vw`;
  };

  verticalTimeWeekLeftSpace = () => {
    const currentDateTime = new Date();
    let eachContainerWidth = 85 / 7;
    const eachHourWidth = eachContainerWidth / 24;
    const hoursDifference = differenceInHours(
      currentDateTime,
      new Date(
        currentDateTime.getFullYear(),
        currentDateTime.getMonth(),
        currentDateTime.getDate()
      )
    );
    const leftSpace = eachHourWidth * hoursDifference;
    return `${leftSpace}vw`;
  };
}
