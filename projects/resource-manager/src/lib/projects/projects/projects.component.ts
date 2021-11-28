import { Component, OnInit } from '@angular/core';
import {
  getDaysInMonth,
  isSameWeek,
  isSameMonth,
  isSameYear,
  getDay,
  startOfMonth,
  endOfMonth,
  differenceInDays,
  startOfWeek,
} from 'date-fns';
import { CalendarService } from '../../services/calendar/calendar.service';

@Component({
  selector: 'lib-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  calendarView: string;
  panelOpenState: boolean = false;
  currentWeekTasks: any = [];
  currentMonthTasks: any = [];
  weekDate: Date = new Date();
  monthDate: any = new Date();

  constructor(private calendarService: CalendarService) {
    this.calendarView = this.calendarService.calendarView;
    this.currentMonthTasks = this.calendarService.currentMonthProjects;
    this.currentWeekTasks = this.calendarService.currentWeekProjects;
  }

  ngOnInit(): void {
    this.calendarService.weekDate$.subscribe(
      (weekDate: Date) => (this.weekDate = weekDate)
    );
    this.calendarService.monthDate$.subscribe(
      (monthDate: Date) => (this.monthDate = monthDate)
    );
    this.calendarService.calendarView$.subscribe(
      (currentCalendarView: string) => (this.calendarView = currentCalendarView)
    );
    this.calendarService.currentWeekProjects$.subscribe(
      (currentWeekProjects) => (this.currentWeekTasks = currentWeekProjects)
    );
    this.calendarService.currentMonthProjects$.subscribe(
      (currentMonthProjects) => (this.currentMonthTasks = currentMonthProjects)
    );
  }

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
    } else {
      width = 7 * eachContainerWidth + 'vw';
      return width;
    }
  };
}
